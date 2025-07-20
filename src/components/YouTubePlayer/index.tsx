'use client';

import YouTube, { YouTubeProps } from 'react-youtube';

export const YouTubePlayer: React.FC<YouTubeProps> = ({ videoId }) => {
  return <YouTube videoId={videoId} />;
};
