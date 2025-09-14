import Image from 'next/image';
import Link from 'next/link';

import { Dot } from 'lucide-react';
import Balancer from 'react-wrap-balancer';

import { getLatestMessage } from '@/blocks/Messages/getLatestMessage';
import { CMSLink } from '@/components/Link';
import { Media } from '@/components/Media';
import { Button } from '@/components/ui/button';
import { Message, MessageSery, Staff } from '@/payload-types';
import { formatDateTime } from '@/utilities/formatDateTime';

export const LatestMessage: React.FC = async () => {
  const messageDoc = await getLatestMessage();
  const message = messageDoc?.docs ? messageDoc.docs[0] : null;

  if (message) {
    return (
      <div>
        {/* Message Thumbnail */}
        <Link
          href={message.video}
          className="relative cursor-pointer"
          target="_blank"
        >
          <div className="absolute z-10 flex h-full w-full items-center justify-center">
            <Image
              src="/images/play-icon.svg"
              alt="Play button"
              width={40}
              height={40}
              className="sm:w-[60px] sm:h-[60px] md:w-[100px] md:h-[100px]"
            />
          </div>
          <Media resource={message.thumbnail} size="og" className="mb-6 sm:mb-9" />
        </Link>

        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-10">
          {/* Message Details */}
          <div className="flex-1">
            <h4 className="mb-2 text-xl sm:text-2xl lg:text-3xl">
              <Balancer>{message.title}</Balancer>
            </h4>
            {/* Message Info Bar */}
            <div className="mb-4 sm:mb-6 flex flex-wrap items-center gap-0 text-xs sm:text-sm uppercase opacity-70">
              <span>
                {typeof message.speaker === 'object' &&
                'name' in message.speaker
                  ? message.speaker.name
                  : message.speaker}
              </span>
              <Dot className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>{formatDateTime(message.date)}</span>
              {message.series && (
                <>
                  <Dot className="w-3 h-3 sm:w-4 sm:h-4" />
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
                    <Dot className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="break-words">
                      {message.scripture
                        .map(
                          (ref) => `${ref.book} ${ref.chapter}:${ref.verses}`,
                        )
                        .join('; ')}
                    </span>
                  </>
                )}
            </div>
            <p className="text-sm sm:text-base leading-relaxed">{message.description}</p>
          </div>
          {/* Message Button Bar */}
          <div className="flex flex-wrap lg:flex-col gap-2 sm:gap-3 lg:gap-2 lg:min-w-[200px]">
            <Button variant={'secondary'} className="text-xs sm:text-sm">
              <Link href={'/messages/' + message.slug}>Message Details</Link>
            </Button>
            {message.notes && (
              <Button variant={'secondary'} className="text-xs sm:text-sm">
                <Link href={message.notes}>Sermon Notes</Link>
              </Button>
            )}
            {message.series && (
              <Button variant={'secondary'} className="text-xs sm:text-sm">
                <Link href={'/messages#more-from-series'}>
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
