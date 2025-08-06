import React, { useState } from 'react';
import { Switch } from './ui/switch';
import { Slider } from './ui/slider';
import { Lightbulb, Sun, Moon } from 'lucide-react';
import { Button } from './ui/button';

interface ColorTheme {
  primary: string;
  secondary: string;
  accent: string;
}

interface LightCardProps {
  colorTheme: ColorTheme;
}

export function LightCard({ colorTheme }: LightCardProps) {
  const [isOn, setIsOn] = useState(true);
  const [brightness, setBrightness] = useState([75]);

  const presets = [
    { name: 'Dim', value: 20, icon: Moon },
    { name: 'Normal', value: 60, icon: Lightbulb },
    { name: 'Bright', value: 100, icon: Sun }
  ];

  return (
    <div className={`rounded-xl p-5 shadow-sm border transition-all duration-500 ${
      isOn 
        ? `bg-gradient-to-br from-white to-[${colorTheme.secondary}] border-[${colorTheme.primary}]/20` 
        : 'bg-white border-gray-100'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div 
            className={`p-2 rounded-lg transition-all duration-300`}
            style={{ 
              backgroundColor: isOn ? colorTheme.secondary : '#f3f4f6',
            }}
          >
            <Lightbulb 
              className={`w-5 h-5 transition-colors duration-300`}
              style={{ color: isOn ? colorTheme.primary : '#9ca3af' }}
            />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">LED Lights</h3>
            <p className="text-sm text-gray-500">Kitchen</p>
          </div>
        </div>
        <Switch checked={isOn} onCheckedChange={setIsOn} />
      </div>

      {/* Brightness Display */}
      <div className="text-center mb-4">
        <div 
          className={`text-2xl font-semibold transition-colors duration-300`}
          style={{ color: isOn ? colorTheme.primary : '#9ca3af' }}
        >
          {brightness[0]}%
        </div>
        <div className="text-sm text-gray-500">Brightness</div>
      </div>

      {/* Brightness Slider */}
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
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>1%</span>
          <span>100%</span>
        </div>
      </div>

      {/* Brightness Presets */}
      <div className="grid grid-cols-3 gap-2">
        {presets.map(({ name, value, icon: Icon }) => (
          <Button
            key={name}
            variant="outline"
            size="sm"
            onClick={() => setBrightness([value])}
            disabled={!isOn}
            className={`flex flex-col gap-1 h-auto py-2 transition-all duration-300 hover:bg-[${colorTheme.secondary}] hover:border-[${colorTheme.primary}]`}
          >
            <Icon className="w-4 h-4" />
            <span className="text-xs">{name}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}