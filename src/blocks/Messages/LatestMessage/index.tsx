import Link from 'next/link';

import { Dot } from 'lucide-react';

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
    console.log('Latest message:', message);
    return (
      <div>
        {/* Message Thumbnail */}
        <Media resource={message.thumbnail} size="og" className="mb-9" />

        <div className="flex gap-10">
          {/* Message Details */}
          <div>
            <h4 className="mb-2">{message.title}</h4>
            {/* Message Info Bar */}
            <div className="mb-6 flex items-center gap-0 text-sm uppercase opacity-70">
              <p>
                {typeof message.speaker === 'object' &&
                'name' in message.speaker
                  ? message.speaker.name
                  : message.speaker}
              </p>
              <Dot />
              <p>{formatDateTime(message.date)}</p>
              {message.series && (
                <>
                  <Dot />
                  <p>
                    {typeof message.series === 'object' &&
                    'title' in message.series
                      ? message.series.title
                      : message.series}
                  </p>
                </>
              )}
              {Array.isArray(message.scripture) &&
                message.scripture.length > 0 && (
                  <>
                    <Dot />
                    <p>
                      {message.scripture
                        .map(
                          (ref) => `${ref.book} ${ref.chapter}:${ref.verses}`,
                        )
                        .join('; ')}
                    </p>
                  </>
                )}
            </div>
            <p>{message.description}</p>
          </div>
          {/* Message Button Bar */}
          <div className="flex gap-3">
            {message.notes && (
              <Button asChild>
                <Link href={message.notes}>Sermon Notes</Link>
              </Button>
            )}
            {message.series && (
              <Button variant={'secondary'}>
                <Link href={'/message#more'}>More In This Series</Link>
              </Button>
            )}
            <Button variant={'secondary'}>
              <Link href={'/message#all'}>All Messages</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};
