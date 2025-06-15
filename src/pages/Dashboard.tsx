import React, { useEffect, useState } from "react";
import { MapPin, Timer } from "lucide-react";
import Header from "../components/Header";
import SolarSystem from "../components/SolarSystem";

interface ISSPosition {
  timestamp: number;
  iss_position: {
    latitude: string;
    longitude: string;
  };
  message: string;
}

interface Launch {
  name: string;
  net: string;
  status: { name: string };
  image: string | null;
  pad?: { name: string; location: { name: string } };
}

const fetchISSLocation = async (): Promise<ISSPosition> => {
  const res = await fetch("https://api.wheretheiss.at/v1/satellites/25544");
  const data = await res.json();
  return {
    message: "success",
    timestamp: Date.now() / 1000,
    iss_position: {
      latitude: data.latitude.toString(),
      longitude: data.longitude.toString(),
    }
  };
};

const fetchLaunches = async (): Promise<Launch[]> => {
  const res = await fetch("https://ll.thespacedevs.com/2.2.0/launch/upcoming/?limit=5");
  const json = await res.json();
  return json.results || [];
};

const Dashboard = () => {
  const [iss, setIss] = useState<ISSPosition | null>(null);
  const [launches, setLaunches] = useState<Launch[]>([]);

  useEffect(() => {
    let mounted = true;
    const getISS = () => {
      fetchISSLocation().then(data => { if (mounted) setIss(data); });
    };
    getISS();
    const interval = setInterval(getISS, 10000);
    return () => { mounted = false; clearInterval(interval); };
  }, []);

  useEffect(() => {
    fetchLaunches().then(setLaunches);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black">
      <Header />
      
      <div className="pt-32 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Live Space Dashboard
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Real-time space data, mission tracking, and interactive exploration tools.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <SolarSystem />
            
            <div className="grid md:grid-cols-1 gap-6">
              <DashboardCard
                title="International Space Station"
                icon={<MapPin className="w-7 h-7 text-blue-400" />}
              >
                {iss ? (
                  <div>
                    <div className="font-semibold text-lg text-white">Current Position</div>
                    <div className="text-gray-300 mt-2">
                      <span>Lat: <span className="text-blue-400">{iss.iss_position.latitude.slice(0,8)}</span></span>
                      <span className="ml-4">Long: <span className="text-blue-400">{iss.iss_position.longitude.slice(0,8)}</span></span>
                    </div>
                    <div className="text-xs text-gray-500 mt-2">Updates every 10s</div>
                  </div>
                ) : (
                  <div className="text-gray-300">Loading ISS position...</div>
                )}
              </DashboardCard>

              <DashboardCard
                title="Mars Weather"
                icon={<Timer className="w-7 h-7 text-orange-400" />}
              >
                <div>
                  <div className="font-semibold text-lg text-white">Latest Data</div>
                  <div className="text-gray-300 mt-2">[Coming soon: integrate NASA InSight or Perseverance APIs]</div>
                  <div className="text-xs text-gray-500 mt-2">Check back soon!</div>
                </div>
              </DashboardCard>
            </div>
          </div>

          <div className="grid md:grid-cols-1 gap-8">
            <DashboardCard
              title="Upcoming Launches"
              icon={<Timer className="w-7 h-7 text-green-400" />}
            >
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {launches.length === 0 && <div className="text-gray-300">Loading launches...</div>}
                {launches.map(l => (
                  <div key={l.name} className="p-3 bg-gray-800/50 rounded-lg border border-gray-600">
                    <div className="font-medium text-white text-sm">{l.name}</div>
                    <div className="text-xs text-gray-400 mt-1">{new Date(l.net).toLocaleDateString()}</div>
                    <div className="text-xs mt-2 text-gray-300">{l.pad?.name}</div>
                    <div className="text-xs text-gray-400">{l.pad?.location.name}</div>
                  </div>
                ))}
              </div>
            </DashboardCard>
          </div>
        </div>
      </div>
    </div>
  );
};

const DashboardCard = ({
  title,
  icon,
  children
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) => (
  <div className="bg-black/40 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-6 flex flex-col">
    <div className="flex items-center gap-4 mb-4">
      <div>{icon}</div>
      <div className="text-lg font-semibold text-white">{title}</div>
    </div>
    <div className="flex-1">{children}</div>
  </div>
);

export default Dashboard;
