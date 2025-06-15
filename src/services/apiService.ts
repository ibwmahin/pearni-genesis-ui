interface APIKeys {
  nasa: string;
  gemini: string;
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  nasaData?: any;
}

class APIService {
  private apiKeys: APIKeys | null = null;
  private conversationHistory: ChatMessage[] = [];

  constructor() {
    this.loadAPIKeys();
  }

  private loadAPIKeys(): void {
    const stored = localStorage.getItem('pearni_api_keys');
    if (stored) {
      try {
        this.apiKeys = JSON.parse(stored);
      } catch (error) {
        console.error('Failed to parse stored API keys:', error);
      }
    }
  }

  public setAPIKeys(nasa: string, gemini: string): void {
    this.apiKeys = { nasa, gemini };
    localStorage.setItem('pearni_api_keys', JSON.stringify(this.apiKeys));
  }

  public hasAPIKeys(): boolean {
    return !!(this.apiKeys?.nasa && this.apiKeys?.gemini);
  }

  public getAPIKeys(): APIKeys | null {
    return this.apiKeys;
  }

  public clearAPIKeys(): void {
    this.apiKeys = null;
    localStorage.removeItem('pearni_api_keys');
  }

  private determineQueryType(query: string): 'nasa' | 'general' | 'combined' {
    const nasaKeywords = [
      'space', 'mars', 'rover', 'asteroid', 'planet', 'spacecraft', 'satellite',
      'nasa', 'apod', 'astronomy', 'telescope', 'solar system', 'galaxy',
      'astronaut', 'mission', 'launch', 'orbit', 'meteorite', 'comet'
    ];

    const lowerQuery = query.toLowerCase();
    const hasNasaKeywords = nasaKeywords.some(keyword => lowerQuery.includes(keyword));

    if (hasNasaKeywords) {
      return lowerQuery.includes('explain') || lowerQuery.includes('what') || lowerQuery.includes('how') || lowerQuery.includes('why')
        ? 'combined' 
        : 'nasa';
    }

    return 'general';
  }

  public async callNasaAPI(query: string): Promise<any> {
    if (!this.apiKeys?.nasa) {
      throw new Error('NASA API key not configured');
    }

    try {
      let apiUrl = '';
      const lowerQuery = query.toLowerCase();

      if (lowerQuery.includes('apod') || lowerQuery.includes('astronomy picture')) {
        apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${this.apiKeys.nasa}`;
      } else if (lowerQuery.includes('mars') && lowerQuery.includes('rover')) {
        apiUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${this.apiKeys.nasa}`;
      } else if (lowerQuery.includes('asteroid') || lowerQuery.includes('near earth')) {
        const today = new Date().toISOString().split('T')[0];
        apiUrl = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&end_date=${today}&api_key=${this.apiKeys.nasa}`;
      } else if (lowerQuery.includes('weather') && lowerQuery.includes('mars')) {
        apiUrl = `https://api.nasa.gov/insight_weather/?api_key=${this.apiKeys.nasa}&feedtype=json&ver=1.0`;
      }

      if (apiUrl) {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`NASA API error: ${response.status}`);
        }
        return await response.json();
      }

      return null;
    } catch (error) {
      console.error('NASA API Error:', error);
      throw error;
    }
  }

  public async *callGeminiAPI(query: string, nasaData?: any): AsyncGenerator<string> {
    if (!this.apiKeys?.gemini) {
      throw new Error('Gemini API key not configured');
    }

    try {
      let systemPrompt = `You are pearNI, an advanced AGI assistant specializing in space exploration, sustainability, and scientific innovation. You are knowledgeable, helpful, and can provide detailed explanations about complex topics.`;

      if (nasaData) {
        systemPrompt += ` You have been provided with NASA data to help answer the user's question. Use this data to provide accurate, detailed responses.`;
      }

      const conversationContext = this.conversationHistory
        .slice(-6)
        .map(msg => `${msg.role}: ${msg.content}`)
        .join('\n');

      let fullPrompt = systemPrompt + '\n\n';
      if (conversationContext) {
        fullPrompt += `Previous conversation:\n${conversationContext}\n\n`;
      }
      
      fullPrompt += `Current question: ${query}`;

      if (nasaData) {
        fullPrompt += `\n\nNASA Data: ${JSON.stringify(nasaData, null, 2)}`;
      }

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${this.apiKeys.gemini}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: fullPrompt
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 8192,
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            }
          ]
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Gemini API Error Response:', errorText);
        throw new Error(`Gemini API error: ${response.status}`);
      }

      const data = await response.json();
      console.log('Gemini API Response:', data);

      if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
        const text = data.candidates[0].content.parts[0].text;
        // Simulate streaming by yielding the text in chunks
        const words = text.split(' ');
        let currentChunk = '';
        
        for (const word of words) {
          currentChunk += word + ' ';
          if (currentChunk.length > 50) {
            yield currentChunk;
            currentChunk = '';
            // Small delay to simulate streaming
            await new Promise(resolve => setTimeout(resolve, 50));
          }
        }
        
        if (currentChunk.trim()) {
          yield currentChunk;
        }
      } else {
        throw new Error('Unexpected response format from Gemini API');
      }
    } catch (error) {
      console.error('Gemini API Error:', error);
      throw error;
    }
  }

  public async processQuery(query: string): Promise<{
    type: 'nasa' | 'general' | 'combined';
    stream: AsyncGenerator<string>;
    nasaData?: any;
  }> {
    const queryType = this.determineQueryType(query);
    let nasaData = null;

    try {
      if (queryType === 'nasa' || queryType === 'combined') {
        nasaData = await this.callNasaAPI(query);
      }

      const stream = this.callGeminiAPI(query, nasaData);

      return {
        type: queryType,
        stream,
        nasaData
      };
    } catch (error) {
      console.error('Error processing query:', error);
      throw error;
    }
  }

  public addToConversation(role: 'user' | 'assistant', content: string, nasaData?: any): void {
    this.conversationHistory.push({
      role,
      content,
      timestamp: new Date(),
      nasaData
    });

    // Keep only last 20 messages to prevent memory issues
    if (this.conversationHistory.length > 20) {
      this.conversationHistory = this.conversationHistory.slice(-20);
    }
  }

  public getConversationHistory(): ChatMessage[] {
    return [...this.conversationHistory];
  }

  public clearConversation(): void {
    this.conversationHistory = [];
  }
}

export const apiService = new APIService();
export type { APIKeys, ChatMessage };
