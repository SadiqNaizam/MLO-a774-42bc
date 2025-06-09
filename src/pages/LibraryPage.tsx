import React, { useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MediaCard from '@/components/MediaCard';
import TrackItem from '@/components/TrackItem';
import { Button } from "@/components/ui/button";
import MusicPlaybackBar from '@/components/MusicPlaybackBar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Home, Search, Library, User, PlusSquare, ChevronRight, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

// Placeholder data for MusicPlaybackBar
const initialTrack = {
  id: 'lib-track-init',
  title: 'Your Collection',
  artist: 'Music App',
  albumArtUrl: 'https://picsum.photos/seed/lib-init/64/64',
  duration: 10,
};

const userPlaylists = [
  { id: 'pl-doraemon', title: "Doraemon's Favorites", subtitle: 'By You • 1 Song', imageUrl: 'https://picsum.photos/seed/doraemon_fav/200/200', type: 'playlist' as 'playlist' },
  { id: 'pl-chill', title: 'Chill Evening', subtitle: 'By You • 15 Songs', imageUrl: 'https://picsum.photos/seed/chill_pl/200/200', type: 'playlist' as 'playlist' },
];
const likedSongs = [
  { id: 'ls1', title: 'Favorite Song 1', artist: 'Artist X', album: 'Album F', duration: '3:45', imageUrl: 'https://picsum.photos/seed/liked1/64/64', index: 1 },
  { id: 'ls2', title: 'Another Liked Tune', artist: 'Artist Y', album: 'Single', duration: '2:50', imageUrl: 'https://picsum.photos/seed/liked2/64/64', index: 2 },
];
const savedAlbums = [
  { id: 'sa1', title: 'Classic Album', subtitle: 'Legendary Band', imageUrl: 'https://picsum.photos/seed/album_saved1/200/200', type: 'album' as 'album' },
];

const LibraryPage = () => {
  console.log('LibraryPage loaded');
  const [currentTrack, setCurrentTrack] = useState<any>(initialTrack);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTrackId, setActiveTrackId] = useState<string | null>(null);
  const [isCreatePlaylistDialogOpen, setIsCreatePlaylistDialogOpen] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState("");

  const handlePlayPause = () => setIsPlaying(!isPlaying);
  const handleNext = () => console.log('Next track');
  const handlePrevious = () => console.log('Previous track');
  const handleSeek = (newTime: number) => setCurrentTime(newTime);
  const handleVolumeChange = (newVolume: number) => setVolume(newVolume);

  const handlePlayTrack = (trackId: string) => {
    const trackToPlay = likedSongs.find(t => t.id === trackId); // Assuming playing from liked songs
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

  const handlePlayMedia = (item: any) => {
    setCurrentTrack({ id: item.id, title: item.title, artist: item.subtitle || 'Various Artists', albumArtUrl: item.imageUrl, duration: 200 });
    setIsPlaying(true);
    setActiveTrackId(item.id);
  };
  
  const handleCreatePlaylist = () => {
    if (newPlaylistName.trim()) {
        console.log(`Creating playlist: ${newPlaylistName}`);
        // Here you would typically call an API and update state
        // For now, just log and close dialog
        // In a real app, this might trigger a toast:
        // toast({ title: "Playlist Created", description: `Playlist '${newPlaylistName}' has been created.` });
        alert(`Playlist '${newPlaylistName}' created.`);
        setNewPlaylistName("");
        setIsCreatePlaylistDialogOpen(false);
        // Potentially navigate to the new playlist or refresh list
    }
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
                 <Link to="/search" className={`${navigationMenuTriggerStyle()} w-full justify-start`}>
                  <Search className="mr-2 h-4 w-4" /> Search
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem className="w-full">
                <Link to="/library" className={`${navigationMenuTriggerStyle()} w-full justify-start bg-neutral-800`}>
                  <Library className="mr-2 h-4 w-4" /> Your Library
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem className="w-full mt-4">
                <Dialog open={isCreatePlaylistDialogOpen} onOpenChange={setIsCreatePlaylistDialogOpen}>
                    <DialogTrigger asChild>
                        <Button variant="ghost" className="w-full justify-start">
                        <PlusSquare className="mr-2 h-4 w-4" /> Create Playlist
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] bg-neutral-800 text-white border-neutral-700">
                        <DialogHeader>
                        <DialogTitle>Create New Playlist</DialogTitle>
                        <DialogDescription>
                            Give your new playlist a name.
                        </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="playlist-name" className="text-right">
                            Name
                            </Label>
                            <Input
                            id="playlist-name"
                            value={newPlaylistName}
                            onChange={(e) => setNewPlaylistName(e.target.value)}
                            className="col-span-3 bg-neutral-700 border-neutral-600"
                            placeholder="Doraemon's Favorites"
                            />
                        </div>
                        </div>
                        <DialogFooter>
                        <Button variant="outline" onClick={() => setIsCreatePlaylistDialogOpen(false)}>Cancel</Button>
                        <Button type="submit" onClick={handleCreatePlaylist} className="bg-green-600 hover:bg-green-700">Create Playlist</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
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
            {/* Global search or nav can be here */}
            <Input type="search" placeholder="Search in library..." className="w-full max-w-xs bg-neutral-800 border-neutral-700 focus:ring-green-500" />
          </div>
           <div className="flex-1 flex justify-center">
             {/* Potentially page title or global actions */}
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
          <Tabs defaultValue="playlists" className="w-full">
            <TabsList className="bg-neutral-800">
              <TabsTrigger value="playlists">Playlists</TabsTrigger>
              <TabsTrigger value="songs">Liked Songs</TabsTrigger>
              <TabsTrigger value="albums">Saved Albums</TabsTrigger>
            </TabsList>
            <TabsContent value="playlists" className="mt-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {userPlaylists.map(item => (
                  <Link to={`/playlist/${item.id}`} key={item.id}>
                    <MediaCard
                      imageUrl={item.imageUrl}
                      title={item.title}
                      subtitle={item.subtitle}
                      type={item.type}
                      onPlayClick={(e) => { e.stopPropagation(); handlePlayMedia(item); }}
                    />
                  </Link>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="songs" className="mt-4">
              <div className="space-y-2">
                {likedSongs.map((track, index) => (
                  <TrackItem
                    key={track.id}
                    track={{...track, index: index + 1}}
                    isPlaying={currentTrack?.id === track.id && isPlaying}
                    isActive={currentTrack?.id === track.id}
                    onPlay={() => handlePlayTrack(track.id)}
                    onAddToPlaylist={(trackId) => console.log(`Add ${trackId} to another playlist`)}
                    onLike={(trackId) => console.log(`Unlike ${trackId}`)}
                  />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="albums" className="mt-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {savedAlbums.map(item => (
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
          </Tabs>
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

export default LibraryPage;