
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, Lightbulb, Send } from 'lucide-react';
import { apiService } from '../services/apiService';
import type { Mission } from '../pages/MissionPlanner';

interface AIAssistantProps {
  mission: Mission;
  onUpdate: (mission: Mission) => void;
}

const AIAssistant = ({ mission, onUpdate }: AIAssistantProps) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [customQuery, setCustomQuery] = useState('');

  const analyzeMission = async () => {
    if (!apiService.hasAPIKeys()) {
      alert('Please configure your API keys in the NASA Chat section first.');
      return;
    }

    setIsAnalyzing(true);
    try {
      const missionData = JSON.stringify(mission, null, 2);
      const query = `Analyze this space mission plan and provide 3-5 specific, actionable recommendations to improve it:

Mission Data: ${missionData}

Please provide recommendations for:
1. Technical improvements
2. Risk mitigation
3. Cost optimization
4. Timeline efficiency
5. Crew safety

Format each recommendation as a clear, actionable bullet point.`;

      const { stream } = await apiService.processQuery(query);
      let fullResponse = '';
      
      for await (const chunk of stream) {
        fullResponse += chunk;
      }

      // Extract recommendations from AI response
      const lines = fullResponse.split('\n').filter(line => 
        line.trim() && (line.includes('•') || line.includes('-') || line.includes('*'))
      );
      
      setRecommendations(lines.slice(0, 5));
      
      // Update mission with AI recommendations
      onUpdate({
        ...mission,
        aiRecommendations: lines.slice(0, 5)
      });

    } catch (error) {
      console.error('AI Analysis Error:', error);
      alert('Failed to analyze mission. Please check your API configuration.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const askCustomQuestion = async () => {
    if (!customQuery.trim() || !apiService.hasAPIKeys()) return;

    setIsAnalyzing(true);
    try {
      const missionContext = `Current mission: ${mission.name} (${mission.type})
Duration: ${mission.duration} days
Crew: ${mission.crewSize}
Destination: ${mission.destination}
Objectives: ${mission.objectives.join(', ')}`;

      const query = `${missionContext}

User question: ${customQuery}

Please provide a detailed, technical answer specific to this space mission.`;

      const { stream } = await apiService.processQuery(query);
      let response = '';
      
      for await (const chunk of stream) {
        response += chunk;
      }

      // Add as a recommendation
      const newRec = `Custom Query: ${response.substring(0, 200)}...`;
      setRecommendations(prev => [newRec, ...prev.slice(0, 4)]);
      
    } catch (error) {
      console.error('Custom Query Error:', error);
    } finally {
      setIsAnalyzing(false);
      setCustomQuery('');
    }
  };

  return (
    <Card className="bg-black/40 border-cyan-500/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-cyan-400">
          <Brain className="w-5 h-5" />
          pearNI Mission Analyst
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button 
          onClick={analyzeMission}
          disabled={isAnalyzing}
          className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
        >
          {isAnalyzing ? 'Analyzing...' : 'Analyze Mission'}
        </Button>

        <div className="flex gap-2">
          <input
            type="text"
            value={customQuery}
            onChange={(e) => setCustomQuery(e.target.value)}
            placeholder="Ask about your mission..."
            className="flex-1 bg-gray-800/50 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm"
            onKeyPress={(e) => e.key === 'Enter' && askCustomQuestion()}
          />
          <Button
            onClick={askCustomQuestion}
            disabled={isAnalyzing || !customQuery.trim()}
            size="sm"
            variant="outline"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>

        {recommendations.length > 0 && (
          <div>
            <h4 className="flex items-center gap-2 text-sm font-medium text-yellow-400 mb-3">
              <Lightbulb className="w-4 h-4" />
              AI Recommendations
            </h4>
            <div className="space-y-2">
              {recommendations.map((rec, index) => (
                <div key={index} className="bg-gray-800/30 rounded-lg p-3 text-sm text-gray-300">
                  {rec.replace(/^[•\-\*]\s*/, '')}
                </div>
              ))}
            </div>
          </div>
        )}

        {recommendations.length === 0 && (
          <div className="text-center py-6 text-gray-500">
            <Brain className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Click "Analyze Mission" to get AI-powered recommendations</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AIAssistant;
