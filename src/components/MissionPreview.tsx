
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, CheckCircle, Clock, DollarSign } from 'lucide-react';
import type { Mission } from '../pages/MissionPlanner';

interface MissionPreviewProps {
  mission: Mission;
}

const MissionPreview = ({ mission }: MissionPreviewProps) => {
  const getRiskColor = (risk: number) => {
    if (risk < 30) return 'text-green-600';
    if (risk < 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRiskLevel = (risk: number) => {
    if (risk < 30) return 'Low';
    if (risk < 60) return 'Medium';
    return 'High';
  };

  const getRiskBarColor = (risk: number) => {
    if (risk < 30) return 'bg-green-500';
    if (risk < 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-4">
      <div className="glass-card">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-purple-100 rounded-full">
            <CheckCircle className="w-5 h-5 text-purple-600" />
          </div>
          <h2 className="text-xl font-bold text-readable">Mission Summary</h2>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-500" />
              <span className="text-readable-muted">Duration:</span>
              <span className="text-readable font-medium">{mission.duration} days</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-green-500" />
              <span className="text-readable-muted">Budget:</span>
              <span className="text-readable font-medium">${mission.budget}B</span>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-readable mb-2">Objectives:</h4>
            <ul className="space-y-1">
              {mission.objectives.slice(0, 3).map((objective, index) => (
                <li key={index} className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-3 h-3 text-green-500" />
                  <span className="text-readable-muted">{objective}</span>
                </li>
              ))}
              {mission.objectives.length > 3 && (
                <li className="text-sm text-readable-light">
                  +{mission.objectives.length - 3} more objectives
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      <div className="glass-card">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-red-100 rounded-full">
            <AlertTriangle className="w-5 h-5 text-red-600" />
          </div>
          <h2 className="text-xl font-bold text-readable">Risk Assessment</h2>
        </div>
        <div className="space-y-3">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-readable-muted">Technical Risk</span>
              <span className={`text-sm font-medium ${getRiskColor(mission.riskAssessment.technical)}`}>
                {getRiskLevel(mission.riskAssessment.technical)}
              </span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div 
                className={`${getRiskBarColor(mission.riskAssessment.technical)} h-2 rounded-full transition-all duration-300`}
                style={{ width: `${mission.riskAssessment.technical}%` }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-readable-muted">Financial Risk</span>
              <span className={`text-sm font-medium ${getRiskColor(mission.riskAssessment.financial)}`}>
                {getRiskLevel(mission.riskAssessment.financial)}
              </span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div 
                className={`${getRiskBarColor(mission.riskAssessment.financial)} h-2 rounded-full transition-all duration-300`}
                style={{ width: `${mission.riskAssessment.financial}%` }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-readable-muted">Crew Safety</span>
              <span className={`text-sm font-medium ${getRiskColor(mission.riskAssessment.crew)}`}>
                {getRiskLevel(mission.riskAssessment.crew)}
              </span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div 
                className={`${getRiskBarColor(mission.riskAssessment.crew)} h-2 rounded-full transition-all duration-300`}
                style={{ width: `${mission.riskAssessment.crew}%` }}
              />
            </div>
          </div>

          <div className="pt-2 border-t border-slate-200">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-readable">Overall Risk</span>
              <span className={`text-sm font-bold ${getRiskColor(mission.riskAssessment.overall)}`}>
                {getRiskLevel(mission.riskAssessment.overall)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionPreview;
