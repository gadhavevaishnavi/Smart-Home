import React, { useState, useEffect } from 'react';
import { AirConditionerCard } from './components/AirConditionerCard';
import { FanCard } from './components/FanCard';
import { TVCard } from './components/TVCard';
import { LightCard } from './components/LightCard';
import { RGBLightCard } from './components/RGBLightCard';
import { FloatingElements } from './components/FloatingElements';
import { Home, Settings, Zap, Wifi } from 'lucide-react';
import { motion } from 'motion/react';

export default function App() {
  const [settingsMode, setSettingsMode] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Enhanced color themes with more creative colors
  const colorThemes = {
    airConditioner: {
      primary: settingsMode ? '#06B6D4' : '#3B82F6',
      secondary: settingsMode ? '#E0F7FA' : '#DBEAFE',
      accent: settingsMode ? '#0891B2' : '#2563EB',
      glow: settingsMode ? '6, 182, 212' : '59, 130, 246'
    },
    fan: {
      primary: settingsMode ? '#10B981' : '#22C55E',
      secondary: settingsMode ? '#ECFDF5' : '#DCFCE7',
      accent: settingsMode ? '#059669' : '#16A34A',
      glow: settingsMode ? '16, 185, 129' : '34, 197, 94'
    },
    tv: {
      primary: settingsMode ? '#8B5CF6' : '#A855F7',
      secondary: settingsMode ? '#F3E8FF' : '#F3E8FF',
      accent: settingsMode ? '#7C3AED' : '#9333EA',
      glow: settingsMode ? '139, 92, 246' : '168, 85, 247'
    },
    light: {
      primary: settingsMode ? '#F59E0B' : '#EAB308',
      secondary: settingsMode ? '#FEF3C7' : '#FEF08A',
      accent: settingsMode ? '#D97706' : '#CA8A04',
      glow: settingsMode ? '245, 158, 11' : '234, 179, 8'
    },
    rgbLight: {
      primary: settingsMode ? '#EC4899' : '#F43F5E',
      secondary: settingsMode ? '#FDF2F8' : '#FFF1F2',
      accent: settingsMode ? '#DB2777' : '#E11D48',
      glow: settingsMode ? '236, 72, 153' : '244, 63, 94'
    }
  };

  return (
    <div className={`min-h-screen relative overflow-hidden transition-all duration-1000 ${
      settingsMode 
        ? 'bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900' 
        : 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900'
    }`}>
      {/* Floating Background Elements */}
      <FloatingElements settingsMode={settingsMode} />
      
      {/* Ambient Overlay */}
      <div className={`absolute inset-0 transition-opacity duration-1000 ${
        settingsMode ? 'opacity-20' : 'opacity-10'
      }`}>
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 p-4">
        {/* Enhanced Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8 pt-4"
        >
          <div>
            <motion.h1 
              className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              Smart Home
            </motion.h1>
            <motion.p 
              className="text-gray-400 mt-1 flex items-center gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Zap className="w-4 h-4 text-yellow-400" />
              {settingsMode ? 'Creative mode activated!' : 'Control your smart devices'}
            </motion.p>
            <motion.div 
              className="text-sm text-gray-500 mt-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </motion.div>
          </div>
          
          <div className="flex items-center gap-3">
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300 group"
            >
              <Wifi className="w-5 h-5 text-white group-hover:text-green-400 transition-colors" />
            </motion.button>
            
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300 group"
            >
              <Home className="w-5 h-5 text-white group-hover:text-blue-400 transition-colors" />
            </motion.button>
            
            <motion.button 
              onClick={() => setSettingsMode(!settingsMode)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`p-3 rounded-2xl backdrop-blur-md border transition-all duration-500 ${
                settingsMode 
                  ? 'bg-gradient-to-r from-purple-500/50 to-pink-500/50 border-purple-400/50 shadow-lg shadow-purple-500/25' 
                  : 'bg-white/10 border-white/20 hover:bg-white/20'
              }`}
            >
              <Settings className={`w-5 h-5 text-white transition-transform duration-500 ${
                settingsMode ? 'rotate-180' : ''
              }`} />
            </motion.button>
          </div>
        </motion.div>

        {/* Enhanced Appliances Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, staggerChildren: 0.1 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <AirConditionerCard colorTheme={colorThemes.airConditioner} />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <FanCard colorTheme={colorThemes.fan} />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <TVCard colorTheme={colorThemes.tv} />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <LightCard colorTheme={colorThemes.light} />
          </motion.div>
          
          <motion.div
            className="sm:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
          >
            <RGBLightCard colorTheme={colorThemes.rgbLight} />
          </motion.div>
        </motion.div>

        {/* Enhanced Quick Stats */}
        <motion.div 
          className={`max-w-4xl mx-auto rounded-3xl p-6 backdrop-blur-md border transition-all duration-500 ${
            settingsMode 
              ? 'bg-gradient-to-r from-white/10 to-purple-500/10 border-purple-400/30 shadow-2xl shadow-purple-500/10' 
              : 'bg-white/10 border-white/20 shadow-2xl shadow-black/20'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
        >
          <motion.h3 
            className="font-semibold text-white mb-4 flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            System Overview
          </motion.h3>
          
          <div className="grid grid-cols-4 gap-6">
            <motion.div 
              className="text-center group cursor-pointer"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 }}
            >
              <div className={`text-3xl font-bold transition-colors duration-300 ${
                settingsMode ? 'text-cyan-400' : 'text-blue-400'
              } group-hover:text-white`}>
                5
              </div>
              <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Active Devices</div>
            </motion.div>
            
            <motion.div 
              className="text-center group cursor-pointer"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
            >
              <div className={`text-3xl font-bold transition-colors duration-300 ${
                settingsMode ? 'text-emerald-400' : 'text-green-400'
              } group-hover:text-white`}>
                2.4kW
              </div>
              <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Power Usage</div>
            </motion.div>
            
            <motion.div 
              className="text-center group cursor-pointer"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
            >
              <div className={`text-3xl font-bold transition-colors duration-300 ${
                settingsMode ? 'text-amber-400' : 'text-orange-400'
              } group-hover:text-white`}>
                22°C
              </div>
              <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Avg Temp</div>
            </motion.div>
            
            <motion.div 
              className="text-center group cursor-pointer"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6 }}
            >
              <div className={`text-3xl font-bold transition-colors duration-300 ${
                settingsMode ? 'text-pink-400' : 'text-purple-400'
              } group-hover:text-white`}>
                98%
              </div>
              <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Efficiency</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}