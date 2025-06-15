
import React, { useEffect, useState } from "react";
import { MapPin, Timer } from "lucide-react";

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
  // wheretheiss.at uses "latitude" instead of iss_position
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
  // Using Launch Library 2 (no API key required)
  const res = await fetch("https://ll.thespacedevs.com/2.2.0/launch/upcoming/?limit=5");
  const json = await res.json();
  return json.results || [];
};

const Dashboard = () => {
  const [iss, setIss] = useState<ISSPosition | null>(null);
  const [launches, setLaunches] = useState<Launch[]>([]);
  const [loading, setLoading] = useState(true);

  // Poll ISS position every 10 seconds
  useEffect(() => {
    let mounted = true;
    const getISS = () => {
      fetchISSLocation().then(data => { if (mounted) setIss(data); });
    };
    getISS();
    const interval = setInterval(getISS, 10000);
    return () => { mounted = false; clearInterval(interval); };
  }, []);

  // Launches once on mount
  useEffect(() => {
    fetchLaunches().then(setLaunches);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-6 text-blue-900 gradient-text">Live Space Dashboard</h1>
        <div className="grid md:grid-cols-3 gap-8">
          {/* ISS Location Card */}
          <DashboardCard
            title="International Space Station"
            icon={<MapPin className="w-7 h-7 text-blue-500" />}
          >
            {iss ? (
              <div>
                <div className="font-semibold text-lg">Current Position</div>
                <div className="text-gray-700 mt-2">
                  <span>Lat: <span className="text-blue-700">{iss.iss_position.latitude.slice(0,8)}</span></span>
                  <span className="ml-4">Long: <span className="text-blue-700">{iss.iss_position.longitude.slice(0,8)}</span></span>
                </div>
                <div className="text-xs text-gray-400 mt-2">Updates every 10s</div>
              </div>
            ) : (
              <div>Loading ISS position...</div>
            )}
          </DashboardCard>
          {/* Mars Weather Card (placeholder) */}
          <DashboardCard
            title="Mars Weather"
            icon={<Timer className="w-7 h-7 text-orange-500" />}
          >
            <div>
              <div className="font-semibold text-lg">Latest Data</div>
              <div className="text-gray-700 mt-2">[Coming soon: integrate NASA InSight or Perseverance APIs]</div>
              <div className="text-xs text-gray-400 mt-2">Check back soon!</div>
            </div>
          </DashboardCard>
          {/* Upcoming Launches */}
          <DashboardCard
            title="Upcoming Launches"
            icon={<Timer className="w-7 h-7 text-green-500" />}
          >
            <div className="space-y-2">
              {launches.length === 0 && <div>Loading launches...</div>}
              {launches.map(l => (
                <div key={l.name} className="p-2 border-b last:border-b-0">
                  <span className="font-medium">{l.name}</span>
                  <span className="ml-2 text-xs text-gray-500">{new Date(l.net).toLocaleString()}</span>
                  <div className="text-xs mt-1">{l.pad?.name} &mdash; {l.pad?.location.name}</div>
                </div>
              ))}
            </div>
          </DashboardCard>
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
  <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 flex flex-col">
    <div className="flex items-center gap-4 mb-2">
      <div>{icon}</div>
      <div className="text-lg font-semibold">{title}</div>
    </div>
    <div className="flex-1">{children}</div>
  </div>
);

export default Dashboard;
