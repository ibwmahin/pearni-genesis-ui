
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, Send, User, Bot } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  images?: string[];
  apiData?: any;
}

const NasaChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const NASA_API_KEY = 'k4aSEmynpTEbLNUsj6N1ISEAdv38O2Sg9IZ6FiKm';

  const examplePrompts = [
    {
      icon: '🤔',
      title: 'Ask complex questions',
      example: 'What are the latest discoveries from the James Webb Space Telescope and how do they change our understanding of the universe?'
    },
    {
      icon: '🏆',
      title: 'Get better answers',
      example: 'Compare the atmospheric conditions of Mars and Venus and explain which would be easier to terraform'
    },
    {
      icon: '💡',
      title: 'Get creative inspiration',
      example: 'Write a poem about black holes in the style of Carl Sagan while explaining their scientific properties'
    }
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
      text: "I'm pearNI, your AI-powered assistant for space exploration and sustainable innovation. I can help you with:\n\n• Space data and astronomy\n• NASA mission information\n• Environmental analysis\n• Sustainable technology insights\n• Creative problem-solving\n\nWhat would you like to explore today?"
    };
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    setShowWelcome(false);

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
        text: "I'm having trouble processing your request right now. Please try again in a moment!",
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

  const handleExampleClick = (example: string) => {
    setInputValue(example);
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
            <button
              onClick={() => window.location.href = '/'}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Back to Home
            </button>
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
            <p className="text-xl text-gray-600 mb-16">
              Your AI-powered space exploration and sustainability engine
            </p>

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
              Let's explore together. pearNI is powered by AI for space data, sustainability insights, and creative problem-solving.
            </p>
          </motion.div>
        ) : (
          // Chat Messages
          <div className="space-y-6 mb-6 mt-8">
            <AnimatePresence>
              {messages.map((message) => (
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
                      <p className="text-gray-800 whitespace-pre-wrap">{message.text}</p>
                      
                      {message.images && message.images.length > 0 && (
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                          {message.images.map((imageUrl, index) => (
                            <img
                              key={index}
                              src={imageUrl}
                              alt={`Space Image ${index + 1}`}
                              className="rounded-xl w-full h-48 object-cover"
                            />
                          ))}
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-2 ml-4">
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
                className="flex space-x-4"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <i className='bx bxs-pear text-white text-sm'></i>
                </div>
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}

        {/* Input Area */}
        <div className="sticky bottom-6">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4">
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Send className="w-5 h-5 text-blue-600" />
              </button>
              
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSendMessage()}
                placeholder="Ask me anything about space, sustainability, or get creative inspiration..."
                className="flex-1 outline-none text-gray-800 placeholder-gray-500"
                disabled={isLoading}
              />
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSendMessage}
                disabled={isLoading || !inputValue.trim()}
                className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowUp className="w-5 h-5" />
              </motion.button>
            </div>
            
            <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
              <span>0/{inputValue.length}</span>
              <button className="hover:text-gray-700 transition-colors">
                Feedback
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NasaChat;
