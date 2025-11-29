import Image from 'next/image';
import Link from 'next/link';

import { Dot } from 'lucide-react';
import Balancer from 'react-wrap-balancer';

import { getLatestMessage } from '@/blocks/Messages/getLatestMessage';
import { Media } from '@/components/Media';
import { Button } from '@/components/ui/button';
import { formatDateTime } from '@/utilities/formatDateTime';
import { MediaPlayer } from '@/components/MediaPlayer';

export const LatestMessage: React.FC = async () => {
  const messageDoc = await getLatestMessage();
  const message = messageDoc?.docs ? messageDoc.docs[0] : null;

  if (message) {
    return (
      <div className="flex flex-col gap-6">
        {/* Message Player */}
        <MediaPlayer message={message} />
        <div className="flex flex-col gap-4 sm:gap-6 lg:flex-row lg:gap-10">
          {/* Message Details */}
          <div className="flex-1">
            <h3>
              <Balancer>{message.title}</Balancer>
            </h3>
            {/* Message Info Bar */}
            <div className="mb-4 flex flex-wrap items-center gap-0 text-xs uppercase opacity-70 sm:mb-6 sm:text-sm">
              <span>{formatDateTime(message.date)}</span>
              {message.series && (
                <>
                  <Dot className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span>
                    {typeof message.series === 'object' &&
                    'title' in message.series
                      ? message.series.title
                      : message.series}
                  </span>
                </>
              )}
              {Array.isArray(message.scripture) &&
                message.scripture.length > 0 && (
                  <>
                    <Dot className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="wrap-break-word">
                      {message.scripture
                        .map((ref) => {
                          if (ref.book && ref.chapter && ref.verses) {
                            return `${ref.book} ${ref.chapter}:${ref.verses}`;
                          } else if (ref.book && ref.chapter) {
                            return `${ref.book} ${ref.chapter}`;
                          } else {
                            return `${ref.book}`;
                          }
                        })
                        .join('; ')}
                    </span>
                  </>
                )}
              <Dot className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>
                {typeof message.speaker === 'object' &&
                'name' in message.speaker
                  ? message.speaker.name
                  : message.speaker}
              </span>
            </div>
            <p className="text-sm leading-relaxed sm:text-base">
              {message.description}
            </p>
          </div>
          {/* Message Button Bar */}
          <div className="flex flex-col flex-wrap gap-2 sm:flex-row sm:gap-3 lg:min-w-[200px] lg:flex-col lg:gap-2">
            <Button
              asChild
              variant={'secondary'}
              className="text-xs sm:text-sm"
            >
              <Link href={'/messages/' + message.slug}>Message Details</Link>
            </Button>
            {message.notes && (
              <Button
                asChild
                variant={'secondary'}
                className="text-xs sm:text-sm"
              >
                <Link href={message.notes}>Sermon Notes</Link>
              </Button>
            )}
            {message.series && typeof message.series === 'object' && 'slug' in message.series && (
              <Button
                asChild
                variant={'secondary'}
                className="text-xs sm:text-sm"
              >
                <Link href={`/messages/series/${message.series.slug}`}>
                  More In This Series
                </Link>
              </Button>
            )}
            {/* <Button variant={'secondary'}>
              <Link href={'/messages'}>All Messages</Link>
            </Button> */}
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};
