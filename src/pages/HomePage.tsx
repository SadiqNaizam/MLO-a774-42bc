import React, { useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import MediaCard from '@/components/MediaCard';
import { Button } from "@/components/ui/button";
import MusicPlaybackBar from '@/components/MusicPlaybackBar';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Search, Library, User, PlusSquare, ChevronRight, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

// Placeholder data for MusicPlaybackBar
const initialTrack = {
  id: 'track1',
  title: 'Chill Vibes',
  artist: 'Lofi Beats',
  albumArtUrl: 'https://picsum.photos/seed/track1/64/64',
  duration: 180, // 3 minutes
};

// Placeholder data for MediaCards
const featuredPlaylists = [
  { id: 'pl1', title: 'Today\'s Top Hits', subtitle: 'The biggest songs of the moment.', imageUrl: 'https://picsum.photos/seed/playlist1/200/200', type: 'playlist' as 'playlist' },
  { id: 'pl2', title: 'Chill Mix', subtitle: 'Kick back to these relaxing tracks.', imageUrl: 'https://picsum.photos/seed/playlist2/200/200', type: 'playlist' as 'playlist' },
  { id: 'pl3', title: 'Workout Beats', subtitle: 'Energy for your workout.', imageUrl: 'https://picsum.photos/seed/playlist3/200/200', type: 'playlist' as 'playlist' },
];

const newReleases = [
  { id: 'al1', title: 'Sunset Drive', subtitle: 'Artist A', imageUrl: 'https://picsum.photos/seed/album1/200/200', type: 'album' as 'album' },
  { id: 'al2', title: 'Ocean Dreams', subtitle: 'Artist B', imageUrl: 'https://picsum.photos/seed/album2/200/200', type: 'album' as 'album' },
];

const HomePage = () => {
  console.log('HomePage loaded');
  const [currentTrack, setCurrentTrack] = useState<any>(initialTrack);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handlePlayPause = () => setIsPlaying(!isPlaying);
  const handleNext = () => console.log('Next track');
  const handlePrevious = () => console.log('Previous track');
  const handleSeek = (newTime: number) => setCurrentTime(newTime);
  const handleVolumeChange = (newVolume: number) => setVolume(newVolume);

  const handlePlayMedia = (item: any) => {
    setCurrentTrack({ id: item.id, title: item.title, artist: item.subtitle || 'Various Artists', albumArtUrl: item.imageUrl, duration: 200 });
    setIsPlaying(true);
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
                <Link to="/" className={`${navigationMenuTriggerStyle()} w-full justify-start bg-neutral-800`}>
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
              <NavigationMenuItem className="w-full mt-4">
                <Button variant="ghost" className="w-full justify-start">
                  <PlusSquare className="mr-2 h-4 w-4" /> Create Playlist
                </Button>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          {/* Placeholder for user playlists */}
          <div className="mt-4 pt-4 border-t border-neutral-700">
            <h3 className="text-sm font-semibold text-neutral-400 mb-2">PLAYLISTS</h3>
             <ScrollArea className="h-[200px]">
                {['Chill Vibes', 'Workout Mix', 'Road Trip'].map(pl => (
                    <Link to={`/playlist/${pl.toLowerCase().replace(' ', '-')}`} key={pl} className="block p-2 text-sm text-neutral-300 hover:text-white hover:bg-neutral-700 rounded">
                        {pl}
                    </Link>
                ))}
             </ScrollArea>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-neutral-900/80 backdrop-blur-md p-4 flex items-center justify-between sticky top-0 z-10">
          <div className="w-1/3">
             {/* Search input could be here or navigation buttons */}
          </div>
          <div className="flex-1 flex justify-center">
            <Input type="search" placeholder="Search for songs, artists, albums..." className="w-full max-w-md bg-neutral-800 border-neutral-700 focus:ring-green-500" />
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

        <ScrollArea className="flex-1 p-6 mb-20"> {/* mb-20 for MusicPlaybackBar */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Featured Playlists</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {featuredPlaylists.map(item => (
                <MediaCard
                  key={item.id}
                  imageUrl={item.imageUrl}
                  title={item.title}
                  subtitle={item.subtitle}
                  type={item.type}
                  onClick={() => console.log(`Clicked ${item.title}`)}
                  onPlayClick={(e) => { e.stopPropagation(); handlePlayMedia(item); }}
                />
              ))}
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">New Releases</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {newReleases.map(item => (
                <MediaCard
                  key={item.id}
                  imageUrl={item.imageUrl}
                  title={item.title}
                  subtitle={item.subtitle}
                  type={item.type}
                  onClick={() => console.log(`Clicked ${item.title}`)}
                  onPlayClick={(e) => { e.stopPropagation(); handlePlayMedia(item); }}
                />
              ))}
            </div>
          </section>

           <section>
            <h2 className="text-2xl font-bold mb-4">Recently Played</h2>
             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
               {/* Placeholder, would come from user history */}
               {[
                 { id: 'rp1', title: 'Morning Coffee Jazz', subtitle: 'Smooth Jazz', imageUrl: 'https://picsum.photos/seed/rp1/200/200', type: 'playlist' as 'playlist' },
                 { id: 'rp2', title: 'Focus Flow', subtitle: 'Ambient', imageUrl: 'https://picsum.photos/seed/rp2/200/200', type: 'album' as 'album'},
               ].map(item => (
                 <MediaCard
                   key={item.id}
                   imageUrl={item.imageUrl}
                   title={item.title}
                   subtitle={item.subtitle}
                   type={item.type}
                   onClick={() => console.log(`Clicked ${item.title}`)}
                   onPlayClick={(e) => { e.stopPropagation(); handlePlayMedia(item); }}
                 />
               ))}
            </div>
          </section>
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

export default HomePage;