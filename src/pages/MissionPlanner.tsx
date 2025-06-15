
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Rocket, Target, Cpu } from 'lucide-react';
import Header from '../components/Header';
import MissionBuilder from '../components/MissionBuilder';
import MissionPreview from '../components/MissionPreview';
import AIAssistant from '../components/AIAssistant';

export interface Mission {
  id: string;
  name: string;
  type: 'mars-exploration' | 'asteroid-mining' | 'space-station' | 'lunar-base';
  destination: string;
  duration: number;
  crewSize: number;
  budget: number;
  objectives: string[];
  spacecraft: {
    propulsion: string;
    habitat: string;
    power: string;
    communication: string;
  };
  timeline: {
    phase: string;
    duration: number;
    description: string;
  }[];
  riskAssessment: {
    technical: number;
    financial: number;
    crew: number;
    overall: number;
  };
  aiRecommendations: string[];
}

const MissionPlanner = () => {
  const [currentMission, setCurrentMission] = useState<Mission | null>(null);
  const [isBuilding, setIsBuilding] = useState(false);

  const startNewMission = (type: Mission['type']) => {
    setIsBuilding(true);
    setCurrentMission({
      id: Date.now().toString(),
      name: 'New Mission',
      type,
      destination: type === 'mars-exploration' ? 'Mars' : type === 'lunar-base' ? 'Moon' : type === 'asteroid-mining' ? 'Near-Earth Asteroid' : 'Low Earth Orbit',
      duration: type === 'mars-exploration' ? 500 : type === 'asteroid-mining' ? 1200 : type === 'space-station' ? 1800 : 180,
      crewSize: type === 'asteroid-mining' ? 0 : type === 'mars-exploration' ? 4 : 6,
      budget: type === 'mars-exploration' ? 25000 : type === 'asteroid-mining' ? 8000 : type === 'space-station' ? 45000 : 5000,
      objectives: [],
      spacecraft: {
        propulsion: 'chemical',
        habitat: 'standard',
        power: 'solar',
        communication: 'standard'
      },
      timeline: [],
      riskAssessment: {
        technical: 50,
        financial: 40,
        crew: 30,
        overall: 40
      },
      aiRecommendations: []
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white">
      <Header />
      
      <div className="pt-32 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              AI Mission Planner
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Design and optimize space missions with AI-powered recommendations, realistic constraints, and collaborative planning.
            </p>
          </div>

          {!isBuilding ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <Card className="bg-black/40 backdrop-blur-sm border border-red-500/30 hover:border-red-400 transition-all duration-300 cursor-pointer group"
                    onClick={() => startNewMission('mars-exploration')}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-400 group-hover:text-red-300">
                    <Target className="w-5 h-5" />
                    Mars Exploration
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">Plan a comprehensive Mars exploration mission with rovers, habitats, and crew rotation.</p>
                  <div className="text-sm text-gray-400">
                    Duration: 18-26 months • Crew: 4-6 • Budget: $10-50B
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 backdrop-blur-sm border border-gray-500/30 hover:border-gray-400 transition-all duration-300 cursor-pointer group"
                    onClick={() => startNewMission('asteroid-mining')}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-400 group-hover:text-gray-300">
                    <Cpu className="w-5 h-5" />
                    Asteroid Mining
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">Design autonomous mining operations for near-Earth asteroids with resource extraction.</p>
                  <div className="text-sm text-gray-400">
                    Duration: 3-7 years • Crew: 0-2 • Budget: $5-20B
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 backdrop-blur-sm border border-blue-500/30 hover:border-blue-400 transition-all duration-300 cursor-pointer group"
                    onClick={() => startNewMission('space-station')}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-400 group-hover:text-blue-300">
                    <Rocket className="w-5 h-5" />
                    Space Station
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">Build and deploy advanced space stations for research, manufacturing, or tourism.</p>
                  <div className="text-sm text-gray-400">
                    Duration: 5-10 years • Crew: 6-12 • Budget: $15-100B
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <MissionBuilder 
                  mission={currentMission!} 
                  onUpdate={setCurrentMission}
                />
              </div>
              <div className="space-y-6">
                <MissionPreview mission={currentMission!} />
                <AIAssistant mission={currentMission!} onUpdate={setCurrentMission} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MissionPlanner;
