
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, CheckCircle, Clock, DollarSign } from 'lucide-react';
import type { Mission } from '../pages/MissionPlanner';

interface MissionPreviewProps {
  mission: Mission;
}

const MissionPreview = ({ mission }: MissionPreviewProps) => {
  const getRiskColor = (risk: number) => {
    if (risk < 30) return 'text-green-400';
    if (risk < 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getRiskLevel = (risk: number) => {
    if (risk < 30) return 'Low';
    if (risk < 60) return 'Medium';
    return 'High';
  };

  return (
    <div className="space-y-4">
      <Card className="bg-black/40 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-purple-400">Mission Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-400" />
              <span className="text-gray-300">Duration:</span>
              <span className="text-white">{mission.duration} days</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-green-400" />
              <span className="text-gray-300">Budget:</span>
              <span className="text-white">${mission.budget}B</span>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-2">Objectives:</h4>
            <ul className="space-y-1">
              {mission.objectives.slice(0, 3).map((objective, index) => (
                <li key={index} className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-3 h-3 text-green-400" />
                  <span className="text-gray-300">{objective}</span>
                </li>
              ))}
              {mission.objectives.length > 3 && (
                <li className="text-sm text-gray-500">
                  +{mission.objectives.length - 3} more objectives
                </li>
              )}
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-black/40 border-red-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-400">
            <AlertTriangle className="w-5 h-5" />
            Risk Assessment
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-300">Technical Risk</span>
              <span className={`text-sm font-medium ${getRiskColor(mission.riskAssessment.technical)}`}>
                {getRiskLevel(mission.riskAssessment.technical)}
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-red-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${mission.riskAssessment.technical}%` }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-300">Financial Risk</span>
              <span className={`text-sm font-medium ${getRiskColor(mission.riskAssessment.financial)}`}>
                {getRiskLevel(mission.riskAssessment.financial)}
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${mission.riskAssessment.financial}%` }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-300">Crew Safety</span>
              <span className={`text-sm font-medium ${getRiskColor(mission.riskAssessment.crew)}`}>
                {getRiskLevel(mission.riskAssessment.crew)}
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${mission.riskAssessment.crew}%` }}
              />
            </div>
          </div>

          <div className="pt-2 border-t border-gray-600">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-200">Overall Risk</span>
              <span className={`text-sm font-bold ${getRiskColor(mission.riskAssessment.overall)}`}>
                {getRiskLevel(mission.riskAssessment.overall)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MissionPreview;
