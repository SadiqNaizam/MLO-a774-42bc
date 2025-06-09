import React from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Play, MoreHorizontal, ListPlus, Heart } from 'lucide-react'; // Icons

interface Track {
  id: string;
  title: string;
  artist: string;
  album?: string;
  duration: string; // e.g., "3:45"
  imageUrl?: string; // Optional album art
  index?: number; // Optional track number in a list
}

interface TrackItemProps {
  track: Track;
  isPlaying?: boolean; // To show if this specific track is playing
  isActive?: boolean; // To show if this track is the currently active one (e.g. selected, could be paused)
  onPlay: (trackId: string) => void;
  onAddToPlaylist?: (trackId: string) => void; // For the "Add to Playlist" user journey step
  onLike?: (trackId: string) => void;
  // Add more actions as needed
}

const TrackItem: React.FC<TrackItemProps> = ({
  track,
  isPlaying = false,
  isActive = false,
  onPlay,
  onAddToPlaylist,
  onLike,
}) => {
  console.log("Rendering TrackItem:", track.title, "Is playing:", isPlaying, "Is active:", isActive);

  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onPlay(track.id);
  };

  return (
    <div
      className={`flex items-center p-2 hover:bg-neutral-800 rounded-md cursor-pointer transition-colors group ${isActive ? 'bg-neutral-700' : ''}`}
      onClick={() => onPlay(track.id)} // Click row to play
      role="button"
      tabIndex={0}
      aria-label={`Play ${track.title} by ${track.artist}`}
    >
      <div className="flex items-center space-x-3 flex-1 min-w-0">
        {track.index !== undefined && (
          <span className={`w-6 text-sm text-neutral-400 text-center group-hover:hidden ${isActive && isPlaying ? 'hidden' : 'block'}`}>
            {track.index}
          </span>
        )}
         <Button
            variant="ghost"
            size="icon"
            onClick={handlePlayClick}
            className={`w-6 h-6 p-0 text-white ${isActive && isPlaying ? 'block' : 'hidden group-hover:block'}`}
            aria-label={isPlaying ? `Pause ${track.title}` : `Play ${track.title}`}
          >
            {/* Icon changes based on isPlaying state - typically managed by parent */}
            <Play size={18} className={`${isPlaying ? 'hidden' : 'block'}`} />
            {/* Placeholder for Pause icon when playing, could be managed by parent state */}
            {/* <Pause size={18} className={`${isPlaying ? 'block' : 'hidden'}`} /> */}
          </Button>

        {track.imageUrl && (
          <img src={track.imageUrl} alt={track.album || track.title} className="w-10 h-10 rounded object-cover" />
        )}
        <div className="min-w-0">
          <p className={`text-sm font-medium truncate ${isActive ? 'text-green-400' : 'text-white'}`} title={track.title}>{track.title}</p>
          <p className="text-xs text-neutral-400 truncate" title={track.artist}>{track.artist}</p>
        </div>
      </div>

      {track.album && <p className="text-xs text-neutral-400 hidden md:block mx-4 min-w-0 truncate flex-1" title={track.album}>{track.album}</p>}
      
      <div className="flex items-center space-x-2 ml-auto pl-2">
        {onLike && (
          <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); onLike(track.id); }} aria-label="Like track" className="hidden group-hover:flex text-neutral-400 hover:text-white">
            <Heart size={18} />
          </Button>
        )}
        <span className="text-xs text-neutral-400 w-10 text-right">{track.duration}</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()} aria-label="More options" className="text-neutral-400 hover:text-white">
              <MoreHorizontal size={18} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="bottom" align="end" onClick={(e) => e.stopPropagation()}>
            {onAddToPlaylist && <DropdownMenuItem onClick={() => onAddToPlaylist(track.id)}><ListPlus className="mr-2 h-4 w-4" /> Add to Playlist</DropdownMenuItem>}
            {/* Add other actions like "Add to queue", "Go to album", "Go to artist" */}
            <DropdownMenuItem>View Album</DropdownMenuItem>
            <DropdownMenuItem>View Artist</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default TrackItem;