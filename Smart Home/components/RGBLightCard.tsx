import React, { useState } from 'react';
import { Switch } from './ui/switch';
import { Slider } from './ui/slider';
import { Palette, Lightbulb, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { motion } from 'motion/react';

interface ColorTheme {
  primary: string;
  secondary: string;
  accent: string;
  glow: string;
}

interface RGBLightCardProps {
  colorTheme: ColorTheme;
}

export function RGBLightCard({ colorTheme }: RGBLightCardProps) {
  const [isOn, setIsOn] = useState(false);
  const [brightness, setBrightness] = useState([60]);
  const [selectedColor, setSelectedColor] = useState('#3B82F6');

  const colorPresets = [
    { color: '#EF4444', name: 'Red' },
    { color: '#F97316', name: 'Orange' },
    { color: '#EAB308', name: 'Yellow' },
    { color: '#22C55E', name: 'Green' },
    { color: '#3B82F6', name: 'Blue' },
    { color: '#8B5CF6', name: 'Purple' },
    { color: '#EC4899', name: 'Pink' },
    { color: '#FFFFFF', name: 'White' }
  ];

  const getColorStyle = (color: string) => {
    if (color === '#FFFFFF') {
      return { backgroundColor: color, border: '1px solid #e5e7eb' };
    }
    return { backgroundColor: color };
  };

  return (
    <motion.div 
      className={`relative rounded-3xl p-6 backdrop-blur-md border transition-all duration-500 group hover:scale-105 ${
        isOn 
          ? 'bg-white/10 border-white/30 shadow-2xl' 
          : 'bg-white/5 border-white/20 hover:bg-white/10'
      }`}
      style={{
        boxShadow: isOn ? `0 25px 50px -12px ${selectedColor}40` : undefined
      }}
      whileHover={{ y: -5 }}
      layout
    >
      {/* Dynamic glow effect based on selected color */}
      {isOn && (
        <motion.div 
          className="absolute inset-0 rounded-3xl opacity-20 blur-xl"
          style={{ backgroundColor: selectedColor }}
          animate={{ 
            opacity: [0.2, 0.4, 0.2],
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
      )}
      
      {/* Color spectrum animation */}
      {isOn && (
        <div className="absolute inset-0 rounded-3xl overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 via-purple-500 to-pink-500"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
        </div>
      )}
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6 relative z-10">
        <div className="flex items-center gap-4">
          <motion.div 
            className={`p-3 rounded-2xl backdrop-blur-md border transition-all duration-300 ${
              isOn ? 'bg-white/20 border-white/30' : 'bg-white/10 border-white/20'
            }`}
            style={{ backgroundColor: isOn ? `${selectedColor}20` : undefined }}
            whileHover={{ scale: 1.1, rotate: 10 }}
            animate={{ 
              boxShadow: isOn ? `0 0 20px ${selectedColor}40` : 'none'
            }}
          >
            <Palette 
              className={`w-6 h-6 transition-colors duration-300 ${
                isOn ? 'text-white' : 'text-gray-400'
              }`}
              style={{ color: isOn ? selectedColor : undefined }}
            />
          </motion.div>
          <div>
            <h3 className="font-semibold text-white flex items-center gap-2">
              RGB Strip Light
              {isOn && <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />}
            </h3>
            <p className="text-sm text-gray-400">Gaming Room</p>
          </div>
        </div>
        <Switch checked={isOn} onCheckedChange={setIsOn} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Brightness Control */}
        <div>
          <motion.div 
            className="text-center mb-4"
            animate={{ scale: isOn ? 1 : 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className={`text-3xl font-bold transition-colors duration-300 ${
                isOn ? 'text-white' : 'text-gray-500'
              }`}
              style={{ color: isOn ? selectedColor : undefined }}
              animate={{ 
                textShadow: isOn ? `0 0 20px ${selectedColor}80` : 'none'
              }}
            >
              {brightness[0]}%
            </motion.div>
            <div className="text-sm text-gray-400 mt-1">Brightness</div>
          </motion.div>
          
          <div className="mb-4">
            <Slider
              value={brightness}
              onValueChange={setBrightness}
              max={100}
              min={1}
              step={1}
              disabled={!isOn}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-2">
              <span>1%</span>
              <span>100%</span>
            </div>
          </div>
        </div>

        {/* Color Selection */}
        <div>
          <div className="text-center mb-4">
            <motion.div 
              className="w-12 h-12 rounded-2xl mx-auto border-2 border-white/30 backdrop-blur-md"
              style={getColorStyle(selectedColor)}
              animate={{ 
                scale: isOn ? [1, 1.1, 1] : 1,
                boxShadow: isOn ? `0 0 30px ${selectedColor}60` : 'none'
              }}
              transition={{ 
                duration: 2, 
                repeat: isOn ? Infinity : 0, 
                ease: "easeInOut" 
              }}
              whileHover={{ scale: 1.1 }}
            />
            <div className="text-sm text-gray-400 mt-2">Selected Color</div>
          </div>

          <div className="grid grid-cols-4 gap-3">
            {colorPresets.map(({ color, name }) => (
              <motion.div key={color}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedColor(color)}
                  disabled={!isOn}
                  className={`p-2 h-auto border-2 transition-all duration-300 rounded-xl backdrop-blur-md ${
                    selectedColor === color && isOn 
                      ? 'border-white/50 scale-110 shadow-lg' 
                      : 'border-white/20 hover:border-white/40'
                  }`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    boxShadow: selectedColor === color && isOn ? `0 0 15px ${color}60` : 'none'
                  }}
                >
                  <div 
                    className="w-8 h-8 rounded-xl"
                    style={getColorStyle(color)}
                  />
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Light Effect Preview */}
      {isOn && (
        <motion.div 
          className="mt-6 p-4 rounded-2xl backdrop-blur-md border border-white/20"
          style={{ 
            backgroundColor: `${selectedColor}10`,
            borderColor: `${selectedColor}40`
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                <Lightbulb 
                  className="w-5 h-5" 
                  style={{ color: selectedColor }} 
                />
              </motion.div>
              <span className="text-sm text-white font-medium">
                RGB Strip Active
              </span>
            </div>
            <div className="text-xs text-gray-400">
              {brightness[0]}% • {colorPresets.find(p => p.color === selectedColor)?.name}
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}