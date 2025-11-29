import Link from 'next/link';

import Balancer from 'react-wrap-balancer';

import { getLatestMessage } from '@/blocks/Messages/getLatestMessage';
import { Button } from '@/components/ui/button';
import { MediaPlayer } from '@/components/MediaPlayer';
import { MessageInfoBar } from '@/blocks/Messages/MessageInfoBar';

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
            <MessageInfoBar message={message} />
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
