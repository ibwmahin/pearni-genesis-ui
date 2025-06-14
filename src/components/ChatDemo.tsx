
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ChatDemo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm pearNI. How can I help you today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  const sampleQuestions = [
    "Explain CRISPR in one sentence",
    "How can AI help solve climate change?",
    "What's the future of quantum computing?",
    "Design an experiment for drug discovery"
  ];

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      let aiResponse = "";
      
      if (inputValue.toLowerCase().includes('crispr')) {
        aiResponse = "CRISPR is a revolutionary gene-editing tool that allows precise DNA modifications, enabling scientists to potentially cure genetic diseases and enhance crop resilience.";
      } else if (inputValue.toLowerCase().includes('climate')) {
        aiResponse = "AI can optimize renewable energy grids, predict climate patterns, accelerate green technology development, and coordinate global sustainability efforts through data-driven insights.";
      } else if (inputValue.toLowerCase().includes('quantum')) {
        aiResponse = "Quantum computing promises exponential speedups for complex problems like cryptography, drug discovery, and AI training, with commercial applications emerging within the next decade.";
      } else if (inputValue.toLowerCase().includes('drug') || inputValue.toLowerCase().includes('experiment')) {
        aiResponse = "I can design a multi-phase drug discovery experiment using AI-driven molecular modeling, automated high-throughput screening, and predictive toxicology analysis to accelerate development timelines.";
      } else {
        aiResponse = "That's a fascinating question! As an AGI system, I can help you explore complex topics across science, technology, and innovation. What specific aspect would you like to dive deeper into?";
      }

      const aiMessage = {
        id: messages.length + 2,
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    }, 1500);

    setInputValue('');
  };

  const handleSampleQuestion = (question: string) => {
    setInputValue(question);
  };

  return (
    <section id="demo" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Experience <span className="gradient-text">pearNI</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Interact with our advanced AGI system and discover how it can transform your research and innovation process.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Sample Questions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="glass-card mb-8"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Try asking pearNI:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sampleQuestions.map((question, index) => (
                <motion.button
                  key={question}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSampleQuestion(question)}
                  className="text-left p-4 glass rounded-xl hover:bg-white/30 transition-all duration-300"
                >
                  <i className='bx bx-chat text-teal-500 mr-2'></i>
                  {question}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Chat Interface */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="glass-card"
          >
            {/* Chat Header */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/20">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex items-center justify-center">
                  <i className='bx bxs-pear text-white'></i>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">pearNI Assistant</h4>
                  <p className="text-sm text-green-500 flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                    Online
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-gray-500">
                <i className='bx bx-shield-check'></i>
                <span className="text-sm">Secure Chat</span>
              </div>
            </div>

            {/* Messages */}
            <div className="h-64 overflow-y-auto mb-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white'
                      : 'glass text-gray-800'
                  }`}>
                    {message.sender === 'ai' && (
                      <div className="flex items-center space-x-2 mb-1">
                        <i className='bx bxs-pear text-xs text-teal-500'></i>
                        <span className="text-xs font-medium text-teal-600">pearNI</span>
                      </div>
                    )}
                    <p className="text-sm">{message.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Input */}
            <div className="flex space-x-3">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask pearNI anything..."
                className="flex-1 glass rounded-full px-4 py-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSendMessage}
                className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <i className='bx bx-send'></i>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ChatDemo;
