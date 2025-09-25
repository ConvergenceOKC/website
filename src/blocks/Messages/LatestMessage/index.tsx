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
      <div className="flex flex-col gap-6">
        {/* Message Thumbnail */}
        <Link
          href={message.video}
          className="relative cursor-pointer"
          target="_blank"
        >
          <div className="pointer-events-none absolute z-10 flex h-full w-full items-center justify-center">
            <Image
              src="/images/play-icon.svg"
              alt="Play button"
              width={40}
              height={40}
              className="sm:h-[60px] sm:w-[60px] md:h-[100px] md:w-[100px]"
            />
          </div>
          <div className="w-full overflow-hidden rounded-lg">
            <Media
              resource={message.thumbnail}
              imgClassName="object-cover object-center hover:scale-110 transition-transform duration-300 max-h-[700px]"
              size="small"
            />
          </div>
        </Link>
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
                    <span className="break-words">
                      {message.scripture
                        .map(
                          (ref) => `${ref.book} ${ref.chapter}:${ref.verses}`,
                        )
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
          <div className="flex flex-wrap gap-2 sm:gap-3 lg:min-w-[200px] lg:flex-col lg:gap-2">
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
            {message.series && (
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
