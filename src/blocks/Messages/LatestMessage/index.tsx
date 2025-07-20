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
              width={100}
              height={100}
            />
          </div>
          <Media resource={message.thumbnail} size="og" className="mb-9" />
        </Link>

        <div className="flex gap-10">
          {/* Message Details */}
          <div>
            <h4 className="mb-2">
              <Balancer>{message.title}</Balancer>
            </h4>
            {/* Message Info Bar */}
            <div className="mb-6 flex items-center gap-0 text-sm uppercase opacity-70">
              <span>
                {typeof message.speaker === 'object' &&
                'name' in message.speaker
                  ? message.speaker.name
                  : message.speaker}
              </span>
              <Dot />
              <span>{formatDateTime(message.date)}</span>
              {message.series && (
                <>
                  <Dot />
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
                    <Dot />
                    <span>
                      {message.scripture
                        .map(
                          (ref) => `${ref.book} ${ref.chapter}:${ref.verses}`,
                        )
                        .join('; ')}
                    </span>
                  </>
                )}
            </div>
            <p>{message.description}</p>
          </div>
          {/* Message Button Bar */}
          <div className="flex gap-3">
            <Button variant={'secondary'}>
              <Link href={'/messages/' + message.slug}>Message Details</Link>
            </Button>
            {message.notes && (
              <Button variant={'secondary'}>
                <Link href={message.notes}>Sermon Notes</Link>
              </Button>
            )}
            {message.series && (
              <Button variant={'secondary'}>
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
