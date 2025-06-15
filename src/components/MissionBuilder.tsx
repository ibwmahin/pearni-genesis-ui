
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Rocket, Users, Target, Wrench } from 'lucide-react';
import type { Mission } from '../pages/MissionPlanner';

interface MissionBuilderProps {
  mission: Mission;
  onUpdate: (mission: Mission) => void;
}

const MissionBuilder = ({ mission, onUpdate }: MissionBuilderProps) => {
  const updateMission = (updates: Partial<Mission>) => {
    onUpdate({ ...mission, ...updates });
  };

  const addObjective = () => {
    const objectives = [...mission.objectives, 'New Objective'];
    updateMission({ objectives });
  };

  const updateObjective = (index: number, value: string) => {
    const objectives = [...mission.objectives];
    objectives[index] = value;
    updateMission({ objectives });
  };

  const removeObjective = (index: number) => {
    const objectives = mission.objectives.filter((_, i) => i !== index);
    updateMission({ objectives });
  };

  return (
    <div className="space-y-6">
      <div className="glass-card">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-purple-100 rounded-full">
            <Target className="w-5 h-5 text-purple-600" />
          </div>
          <h2 className="text-xl font-bold text-readable">Mission Overview</h2>
        </div>
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-readable mb-2">Mission Name</label>
              <input
                type="text"
                value={mission.name}
                onChange={(e) => updateMission({ name: e.target.value })}
                className="w-full bg-white/80 border border-slate-200 rounded-lg px-3 py-2 text-readable focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-readable mb-2">Mission Type</label>
              <select
                value={mission.type}
                onChange={(e) => updateMission({ type: e.target.value as Mission['type'] })}
                className="w-full bg-white/80 border border-slate-200 rounded-lg px-3 py-2 text-readable focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="mars-exploration">Mars Exploration</option>
                <option value="asteroid-mining">Asteroid Mining</option>
                <option value="space-station">Space Station</option>
                <option value="lunar-base">Lunar Base</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-readable mb-2">Duration (days)</label>
              <input
                type="number"
                value={mission.duration}
                onChange={(e) => updateMission({ duration: parseInt(e.target.value) })}
                className="w-full bg-white/80 border border-slate-200 rounded-lg px-3 py-2 text-readable focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-readable mb-2">Crew Size</label>
              <input
                type="number"
                value={mission.crewSize}
                onChange={(e) => updateMission({ crewSize: parseInt(e.target.value) })}
                className="w-full bg-white/80 border border-slate-200 rounded-lg px-3 py-2 text-readable focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="glass-card">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-100 rounded-full">
            <Rocket className="w-5 h-5 text-blue-600" />
          </div>
          <h2 className="text-xl font-bold text-readable">Spacecraft Configuration</h2>
        </div>
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-readable mb-2">Propulsion System</label>
              <select
                value={mission.spacecraft.propulsion}
                onChange={(e) => updateMission({ 
                  spacecraft: { ...mission.spacecraft, propulsion: e.target.value }
                })}
                className="w-full bg-white/80 border border-slate-200 rounded-lg px-3 py-2 text-readable focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="chemical">Chemical Rockets</option>
                <option value="ion">Ion Drive</option>
                <option value="nuclear">Nuclear Thermal</option>
                <option value="fusion">Fusion Drive (Future)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-readable mb-2">Habitat Module</label>
              <select
                value={mission.spacecraft.habitat}
                onChange={(e) => updateMission({ 
                  spacecraft: { ...mission.spacecraft, habitat: e.target.value }
                })}
                className="w-full bg-white/80 border border-slate-200 rounded-lg px-3 py-2 text-readable focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="standard">Standard Module</option>
                <option value="extended">Extended Duration</option>
                <option value="luxury">Luxury Habitat</option>
                <option value="minimal">Minimal/Robotic</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-readable mb-2">Power System</label>
              <select
                value={mission.spacecraft.power}
                onChange={(e) => updateMission({ 
                  spacecraft: { ...mission.spacecraft, power: e.target.value }
                })}
                className="w-full bg-white/80 border border-slate-200 rounded-lg px-3 py-2 text-readable focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="solar">Solar Panels</option>
                <option value="nuclear">Nuclear Reactor</option>
                <option value="hybrid">Hybrid Solar/Nuclear</option>
                <option value="fuel-cell">Fuel Cells</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-readable mb-2">Communication</label>
              <select
                value={mission.spacecraft.communication}
                onChange={(e) => updateMission({ 
                  spacecraft: { ...mission.spacecraft, communication: e.target.value }
                })}
                className="w-full bg-white/80 border border-slate-200 rounded-lg px-3 py-2 text-readable focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="standard">Standard Radio</option>
                <option value="deep-space">Deep Space Network</option>
                <option value="laser">Laser Communication</option>
                <option value="quantum">Quantum Entanglement (Future)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-card">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-green-100 rounded-full">
            <Target className="w-5 h-5 text-green-600" />
          </div>
          <h2 className="text-xl font-bold text-readable">Mission Objectives</h2>
        </div>
        <div className="space-y-4">
          {mission.objectives.map((objective, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={objective}
                onChange={(e) => updateObjective(index, e.target.value)}
                className="flex-1 bg-white/80 border border-slate-200 rounded-lg px-3 py-2 text-readable focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter mission objective..."
              />
              <Button
                variant="destructive"
                size="sm"
                onClick={() => removeObjective(index)}
              >
                Remove
              </Button>
            </div>
          ))}
          <Button onClick={addObjective} variant="outline" className="w-full">
            Add Objective
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MissionBuilder;
