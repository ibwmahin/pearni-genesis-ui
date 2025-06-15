import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, Send, User, Bot, Settings, Zap } from 'lucide-react';
import { apiService } from '../services/apiService';
import APIKeyManager from '../components/APIKeyManager';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  images?: string[];
  isStreaming?: boolean;
  nasaData?: any;
}

const NasaChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [showAPIManager, setShowAPIManager] = useState(false);
  const [hasAPIKeys, setHasAPIKeys] = useState(false);
  const [streamingMessageId, setStreamingMessageId] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const examplePrompts = [
    {
      icon: '🚀',
      title: 'Space Exploration',
      example: 'What are the latest discoveries from the James Webb Space Telescope and how do they change our understanding of the universe?'
    },
    {
      icon: '🔬',
      title: 'Scientific Analysis',
      example: 'Compare the atmospheric conditions of Mars and Venus and explain which would be easier to terraform'
    },
    {
      icon: '🎨',
      title: 'Creative Insights',
      example: 'Write a poem about black holes in the style of Carl Sagan while explaining their scientific properties'
    }
  ];

  const getRecommendations = (messageText: string, nasaData?: any) => {
    const lowerText = messageText.toLowerCase();
    
    if (nasaData?.url && nasaData?.title) {
      // APOD recommendations
      return [
        "Tell me more about this astronomical object",
        "What telescope captured this image?",
        "Show me similar space phenomena"
      ];
    }
    
    if (nasaData?.photos) {
      // Mars rover recommendations
      return [
        "What instruments does this rover have?",
        "Show me more recent Mars discoveries",
        "Compare Mars geology to Earth"
      ];
    }
    
    if (lowerText.includes('mars')) {
      return [
        "What's the weather like on Mars today?",
        "Show me Mars rover photos",
        "How long would it take to get to Mars?"
      ];
    }
    
    if (lowerText.includes('space') || lowerText.includes('telescope')) {
      return [
        "Show me today's astronomy picture",
        "What are the latest space discoveries?",
        "Explain black holes simply"
      ];
    }
    
    if (lowerText.includes('asteroid') || lowerText.includes('comet')) {
      return [
        "Are there any asteroids approaching Earth?",
        "What's the difference between asteroids and comets?",
        "How do we track near-Earth objects?"
      ];
    }
    
    // General recommendations
    return [
      "Show me today's astronomy picture",
      "What's happening on Mars right now?",
      "Explain a space concept simply"
    ];
  };

  useEffect(() => {
    setHasAPIKeys(apiService.hasAPIKeys());
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    if (!hasAPIKeys) {
      setShowAPIManager(true);
      return;
    }

    setShowWelcome(false);
    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    const aiMessageId = Date.now() + 1;
    const aiMessage: Message = {
      id: aiMessageId,
      text: '',
      sender: 'ai',
      timestamp: new Date(),
      isStreaming: true
    };

    setMessages(prev => [...prev, aiMessage]);
    setStreamingMessageId(aiMessageId);

    try {
      apiService.addToConversation('user', inputValue);
      const result = await apiService.processQuery(inputValue);

      let fullResponse = '';
      
      for await (const chunk of result.stream) {
        fullResponse += chunk;
        setMessages(prev => prev.map(msg => 
          msg.id === aiMessageId 
            ? { ...msg, text: fullResponse, nasaData: result.nasaData }
            : msg
        ));
      }

      // Final update to mark streaming as complete
      setMessages(prev => prev.map(msg => 
        msg.id === aiMessageId 
          ? { ...msg, isStreaming: false }
          : msg
      ));

      apiService.addToConversation('assistant', fullResponse, result.nasaData);

    } catch (error) {
      console.error('Error processing message:', error);
      const errorMessage = `I'm having trouble processing your request. ${
        error instanceof Error ? error.message : 'Please check your API keys and try again.'
      }`;

      setMessages(prev => prev.map(msg => 
        msg.id === aiMessageId 
          ? { ...msg, text: errorMessage, isStreaming: false }
          : msg
      ));
    }

    setIsLoading(false);
    setStreamingMessageId(null);
    setInputValue('');
  };

  const handleRecommendationClick = (recommendation: string) => {
    setInputValue(recommendation);
    // Auto-focus the input
    const input = document.querySelector('input[type="text"]') as HTMLInputElement;
    if (input) {
      input.focus();
    }
  };

  const handleExampleClick = (example: string) => {
    setInputValue(example);
  };

  const handleAPIKeysSet = () => {
    setHasAPIKeys(apiService.hasAPIKeys());
  };

  const clearConversation = () => {
    setMessages([]);
    setShowWelcome(true);
    apiService.clearConversation();
  };

  const renderNASAData = (nasaData: any) => {
    if (!nasaData) return null;

    if (nasaData.url && nasaData.title) {
      // APOD data
      return (
        <div className="mt-4 border border-gray-200 rounded-xl overflow-hidden">
          <img src={nasaData.url} alt={nasaData.title} className="w-full h-48 object-cover" />
          <div className="p-3 bg-gray-50">
            <p className="text-sm font-medium text-gray-800">{nasaData.title}</p>
            <p className="text-xs text-gray-600 mt-1">NASA Astronomy Picture of the Day</p>
          </div>
        </div>
      );
    }

    if (nasaData.photos && nasaData.photos.length > 0) {
      // Mars rover photos
      return (
        <div className="mt-4 grid grid-cols-2 gap-2">
          {nasaData.photos.slice(0, 4).map((photo: any, index: number) => (
            <img
              key={index}
              src={photo.img_src}
              alt={`Mars rover photo ${index + 1}`}
              className="rounded-lg w-full h-32 object-cover"
            />
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <i className='bx bxs-pear text-white text-lg'></i>
              </div>
              <h1 className="text-xl font-semibold text-gray-900">pearNI</h1>
              <div className="hidden md:flex items-center space-x-6 ml-8">
                <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-blue-600 transition-colors border-b-2 border-transparent hover:border-blue-600">
                  <Bot className="w-4 h-4" />
                  <span>CHAT</span>
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowAPIManager(true)}
                className={`p-2 rounded-lg transition-colors ${hasAPIKeys ? 'text-green-600 bg-green-50' : 'text-gray-600 hover:bg-gray-100'}`}
                title="API Configuration"
              >
                <Settings className="w-5 h-5" />
              </button>
              {messages.length > 0 && (
                <button
                  onClick={clearConversation}
                  className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
                >
                  Clear Chat
                </button>
              )}
              <button
                onClick={() => window.location.href = '/'}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        {showWelcome && messages.length === 0 ? (
          // Welcome Screen
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mt-16 mb-12"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-8">
              <i className='bx bxs-pear text-white text-2xl'></i>
            </div>

            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Welcome to pearNI
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Your AI-powered space exploration and sustainability engine
            </p>

            {!hasAPIKeys && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 p-4 bg-amber-50 border border-amber-200 rounded-xl"
              >
                <div className="flex items-center justify-center space-x-3">
                  <Zap className="w-5 h-5 text-amber-600" />
                  <p className="text-amber-800">
                    <strong>Setup Required:</strong> Configure your API keys to unlock full functionality
                  </p>
                  <button
                    onClick={() => setShowAPIManager(true)}
                    className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors text-sm"
                  >
                    Configure
                  </button>
                </div>
              </motion.div>
            )}

            {/* Example Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-16">
              {examplePrompts.map((prompt, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleExampleClick(prompt.example)}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer group"
                >
                  <div className="text-3xl mb-4">{prompt.icon}</div>
                  <h3 className="font-semibold text-gray-900 mb-3">{prompt.title}</h3>
                  <p className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
                    "{prompt.example}"
                  </p>
                </motion.div>
              ))}
            </div>

            <p className="text-gray-500 text-sm mb-8">
              Let's explore together. pearNI combines NASA data with advanced AI for space insights and creative problem-solving.
            </p>
          </motion.div>
        ) : (
          // Chat Messages
          <div className="space-y-6 mb-6 mt-8">
            <AnimatePresence>
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex space-x-4"
                >
                  <div className="flex-shrink-0">
                    {message.sender === 'user' ? (
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-gray-600" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <i className='bx bxs-pear text-white text-sm'></i>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200">
                      <p className="text-gray-800 whitespace-pre-wrap">
                        {message.text}
                        {message.isStreaming && (
                          <span className="inline-block w-2 h-5 bg-blue-500 ml-1 animate-pulse" />
                        )}
                      </p>
                      
                      {renderNASAData(message.nasaData)}
                    </div>
                    
                    {/* Recommendations for AI messages */}
                    {message.sender === 'ai' && !message.isStreaming && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="mt-3 ml-4"
                      >
                        <div className="flex flex-wrap gap-2">
                          {getRecommendations(message.text, message.nasaData).map((recommendation, recIndex) => (
                            <button
                              key={recIndex}
                              onClick={() => handleRecommendationClick(recommendation)}
                              className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full border border-blue-200 transition-colors hover:border-blue-300"
                            >
                              {recommendation}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                    
                    <p className="text-xs text-gray-500 mt-2 ml-4">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            <div ref={messagesEndRef} />
          </div>
        )}

        {/* Input Area */}
        <div className="sticky bottom-6">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setShowAPIManager(true)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="API Settings"
              >
                <Settings className="w-5 h-5 text-blue-600" />
              </button>
              
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSendMessage()}
                placeholder={hasAPIKeys ? "Ask me anything about space, sustainability, or get creative inspiration..." : "Configure API keys to start chatting..."}
                className="flex-1 outline-none text-gray-800 placeholder-gray-500"
                disabled={isLoading}
              />
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSendMessage}
                disabled={isLoading || !inputValue.trim() || !hasAPIKeys}
                className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowUp className="w-5 h-5" />
              </motion.button>
            </div>
            
            <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
              <span>{inputValue.length}/4000</span>
              <div className="flex items-center space-x-4">
                {hasAPIKeys && (
                  <span className="text-green-600 flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                    AI Ready
                  </span>
                )}
                <button className="hover:text-gray-700 transition-colors">
                  Powered by Gemini & NASA
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* API Key Manager Modal */}
      <APIKeyManager
        isOpen={showAPIManager}
        onClose={() => setShowAPIManager(false)}
        onKeysSet={handleAPIKeysSet}
      />
    </div>
  );
};

export default NasaChat;
