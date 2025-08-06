import React, { useState } from 'react';
import { Switch } from './ui/switch';
import { Slider } from './ui/slider';
import { Snowflake, Wind, Thermometer, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { motion } from 'motion/react';

interface ColorTheme {
  primary: string;
  secondary: string;
  accent: string;
  glow: string;
}

interface AirConditionerCardProps {
  colorTheme: ColorTheme;
}

export function AirConditionerCard({ colorTheme }: AirConditionerCardProps) {
  const [isOn, setIsOn] = useState(false);
  const [temperature, setTemperature] = useState([22]);
  const [mode, setMode] = useState<'cool' | 'heat' | 'fan'>('cool');

  const modes = [
    { value: 'cool', icon: Snowflake, label: 'Cool' },
    { value: 'heat', icon: Thermometer, label: 'Heat' },
    { value: 'fan', icon: Wind, label: 'Fan' }
  ];

  return (
    <motion.div 
      className={`relative rounded-3xl p-6 backdrop-blur-md border transition-all duration-500 group hover:scale-105 ${
        isOn 
          ? 'bg-white/10 border-white/30 shadow-2xl' 
          : 'bg-white/5 border-white/20 hover:bg-white/10'
      }`}
      style={{
        boxShadow: isOn ? `0 25px 50px -12px rgba(${colorTheme.glow}, 0.3)` : undefined
      }}
      whileHover={{ y: -5 }}
      layout
    >
      {/* Glow effect */}
      {isOn && (
        <div 
          className="absolute inset-0 rounded-3xl opacity-20 blur-xl"
          style={{ backgroundColor: colorTheme.primary }}
        />
      )}
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6 relative z-10">
        <div className="flex items-center gap-4">
          <motion.div 
            className={`p-3 rounded-2xl backdrop-blur-md border transition-all duration-300 ${
              isOn ? 'bg-white/20 border-white/30' : 'bg-white/10 border-white/20'
            }`}
            whileHover={{ scale: 1.1, rotate: 10 }}
            whileTap={{ scale: 0.95 }}
          >
            <Snowflake 
              className={`w-6 h-6 transition-colors duration-300 ${
                isOn ? 'text-white' : 'text-gray-400'
              }`}
              style={{ color: isOn ? colorTheme.primary : undefined }}
            />
          </motion.div>
          <div>
            <h3 className="font-semibold text-white flex items-center gap-2">
              Air Conditioner
              {isOn && <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />}
            </h3>
            <p className="text-sm text-gray-400">Living Room</p>
          </div>
        </div>
        <Switch checked={isOn} onCheckedChange={setIsOn} />
      </div>

      {/* Temperature Display */}
      <motion.div 
        className="text-center mb-6"
        animate={{ scale: isOn ? 1 : 0.95 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div 
          className={`text-4xl font-bold transition-colors duration-300 ${
            isOn ? 'text-white' : 'text-gray-500'
          }`}
          style={{ color: isOn ? colorTheme.primary : undefined }}
          animate={{ 
            textShadow: isOn ? `0 0 20px rgba(${colorTheme.glow}, 0.5)` : 'none'
          }}
        >
          {temperature[0]}°C
        </motion.div>
        <div className="text-sm text-gray-400 mt-1">Target Temperature</div>
        
        {/* Cool air animation */}
        {isOn && mode === 'cool' && (
          <div className="absolute top-20 left-1/2 transform -translate-x-1/2">
            {Array.from({ length: 3 }).map((_, i) => (
              <motion.div
                key={i}
                className="w-1 h-1 bg-blue-300 rounded-full absolute"
                animate={{
                  y: [0, -30],
                  opacity: [1, 0],
                  x: [0, Math.random() * 20 - 10],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
                style={{ left: `${i * 10}px` }}
              />
            ))}
          </div>
        )}
      </motion.div>

      {/* Temperature Slider */}
      <div className="mb-6">
        <Slider
          value={temperature}
          onValueChange={setTemperature}
          max={30}
          min={16}
          step={1}
          disabled={!isOn}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-2">
          <span>16°</span>
          <span>30°</span>
        </div>
      </div>

      {/* Mode Selection */}
      <div className="grid grid-cols-3 gap-3">
        {modes.map(({ value, icon: Icon, label }) => (
          <motion.div key={value}>
            <Button
              variant={mode === value && isOn ? "default" : "outline"}
              size="sm"
              onClick={() => setMode(value as any)}
              disabled={!isOn}
              className={`w-full flex flex-col gap-2 h-auto py-3 backdrop-blur-md border transition-all duration-300 ${
                mode === value && isOn 
                  ? 'bg-white/20 border-white/40 text-white shadow-lg' 
                  : 'bg-white/5 border-white/20 text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium">{label}</span>
            </Button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}