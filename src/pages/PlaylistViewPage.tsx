import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Input as ShadInput } from "@/components/ui/input"; // Renamed to avoid conflict
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import TrackItem from '@/components/TrackItem';
import MusicPlaybackBar from '@/components/MusicPlaybackBar';
import { Home, Search, Library, User, PlusSquare, ChevronRight, ChevronDown, Play, Shuffle, Edit3 } from 'lucide-react';

// Placeholder data for MusicPlaybackBar
const initialTrack = {
  id: 'playlist-view-init',
  title: 'Playlist Mix',
  artist: 'Various Artists',
  albumArtUrl: 'https://picsum.photos/seed/playlist-init/64/64',
  duration: 10,
};

const placeholderPlaylistDetails = {
  'pl-doraemon': {
    id: 'pl-doraemon',
    name: "Doraemon's Favorites",
    creator: "You",
    coverArtUrl: 'https://picsum.photos/seed/doraemon_fav/400/400',
    description: "All the best Doraemon theme songs and OSTs!",
    tracks: [
      { id: 't1-dora', title: 'Doraemon no Uta', artist: 'Kumiko Osugi', album: 'Doraemon OST', duration: '3:15', imageUrl: 'https://picsum.photos/seed/doraemon/64/64' },
      { id: 't2-dora', title: 'Aoi Sora wa Pocket sa', artist: 'Kumiko Osugi', album: 'Doraemon OST', duration: '2:50', imageUrl: 'https://picsum.photos/seed/doraemon2/64/64' },
    ]
  },
  'default-playlist': {
    id: 'default-playlist',
    name: 'My Awesome Playlist',
    creator: 'User XYZ',
    coverArtUrl: 'https://picsum.photos/seed/default_playlist/400/400',
    description: 'A collection of amazing tracks.',
    tracks: [
      { id: 't1', title: 'Awesome Song 1', artist: 'Artist A', album: 'Album X', duration: '3:30', imageUrl: 'https://picsum.photos/seed/track_pl1/64/64' },
      { id: 't2', title: 'Cool Beat 2', artist: 'Artist B', album: 'Album Y', duration: '4:10', imageUrl: 'https://picsum.photos/seed/track_pl2/64/64' },
      { id: 't3', title: 'Groovy Tune 3', artist: 'Artist C', album: 'Album Z', duration: '2:55', imageUrl: 'https://picsum.photos/seed/track_pl3/64/64' },
    ]
  }
};

type PlaylistDetails = typeof placeholderPlaylistDetails['default-playlist'];

const PlaylistViewPage = () => {
  const { playlistId = 'default-playlist' } = useParams<{ playlistId?: string }>();
  const [playlist, setPlaylist] = useState<PlaylistDetails | null>(null);

  console.log(`PlaylistViewPage loaded for playlist ID: ${playlistId}`);

  const [currentTrack, setCurrentTrack] = useState<any>(initialTrack);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTrackId, setActiveTrackId] = useState<string | null>(null);

  useEffect(() => {
    // Simulate fetching playlist data
    const foundPlaylist = (placeholderPlaylistDetails as Record<string, PlaylistDetails>)[playlistId];
    if (foundPlaylist) {
      setPlaylist(foundPlaylist);
      if(foundPlaylist.tracks.length > 0) {
        const firstTrack = foundPlaylist.tracks[0];
        // Update initialTrack to first track of playlist if available
        setCurrentTrack({
            id: firstTrack.id,
            title: firstTrack.title,
            artist: firstTrack.artist,
            albumArtUrl: firstTrack.imageUrl,
            duration: 180 // Placeholder
        });
      }
    } else {
      setPlaylist(placeholderPlaylistDetails['default-playlist']); // Fallback
    }
  }, [playlistId]);

  const handlePlayPause = () => setIsPlaying(!isPlaying);
  const handleNext = () => console.log('Next track (playlist context)');
  const handlePrevious = () => console.log('Previous track (playlist context)');
  const handleSeek = (newTime: number) => setCurrentTime(newTime);
  const handleVolumeChange = (newVolume: number) => setVolume(newVolume);

  const handlePlayTrack = (trackId: string) => {
    const trackToPlay = playlist?.tracks.find(t => t.id === trackId);
    if (trackToPlay) {
      setCurrentTrack({
        id: trackToPlay.id,
        title: trackToPlay.title,
        artist: trackToPlay.artist,
        albumArtUrl: trackToPlay.imageUrl,
        duration: 180 // Placeholder
      });
      setIsPlaying(true);
      setActiveTrackId(trackId);
    }
  };

  if (!playlist) {
    return <div className="flex h-screen bg-neutral-900 text-white items-center justify-center">Loading playlist...</div>;
  }

  return (
    <div className="flex h-screen bg-neutral-900 text-white">
      {/* Sidebar */}
      <Collapsible open={isSidebarOpen} onOpenChange={setIsSidebarOpen} className="w-64 bg-neutral-950 p-4 flex flex-col space-y-4">
        <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">My Music</h2>
            <CollapsibleTrigger asChild>
                 <Button variant="ghost" size="icon">
                    {isSidebarOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                    <span className="sr-only">Toggle sidebar</span>
                </Button>
            </CollapsibleTrigger>
        </div>
        <CollapsibleContent>
          <NavigationMenu orientation="vertical" className="w-full">
            <NavigationMenuList className="flex flex-col space-y-1 w-full">
              <NavigationMenuItem className="w-full">
                <Link to="/" className={`${navigationMenuTriggerStyle()} w-full justify-start`}>
                  <Home className="mr-2 h-4 w-4" /> Home
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem className="w-full">
                 <Link to="/search" className={`${navigationMenuTriggerStyle()} w-full justify-start`}>
                  <Search className="mr-2 h-4 w-4" /> Search
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem className="w-full">
                <Link to="/library" className={`${navigationMenuTriggerStyle()} w-full justify-start`}>
                  <Library className="mr-2 h-4 w-4" /> Your Library
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </CollapsibleContent>
      </Collapsible>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
         {/* Header */}
        <header className="bg-neutral-900/80 backdrop-blur-md p-4 flex items-center justify-between sticky top-0 z-10">
          <div className="w-1/3">
             <ShadInput type="search" placeholder="Search in playlist..." className="w-full max-w-xs bg-neutral-800 border-neutral-700 focus:ring-green-500" />
          </div>
           <div className="flex-1 flex justify-center">
             {/* Potentially breadcrumbs or global actions */}
          </div>
          <div className="w-1/3 flex justify-end">
             <Link to="/profile">
                <Avatar>
                    <AvatarImage src="https://picsum.photos/seed/user/40/40" alt="User Avatar" />
                    <AvatarFallback>U</AvatarFallback>
                </Avatar>
            </Link>
          </div>
        </header>
        
        <ScrollArea className="flex-1 mb-20">
          {/* Playlist Header Section */}
          <div className="p-6 md:p-8 flex flex-col md:flex-row items-center md:items-end gap-6 bg-gradient-to-b from-neutral-800 to-neutral-900">
            <div className="w-48 h-48 md:w-56 md:h-56 flex-shrink-0 shadow-2xl">
              <AspectRatio ratio={1 / 1} className="bg-muted rounded-md overflow-hidden">
                <img src={playlist.coverArtUrl} alt={playlist.name} className="object-cover w-full h-full" />
              </AspectRatio>
            </div>
            <div className="text-center md:text-left">
              <p className="text-sm text-neutral-300">Playlist</p>
              <h1 className="text-4xl md:text-6xl font-bold mt-1 mb-2 truncate" title={playlist.name}>{playlist.name}</h1>
              <p className="text-neutral-400 text-sm mb-2">{playlist.description}</p>
              <p className="text-sm">
                <span className="font-semibold">{playlist.creator}</span> • {playlist.tracks.length} songs
              </p>
              <div className="mt-6 flex items-center justify-center md:justify-start space-x-3">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 rounded-full px-6 py-3" onClick={() => handlePlayTrack(playlist.tracks[0]?.id)}>
                  <Play className="mr-2 h-5 w-5 fill-current" /> Play
                </Button>
                <Button variant="outline" size="icon" className="border-neutral-500 hover:border-white" title="Shuffle Play">
                  <Shuffle className="h-5 w-5" />
                </Button>
                 <Button variant="outline" size="icon" className="border-neutral-500 hover:border-white" title="Edit Playlist">
                  <Edit3 className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Tracks List Section */}
          <div className="p-6">
            <div className="space-y-1">
              {playlist.tracks.map((track, index) => (
                <TrackItem
                  key={track.id}
                  track={{ ...track, index: index + 1 }}
                  isPlaying={currentTrack?.id === track.id && isPlaying}
                  isActive={currentTrack?.id === track.id}
                  onPlay={() => handlePlayTrack(track.id)}
                  onAddToPlaylist={(trackId) => console.log(`Add ${trackId} to another playlist`)}
                  onLike={(trackId) => console.log(`Like ${trackId}`)}
                />
              ))}
              {playlist.tracks.length === 0 && (
                <p className="text-neutral-500 text-center py-10">This playlist is empty. Add some songs!</p>
              )}
            </div>
          </div>
        </ScrollArea>
      </div>

      <MusicPlaybackBar
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        currentTime={currentTime}
        volume={volume}
        onPlayPause={handlePlayPause}
        onNext={handleNext}
        onPrevious={handlePrevious}
        onSeek={handleSeek}
        onVolumeChange={handleVolumeChange}
      />
    </div>
  );
};

export default PlaylistViewPage;