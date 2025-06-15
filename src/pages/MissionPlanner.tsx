
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import MissionBuilder from '../components/MissionBuilder';
import MissionPreview from '../components/MissionPreview';
import AIAssistant from '../components/AIAssistant';

export interface Mission {
  id: string;
  name: string;
  type: 'mars-exploration' | 'asteroid-mining' | 'space-station' | 'lunar-base';
  destination: string;
  duration: number; // in days
  crewSize: number;
  budget: number; // in millions USD
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

  const startNewMission = () => {
    setIsBuilding(true);
    setCurrentMission({
      id: Date.now().toString(),
      name: 'New Mission',
      type: 'mars-exploration',
      destination: 'Mars',
      duration: 500,
      crewSize: 4,
      budget: 10000,
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
      <div className="container mx-auto px-6 py-12">
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
            <Card className="bg-gradient-to-br from-red-900/20 to-orange-900/20 border-red-500/30 hover:border-red-400 transition-all duration-300 cursor-pointer"
                  onClick={() => startNewMission()}>
              <CardHeader>
                <CardTitle className="text-red-400">Mars Exploration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">Plan a comprehensive Mars exploration mission with rovers, habitats, and crew rotation.</p>
                <div className="mt-4 text-sm text-gray-400">
                  Duration: 18-26 months • Crew: 4-6 • Budget: $10-50B
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-gray-800/20 to-gray-900/20 border-gray-500/30 hover:border-gray-400 transition-all duration-300 cursor-pointer"
                  onClick={() => startNewMission()}>
              <CardHeader>
                <CardTitle className="text-gray-400">Asteroid Mining</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">Design autonomous mining operations for near-Earth asteroids with resource extraction.</p>
                <div className="mt-4 text-sm text-gray-400">
                  Duration: 3-7 years • Crew: 0-2 • Budget: $5-20B
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border-blue-500/30 hover:border-blue-400 transition-all duration-300 cursor-pointer"
                  onClick={() => startNewMission()}>
              <CardHeader>
                <CardTitle className="text-blue-400">Space Station</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">Build and deploy advanced space stations for research, manufacturing, or tourism.</p>
                <div className="mt-4 text-sm text-gray-400">
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
  );
};

export default MissionPlanner;
