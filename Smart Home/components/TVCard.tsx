import React, { useState } from 'react';
import { Switch } from './ui/switch';
import { Slider } from './ui/slider';
import { Tv, Volume2, VolumeX } from 'lucide-react';
import { Button } from './ui/button';

interface ColorTheme {
  primary: string;
  secondary: string;
  accent: string;
}

interface TVCardProps {
  colorTheme: ColorTheme;
}

export function TVCard({ colorTheme }: TVCardProps) {
  const [isOn, setIsOn] = useState(false);
  const [volume, setVolume] = useState([45]);
  const [isMuted, setIsMuted] = useState(false);
  const [channel, setChannel] = useState(7);

  const channels = [
    'Netflix', 'HBO Max', 'Disney+', 'YouTube', 'Prime Video', 'Hulu', 'Apple TV', 'Discovery', 'ESPN', 'CNN'
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
            <Tv 
              className={`w-5 h-5 transition-colors duration-300`}
              style={{ color: isOn ? colorTheme.primary : '#9ca3af' }}
            />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Smart TV</h3>
            <p className="text-sm text-gray-500">Living Room</p>
          </div>
        </div>
        <Switch checked={isOn} onCheckedChange={setIsOn} />
      </div>

      {/* Current Channel */}
      <div className="text-center mb-4">
        <div 
          className={`text-lg font-medium transition-colors duration-300`}
          style={{ color: isOn ? colorTheme.primary : '#9ca3af' }}
        >
          {isOn ? channels[channel] : 'Off'}
        </div>
        <div className="text-sm text-gray-500">
          {isOn ? `Channel ${channel + 1}` : 'Press power to turn on'}
        </div>
      </div>

      {/* Volume Control */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMuted(!isMuted)}
            disabled={!isOn}
            className={`p-1 hover:bg-[${colorTheme.secondary}]`}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-gray-500" />
            ) : (
              <Volume2 className="w-4 h-4 text-gray-700" />
            )}
          </Button>
          <div className="flex-1">
            <Slider
              value={isMuted ? [0] : volume}
              onValueChange={setVolume}
              max={100}
              min={0}
              step={1}
              disabled={!isOn || isMuted}
              className="w-full"
            />
          </div>
          <span className="text-sm text-gray-500 w-8">
            {isMuted ? '0' : volume[0]}
          </span>
        </div>
      </div>

      {/* Channel Controls */}
      <div className="grid grid-cols-2 gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setChannel(Math.max(0, channel - 1))}
          disabled={!isOn || channel === 0}
          className={`transition-all duration-300 hover:bg-[${colorTheme.secondary}] hover:border-[${colorTheme.primary}]`}
        >
          CH ↓
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setChannel(Math.min(channels.length - 1, channel + 1))}
          disabled={!isOn || channel === channels.length - 1}
          className={`transition-all duration-300 hover:bg-[${colorTheme.secondary}] hover:border-[${colorTheme.primary}]`}
        >
          CH ↑
        </Button>
      </div>
    </div>
  );
}