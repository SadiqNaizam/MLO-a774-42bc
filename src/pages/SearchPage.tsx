import React, { useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TrackItem from '@/components/TrackItem';
import MediaCard from '@/components/MediaCard';
import MusicPlaybackBar from '@/components/MusicPlaybackBar';
import { Button } from "@/components/ui/button";
import { Home, Search, Library, User, PlusSquare, ChevronRight, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

// Placeholder data for MusicPlaybackBar
const initialTrack = {
  id: 'search-track-init',
  title: 'Ready to Search',
  artist: 'Your Music App',
  albumArtUrl: 'https://picsum.photos/seed/search-init/64/64',
  duration: 10,
};

// Placeholder search results
const placeholderTracks = [
  { id: 'st1', title: 'Doraemon no Uta', artist: 'Kumiko Osugi', album: 'Doraemon OST', duration: '3:15', imageUrl: 'https://picsum.photos/seed/doraemon/64/64', index: 1 },
  { id: 'st2', title: 'Search Result Song 2', artist: 'Artist B', album: 'Album Y', duration: '4:02', imageUrl: 'https://picsum.photos/seed/song2/64/64', index: 2 },
];
const placeholderAlbums = [
  { id: 'sa1', title: 'Greatest Hits', subtitle: 'Artist A', imageUrl: 'https://picsum.photos/seed/album_s1/200/200', type: 'album' as 'album' },
  { id: 'sa2', title: 'New Album X', subtitle: 'Artist C', imageUrl: 'https://picsum.photos/seed/album_s2/200/200', type: 'album' as 'album' },
];
const placeholderArtists = [
  { id: 'sar1', title: 'Artist A', subtitle: 'Pop Singer', imageUrl: 'https://picsum.photos/seed/artist_s1/200/200', type: 'artist' as 'artist' },
];
const placeholderPlaylists = [
    { id: 'sp1', title: 'User\'s Doraemon Favorites', subtitle: 'Playlist by You', imageUrl: 'https://picsum.photos/seed/playlist_s1/200/200', type: 'playlist' as 'playlist' },
];


const SearchPage = () => {
  console.log('SearchPage loaded');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentTrack, setCurrentTrack] = useState<any>(initialTrack);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTrackId, setActiveTrackId] = useState<string | null>(null);


  const handlePlayPause = () => setIsPlaying(!isPlaying);
  const handleNext = () => console.log('Next track');
  const handlePrevious = () => console.log('Previous track');
  const handleSeek = (newTime: number) => setCurrentTime(newTime);
  const handleVolumeChange = (newVolume: number) => setVolume(newVolume);

  const handlePlayTrack = (trackId: string) => {
    const trackToPlay = placeholderTracks.find(t => t.id === trackId);
    if (trackToPlay) {
      setCurrentTrack({
        id: trackToPlay.id,
        title: trackToPlay.title,
        artist: trackToPlay.artist,
        albumArtUrl: trackToPlay.imageUrl,
        duration: 180 // Placeholder duration
      });
      setIsPlaying(true);
      setActiveTrackId(trackId);
      console.log(`Playing track: ${trackToPlay.title}`);
    }
  };
  
  const handlePlayMedia = (item: any) => {
    setCurrentTrack({ id: item.id, title: item.title, artist: item.subtitle || 'Various Artists', albumArtUrl: item.imageUrl, duration: 200 });
    setIsPlaying(true);
    setActiveTrackId(item.id); // Or null if it's not a track
  };

  const handleAddToPlaylist = (trackId: string) => {
    console.log(`Adding track ${trackId} to playlist... (UI for playlist selection would appear here)`);
    // Simulate toast: alert(`Track ${trackId} added to 'Doraemon's Favorites'.`);
  };
  
  const handleLikeTrack = (trackId: string) => {
    console.log(`Liking track ${trackId}...`);
  };

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
                 <Link to="/search" className={`${navigationMenuTriggerStyle()} w-full justify-start bg-neutral-800`}>
                  <Search className="mr-2 h-4 w-4" /> Search
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem className="w-full">
                <Link to="/library" className={`${navigationMenuTriggerStyle()} w-full justify-start`}>
                  <Library className="mr-2 h-4 w-4" /> Your Library
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem className="w-full mt-4">
                <Button variant="ghost" className="w-full justify-start">
                  <PlusSquare className="mr-2 h-4 w-4" /> Create Playlist
                </Button>
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
             {/* Navigation buttons can go here */}
          </div>
          <div className="flex-1 flex justify-center">
            <Input
              type="search"
              placeholder="What do you want to listen to?"
              className="w-full max-w-md bg-neutral-800 border-neutral-700 focus:ring-green-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
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

        <ScrollArea className="flex-1 p-6 mb-20">
          {searchTerm ? (
            <Tabs defaultValue="tracks" className="w-full">
              <TabsList className="bg-neutral-800">
                <TabsTrigger value="tracks">Tracks</TabsTrigger>
                <TabsTrigger value="albums">Albums</TabsTrigger>
                <TabsTrigger value="artists">Artists</TabsTrigger>
                <TabsTrigger value="playlists">Playlists</TabsTrigger>
              </TabsList>
              <TabsContent value="tracks" className="mt-4">
                <div className="space-y-2">
                  {placeholderTracks.map((track, index) => (
                    <TrackItem
                      key={track.id}
                      track={{...track, index: index + 1}}
                      isPlaying={currentTrack?.id === track.id && isPlaying}
                      isActive={currentTrack?.id === track.id}
                      onPlay={() => handlePlayTrack(track.id)}
                      onAddToPlaylist={() => handleAddToPlaylist(track.id)}
                      onLike={() => handleLikeTrack(track.id)}
                    />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="albums" className="mt-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {placeholderAlbums.map(item => (
                    <MediaCard
                      key={item.id}
                      imageUrl={item.imageUrl}
                      title={item.title}
                      subtitle={item.subtitle}
                      type={item.type}
                      onClick={() => console.log(`Navigating to album: ${item.title}`)}
                      onPlayClick={(e) => { e.stopPropagation(); handlePlayMedia(item); }}
                    />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="artists" className="mt-4">
                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {placeholderArtists.map(item => (
                        <MediaCard
                        key={item.id}
                        imageUrl={item.imageUrl}
                        title={item.title}
                        subtitle={item.subtitle}
                        type={item.type}
                        onClick={() => console.log(`Navigating to artist: ${item.title}`)}
                        // Artists usually don't have a direct "play" button on their card in this context
                        />
                    ))}
                </div>
              </TabsContent>
              <TabsContent value="playlists" className="mt-4">
                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {placeholderPlaylists.map(item => (
                        <MediaCard
                        key={item.id}
                        imageUrl={item.imageUrl}
                        title={item.title}
                        subtitle={item.subtitle}
                        type={item.type}
                        onClick={() => console.log(`Navigating to playlist: ${item.title}`)}
                        onPlayClick={(e) => { e.stopPropagation(); handlePlayMedia(item); }}
                        />
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          ) : (
            <div className="text-center text-neutral-500 pt-10">
              <Search size={48} className="mx-auto mb-4" />
              <p>Search for your favorite songs, artists, albums, or playlists.</p>
              <p className="text-sm mt-2">Try searching for "Doraemon no Uta".</p>
            </div>
          )}
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

export default SearchPage;