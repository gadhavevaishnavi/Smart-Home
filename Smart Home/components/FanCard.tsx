import React, { useState } from 'react';
import { Switch } from './ui/switch';
import { Slider } from './ui/slider';
import { Fan, RotateCw, Wind } from 'lucide-react';
import { Button } from './ui/button';
import { motion } from 'motion/react';

interface ColorTheme {
  primary: string;
  secondary: string;
  accent: string;
  glow: string;
}

interface FanCardProps {
  colorTheme: ColorTheme;
}

export function FanCard({ colorTheme }: FanCardProps) {
  const [isOn, setIsOn] = useState(true);
  const [speed, setSpeed] = useState([3]);
  const [oscillating, setOscillating] = useState(false);

  const speedLabels = ['Off', 'Low', 'Medium', 'High', 'Max'];

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
            animate={{ rotate: isOn ? 360 : 0 }}
            transition={{ duration: 2, repeat: isOn ? Infinity : 0, ease: "linear" }}
            whileHover={{ scale: 1.1 }}
          >
            <Fan 
              className={`w-6 h-6 transition-colors duration-300 ${
                isOn ? 'text-white' : 'text-gray-400'
              }`}
              style={{ color: isOn ? colorTheme.primary : undefined }}
            />
          </motion.div>
          <div>
            <h3 className="font-semibold text-white flex items-center gap-2">
              Ceiling Fan
              {isOn && <Wind className="w-4 h-4 text-blue-400 animate-pulse" />}
            </h3>
            <p className="text-sm text-gray-400">Bedroom</p>
          </div>
        </div>
        <Switch checked={isOn} onCheckedChange={setIsOn} />
      </div>

      {/* Speed Display */}
      <motion.div 
        className="text-center mb-6"
        animate={{ scale: isOn ? 1 : 0.95 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div 
          className={`text-3xl font-bold transition-colors duration-300 ${
            isOn ? 'text-white' : 'text-gray-500'
          }`}
          style={{ color: isOn ? colorTheme.primary : undefined }}
          animate={{ 
            textShadow: isOn ? `0 0 20px rgba(${colorTheme.glow}, 0.5)` : 'none'
          }}
        >
          {speedLabels[speed[0]]}
        </motion.div>
        <div className="text-sm text-gray-400 mt-1">Speed Level</div>
        
        {/* Wind animation */}
        {isOn && speed[0] > 0 && (
          <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-full">
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.div
                key={i}
                className="w-8 h-0.5 bg-gradient-to-r from-transparent via-white/30 to-transparent absolute"
                animate={{
                  x: ['-100%', '200%'],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
                style={{ 
                  top: `${i * 8}px`,
                  animationPlayState: isOn ? 'running' : 'paused'
                }}
              />
            ))}
          </div>
        )}
      </motion.div>

      {/* Speed Slider */}
      <div className="mb-6">
        <Slider
          value={speed}
          onValueChange={setSpeed}
          max={4}
          min={0}
          step={1}
          disabled={!isOn}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-2">
          <span>Off</span>
          <span>Max</span>
        </div>
      </div>

      {/* Controls */}
      <motion.div>
        <Button
          variant={oscillating && isOn ? "default" : "outline"}
          size="sm"
          onClick={() => setOscillating(!oscillating)}
          disabled={!isOn}
          className={`w-full flex items-center justify-center gap-3 h-12 backdrop-blur-md border transition-all duration-300 ${
            oscillating && isOn 
              ? 'bg-white/20 border-white/40 text-white shadow-lg' 
              : 'bg-white/5 border-white/20 text-gray-400 hover:bg-white/10 hover:text-white'
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.div
            animate={{ rotate: oscillating && isOn ? 360 : 0 }}
            transition={{ duration: 2, repeat: oscillating && isOn ? Infinity : 0, ease: "linear" }}
          >
            <RotateCw className="w-5 h-5" />
          </motion.div>
          <span className="font-medium">Oscillation</span>
          {oscillating && isOn && (
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          )}
        </Button>
      </motion.div>
    </motion.div>
  );
}