
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Key, Save, Eye, EyeOff, X } from 'lucide-react';
import { apiService } from '../services/apiService';

interface APIKeyManagerProps {
  isOpen: boolean;
  onClose: () => void;
  onKeysSet: () => void;
}

const APIKeyManager: React.FC<APIKeyManagerProps> = ({ isOpen, onClose, onKeysSet }) => {
  const [nasaKey, setNasaKey] = useState('');
  const [geminiKey, setGeminiKey] = useState('');
  const [showNasaKey, setShowNasaKey] = useState(false);
  const [showGeminiKey, setShowGeminiKey] = useState(false);
  const [isLoading, setSaving] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const keys = apiService.getAPIKeys();
      if (keys) {
        setNasaKey(keys.nasa);
        setGeminiKey(keys.gemini);
      }
    }
  }, [isOpen]);

  const handleSave = async () => {
    if (!nasaKey.trim() || !geminiKey.trim()) {
      alert('Please enter both API keys');
      return;
    }

    setSaving(true);
    try {
      apiService.setAPIKeys(nasaKey.trim(), geminiKey.trim());
      onKeysSet();
      onClose();
    } catch (error) {
      console.error('Error saving API keys:', error);
      alert('Error saving API keys');
    }
    setSaving(false);
  };

  const handleClear = () => {
    apiService.clearAPIKeys();
    setNasaKey('');
    setGeminiKey('');
    onKeysSet();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Key className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">API Configuration</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                NASA API Key
              </label>
              <div className="relative">
                <input
                  type={showNasaKey ? 'text' : 'password'}
                  value={nasaKey}
                  onChange={(e) => setNasaKey(e.target.value)}
                  placeholder="Enter your NASA API key"
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowNasaKey(!showNasaKey)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded"
                >
                  {showNasaKey ? (
                    <EyeOff className="w-5 h-5 text-gray-500" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-500" />
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Get your free key from{' '}
                <a href="https://api.nasa.gov/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  api.nasa.gov
                </a>
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gemini API Key
              </label>
              <div className="relative">
                <input
                  type={showGeminiKey ? 'text' : 'password'}
                  value={geminiKey}
                  onChange={(e) => setGeminiKey(e.target.value)}
                  placeholder="Enter your Gemini API key"
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowGeminiKey(!showGeminiKey)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded"
                >
                  {showGeminiKey ? (
                    <EyeOff className="w-5 h-5 text-gray-500" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-500" />
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Get your free key from{' '}
                <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  Google AI Studio
                </a>
              </p>
            </div>
          </div>

          <div className="flex space-x-3 mt-6">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSave}
              disabled={isLoading}
              className="flex-1 bg-blue-600 text-white px-4 py-3 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>{isLoading ? 'Saving...' : 'Save Keys'}</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleClear}
              className="px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Clear
            </motion.button>
          </div>

          <div className="mt-4 p-3 bg-blue-50 rounded-xl">
            <p className="text-xs text-blue-700">
              <strong>Security:</strong> Your API keys are stored locally in your browser and never sent to our servers.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default APIKeyManager;
