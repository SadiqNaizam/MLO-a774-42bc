import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { PlayCircle } from 'lucide-react'; // Example icon

interface MediaCardProps {
  imageUrl: string;
  title: string;
  subtitle?: string;
  type?: 'album' | 'playlist' | 'artist'; // To distinguish card type for styling or behavior
  onClick?: () => void;
  onPlayClick?: (e: React.MouseEvent) => void; // Separate handler for play icon
}

const MediaCard: React.FC<MediaCardProps> = ({
  imageUrl,
  title,
  subtitle,
  type = 'album',
  onClick,
  onPlayClick,
}) => {
  console.log("Rendering MediaCard:", title, type);

  const handlePlay = (e: React.MouseEvent) => {
    if (onPlayClick) {
      e.stopPropagation(); // Prevent onClick if play is handled separately
      onPlayClick(e);
      console.log("Play clicked on MediaCard:", title);
    }
  };

  return (
    <Card
      className="w-full max-w-[200px] group overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer"
      onClick={onClick}
    >
      <CardHeader className="p-0 relative">
        <AspectRatio ratio={1 / 1} className="bg-muted">
          <img
            src={imageUrl || '/placeholder.svg'}
            alt={title}
            className="object-cover w-full h-full rounded-t-md transition-transform duration-300 group-hover:scale-105"
            onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
          />
        </AspectRatio>
        {onPlayClick && (
          <button
            onClick={handlePlay}
            aria-label={`Play ${title}`}
            className="absolute bottom-2 right-2 bg-green-500 text-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <PlayCircle size={28} />
          </button>
        )}
      </CardHeader>
      <CardContent className="p-3">
        <CardTitle className="text-sm font-semibold truncate" title={title}>{title}</CardTitle>
        {subtitle && <CardDescription className="text-xs truncate" title={subtitle}>{subtitle}</CardDescription>}
      </CardContent>
    </Card>
  );
};

export default MediaCard;