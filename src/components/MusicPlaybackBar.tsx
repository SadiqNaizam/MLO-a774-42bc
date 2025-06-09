import React from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX } from 'lucide-react'; // Icons
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface TrackInfo {
  id: string;
  title: string;
  artist: string;
  albumArtUrl?: string;
  duration: number; // in seconds
}

interface MusicPlaybackBarProps {
  currentTrack: TrackInfo | null;
  isPlaying: boolean;
  currentTime: number; // in seconds
  volume: number; // 0 to 1
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onSeek: (value: number) => void;
  onVolumeChange: (value: number) => void;
}

const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
};

const MusicPlaybackBar: React.FC<MusicPlaybackBarProps> = ({
  currentTrack,
  isPlaying,
  currentTime,
  volume,
  onPlayPause,
  onNext,
  onPrevious,
  onSeek,
  onVolumeChange,
}) => {
  console.log("Rendering MusicPlaybackBar. Current track:", currentTrack?.title, "Is playing:", isPlaying);

  if (!currentTrack) {
    return (
      <div className="fixed bottom-0 left-0 right-0 h-20 bg-neutral-800 border-t border-neutral-700 flex items-center justify-center text-neutral-400 text-sm">
        No track selected.
      </div>
    );
  }

  const progressPercent = currentTrack.duration > 0 ? (currentTime / currentTrack.duration) * 100 : 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 h-20 bg-neutral-900 text-white border-t border-neutral-700 px-4 py-2 grid grid-cols-3 items-center gap-4 z-50">
      {/* Left: Track Info */}
      <div className="flex items-center space-x-3 min-w-0">
        {currentTrack.albumArtUrl && (
          <img src={currentTrack.albumArtUrl} alt={currentTrack.title} className="w-12 h-12 rounded object-cover" />
        )}
        <div className="min-w-0">
          <p className="text-sm font-medium truncate" title={currentTrack.title}>{currentTrack.title}</p>
          <p className="text-xs text-neutral-400 truncate" title={currentTrack.artist}>{currentTrack.artist}</p>
        </div>
      </div>

      {/* Center: Playback Controls & Progress */}
      <div className="flex flex-col items-center">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" onClick={onPrevious} aria-label="Previous track">
            <SkipBack className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onPlayPause} className="bg-white text-black hover:bg-neutral-200 rounded-full w-8 h-8 p-1" aria-label={isPlaying ? "Pause" : "Play"}>
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 fill-current" />}
          </Button>
          <Button variant="ghost" size="icon" onClick={onNext} aria-label="Next track">
            <SkipForward className="h-5 w-5" />
          </Button>
        </div>
        <div className="w-full max-w-xs md:max-w-md lg:max-w-lg flex items-center space-x-2 text-xs mt-1">
          <span>{formatTime(currentTime)}</span>
          <Slider
            value={[progressPercent]}
            max={100}
            step={0.1}
            onValueChange={(value) => onSeek((value[0] / 100) * currentTrack.duration)}
            className="flex-grow"
            aria-label="Track progress"
          />
          <span>{formatTime(currentTrack.duration)}</span>
        </div>
      </div>

      {/* Right: Volume Control */}
      <div className="flex items-center justify-end space-x-2">
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Volume control">
                    {volume === 0 ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-28 p-2 mb-2" side="top" align="end">
                <Slider
                    value={[volume * 100]}
                    max={100}
                    step={1}
                    onValueChange={(value) => onVolumeChange(value[0] / 100)}
                    aria-label="Volume"
                />
            </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default MusicPlaybackBar;