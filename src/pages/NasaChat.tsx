
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, Sparkles, Image, Globe, Rocket, Settings } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  images?: string[];
  apiData?: any;
}

const NasaChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your NASA AI assistant. I can help you explore space data, get astronomy pictures, Mars rover images, and much more. What would you like to discover today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const NASA_API_KEY = 'k4aSEmynpTEbLNUsj6N1ISEAdv38O2Sg9IZ6FiKm';

  const quickActions = [
    { icon: Sparkles, text: "Today's Astronomy Picture", action: "Get today's APOD" },
    { icon: Globe, text: "Mars Rover Photos", action: "Show me Mars rover photos" },
    { icon: Rocket, text: "Near Earth Objects", action: "Find near Earth asteroids" },
    { icon: Image, text: "NASA Image Library", action: "Search NASA images" }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const callNasaAPI = async (query: string) => {
    try {
      let apiUrl = '';
      let responseData = null;

      if (query.toLowerCase().includes('apod') || query.toLowerCase().includes('astronomy picture')) {
        apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`;
      } else if (query.toLowerCase().includes('mars') && query.toLowerCase().includes('rover')) {
        apiUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${NASA_API_KEY}`;
      } else if (query.toLowerCase().includes('asteroid') || query.toLowerCase().includes('near earth')) {
        const today = new Date().toISOString().split('T')[0];
        apiUrl = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&end_date=${today}&api_key=${NASA_API_KEY}`;
      } else if (query.toLowerCase().includes('earth') && query.toLowerCase().includes('image')) {
        apiUrl = `https://api.nasa.gov/planetary/earth/imagery?lon=100.75&lat=1.5&date=2014-02-01&api_key=${NASA_API_KEY}`;
      }

      if (apiUrl) {
        const response = await fetch(apiUrl);
        responseData = await response.json();
      }

      return responseData;
    } catch (error) {
      console.error('NASA API Error:', error);
      return null;
    }
  };

  const generateResponse = (query: string, apiData: any) => {
    if (query.toLowerCase().includes('apod') || query.toLowerCase().includes('astronomy picture')) {
      if (apiData && apiData.url) {
        return {
          text: `Here's today's Astronomy Picture of the Day: "${apiData.title}"\n\n${apiData.explanation}`,
          images: [apiData.url]
        };
      }
    } else if (query.toLowerCase().includes('mars') && query.toLowerCase().includes('rover')) {
      if (apiData && apiData.photos && apiData.photos.length > 0) {
        const photos = apiData.photos.slice(0, 3);
        return {
          text: `Here are some amazing photos from the Curiosity rover on Mars! These were taken on Sol ${photos[0].sol} using the ${photos[0].camera.full_name}.`,
          images: photos.map((photo: any) => photo.img_src)
        };
      }
    } else if (query.toLowerCase().includes('asteroid') || query.toLowerCase().includes('near earth')) {
      if (apiData && apiData.near_earth_objects) {
        const today = new Date().toISOString().split('T')[0];
        const asteroids = apiData.near_earth_objects[today] || [];
        if (asteroids.length > 0) {
          const asteroid = asteroids[0];
          return {
            text: `Found ${asteroids.length} near-Earth objects today! Here's one: "${asteroid.name}" - estimated diameter: ${Math.round(asteroid.estimated_diameter.meters.estimated_diameter_max)} meters. ${asteroid.is_potentially_hazardous_asteroid ? 'This asteroid is potentially hazardous.' : 'This asteroid is not considered hazardous.'}`
          };
        }
      }
    }

    return {
      text: "I can help you explore NASA's incredible data! Try asking about:\n• Today's astronomy picture\n• Mars rover photos\n• Near Earth asteroids\n• Earth imagery\n• Space weather\n• Exoplanets\n\nWhat interests you most?"
    };
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const apiData = await callNasaAPI(inputValue);
      const response = generateResponse(inputValue, apiData);

      const aiMessage: Message = {
        id: messages.length + 2,
        text: response.text,
        sender: 'ai',
        timestamp: new Date(),
        images: response.images,
        apiData
      };

      setTimeout(() => {
        setMessages(prev => [...prev, aiMessage]);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      const errorMessage: Message = {
        id: messages.length + 2,
        text: "I'm having trouble connecting to NASA's servers right now. Please try again in a moment!",
        sender: 'ai',
        timestamp: new Date()
      };

      setTimeout(() => {
        setMessages(prev => [...prev, errorMessage]);
        setIsLoading(false);
      }, 1000);
    }

    setInputValue('');
  };

  const handleQuickAction = (action: string) => {
    setInputValue(action);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="sticky top-0 z-50 backdrop-blur-2xl bg-black/20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-3"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Rocket className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">NASA AI Assistant</h1>
                <p className="text-sm text-gray-300">Explore the cosmos with AI</p>
              </div>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => window.location.href = '/'}
              className="glass-button text-white hover:text-cyan-300"
            >
              Back to Home
            </motion.button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6 h-[calc(100vh-88px)] flex flex-col">
        {/* Quick Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
        >
          {quickActions.map((action, index) => (
            <motion.button
              key={action.text}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleQuickAction(action.action)}
              className="glass-card p-4 text-center text-white hover:bg-white/10 transition-all duration-300"
            >
              <action.icon className="w-8 h-8 mx-auto mb-2 text-blue-400" />
              <p className="text-sm font-medium">{action.text}</p>
            </motion.button>
          ))}
        </motion.div>

        {/* Chat Messages */}
        <div className="flex-1 glass-card mb-6 overflow-hidden">
          <div className="h-full overflow-y-auto p-6 space-y-6">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-2xl ${message.sender === 'user' ? 'order-2' : ''}`}>
                    {message.sender === 'ai' && (
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <Rocket className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-sm font-medium text-blue-400">NASA AI</span>
                      </div>
                    )}
                    
                    <div className={`rounded-2xl p-4 ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white ml-auto'
                        : 'glass text-white'
                    }`}>
                      <p className="whitespace-pre-wrap">{message.text}</p>
                      
                      {message.images && message.images.length > 0 && (
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                          {message.images.map((imageUrl, index) => (
                            <motion.img
                              key={index}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.2 }}
                              src={imageUrl}
                              alt={`NASA Image ${index + 1}`}
                              className="rounded-xl w-full h-48 object-cover"
                            />
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <p className="text-xs text-gray-400 mt-2">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="glass rounded-2xl p-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-4"
        >
          <div className="flex space-x-4">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSendMessage()}
              placeholder="Ask about space, astronomy, Mars, or any NASA data..."
              className="flex-1 bg-white/10 backdrop-blur-lg rounded-2xl px-6 py-4 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 border border-white/10"
              disabled={isLoading}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSendMessage}
              disabled={isLoading || !inputValue.trim()}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
            >
              <ArrowUp className="w-6 h-6" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NasaChat;
