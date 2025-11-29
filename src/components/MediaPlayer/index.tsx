'use client';

import { Media } from '@/components/Media';
import { Message } from '@/payload-types';
import { getYouTubeID } from '@/utilities/getYouTubeID';
import Image from 'next/image';
import { useState } from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';

export const MediaPlayer: React.FC<{ message: Message }> = ({ message }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const youTubeID = getYouTubeID(message.video);
  
  // Validate YouTube ID format (should be 11 characters, alphanumeric, dash, underscore)
  const isValidYouTubeID = youTubeID && /^[a-zA-Z0-9_-]{11}$/.test(youTubeID);
  
  const youtubeOpts = {
    width: '100%',
    height: '680',
    playerVars: {
      autoplay: 1,
    },
  }

  const ErrorComponent = () => (
    <div className="w-full h-[680px] bg-convergence-beige-darker flex flex-col items-center justify-center rounded-lg">
          <div className="text-center p-8">
            <div className="text-red-500 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h5>
              Video Unavailable
            </h5>
            <p>
              This video cannot be loaded. It may be private, removed, or have an invalid ID.
            </p>
          </div>
        </div>
  );

  const handleClick = () => {
    if (youTubeID && !hasError) {
      if (!isValidYouTubeID) {
        setHasError(true);
        return;
      }
      setIsPlaying(true);
      setIsLoading(true);
      // Set a timeout to catch cases where YouTube doesn't fire error events
      setTimeout(() => {
        if (isLoading) {
          setHasError(true);
          setIsPlaying(false);
          setIsLoading(false);
        }
      }, 5000);
    } else {
      // If no YouTube ID or error occurred, open link to YouTube
      if (message.video) {
        window.open(message.video, '_blank');
      }
    }
  };

  const handleYouTubeError = (event: any) => {
    console.log('YouTube Error:', event);
    setHasError(true);
    setIsPlaying(false);
    setIsLoading(false);
  };

  const handleYouTubeReady = () => {
    setHasError(false);
    setIsLoading(false);
  };

  const handleYouTubeStateChange = (event: any) => {
    // YouTube player state: -1 (unstarted), 0 (ended), 1 (playing), 2 (paused), 3 (buffering), 5 (video cued)
    if (event.data === -1 || event.data === 5) {
      setIsLoading(false);
    }
  };

  return (
    <div className='w-full max-h-[700px] relative overflow-hidden rounded-lg'>
      {isPlaying && youTubeID && !hasError ? (
        <YouTube 
          videoId={youTubeID} 
          opts={youtubeOpts}
          className="w-full h-[680px]"
          onError={handleYouTubeError}
          onReady={handleYouTubeReady}
          onStateChange={handleYouTubeStateChange}
        />
      ) : hasError ? (
        <ErrorComponent />
      ) : (
        <div className="cursor-pointer" onClick={handleClick}>
          <div className="pointer-events-none cursor-pointer absolute z-10 flex h-full w-full items-center justify-center">
            <Image
              src="/images/play-icon.svg"
              alt="Play button"
              width={100}
              height={100}
            />
          </div>
          <div className="w-full">
            <Media
              resource={message.thumbnail}
              imgClassName="object-cover object-center hover:scale-110 transition-transform duration-300 h-full"
              size='16:9'
            />
          </div>
        </div>
      )}
    </div>
  );
};
