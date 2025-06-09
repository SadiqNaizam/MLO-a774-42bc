import React, { useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Input as ShadInput } from "@/components/ui/input"; // Renamed to avoid conflict with Form's input
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Label } from "@/components/ui/label"; // Shadcn Label
import { Button }
from "@/components/ui/button";
import MusicPlaybackBar from '@/components/MusicPlaybackBar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Home, Search, Library, User, PlusSquare, ChevronRight, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

// Placeholder data for MusicPlaybackBar
const initialTrack = {
  id: 'profile-track-init',
  title: 'Settings Groove',
  artist: 'Admin',
  albumArtUrl: 'https://picsum.photos/seed/profile-init/64/64',
  duration: 10,
};

const profileFormSchema = z.object({
  displayName: z.string().min(2, { message: "Display name must be at least 2 characters." }).max(50),
  email: z.string().email({ message: "Please enter a valid email." }),
  avatarUrl: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const UserProfilePage = () => {
  console.log('UserProfilePage loaded');
  const [currentTrack, setCurrentTrack] = useState<any>(initialTrack);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      displayName: "Doraemon Fan",
      email: "doraemon.fan@example.com",
      avatarUrl: "https://picsum.photos/seed/user_profile_avatar/200/200",
    },
    mode: "onChange",
  });

  const onSubmit = (data: ProfileFormValues) => {
    console.log("Profile updated:", data);
    // toast({ title: "Profile Updated", description: "Your profile information has been saved." })
    alert("Profile Updated: Your profile information has been saved.");
  };

  const handlePlayPause = () => setIsPlaying(!isPlaying);
  const handleNext = () => console.log('Next track');
  const handlePrevious = () => console.log('Previous track');
  const handleSeek = (newTime: number) => setCurrentTime(newTime);
  const handleVolumeChange = (newVolume: number) => setVolume(newVolume);

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
                {/* Can hold navigation like back/forward buttons */}
           </div>
           <div className="flex-1 flex justify-center">
                {/* Optional: Global Search or Empty */}
                <ShadInput type="search" placeholder="Search music..." className="w-full max-w-md bg-neutral-800 border-neutral-700 focus:ring-green-500" />
           </div>
          <div className="w-1/3 flex justify-end">
            <Link to="/profile">
                <Avatar>
                    <AvatarImage src={form.watch("avatarUrl") || "https://picsum.photos/seed/user/40/40"} alt="User Avatar" />
                    <AvatarFallback>{form.watch("displayName")?.[0]?.toUpperCase() || 'U'}</AvatarFallback>
                </Avatar>
            </Link>
          </div>
        </header>

        <ScrollArea className="flex-1 p-6 mb-20">
          <Card className="max-w-2xl mx-auto bg-neutral-800 border-neutral-700">
            <CardHeader>
              <CardTitle className="text-2xl">User Profile</CardTitle>
              <CardDescription>Manage your account settings and profile information.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="displayName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Display Name</FormLabel>
                        <FormControl>
                          <ShadInput placeholder="Your display name" {...field} className="bg-neutral-700 border-neutral-600" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <ShadInput type="email" placeholder="your.email@example.com" {...field} className="bg-neutral-700 border-neutral-600" />
                        </FormControl>
                        <FormDescription>
                          This is the email associated with your account.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="avatarUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Avatar URL</FormLabel>
                        <FormControl>
                          <ShadInput placeholder="https://example.com/avatar.png" {...field} className="bg-neutral-700 border-neutral-600" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-end">
                    <Button type="submit" className="bg-green-600 hover:bg-green-700">Save Changes</Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
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

export default UserProfilePage;