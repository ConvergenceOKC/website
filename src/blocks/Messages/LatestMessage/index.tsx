import { Dot } from 'lucide-react';

import { getLatestMessage } from '@/blocks/Messages/getLatestMessage';
import { Media } from '@/components/Media';
import { Button } from '@/components/ui/button';
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
              <p>message.speaker</p>
              <Dot />
              <p>{formatDateTime(message.date)}</p>
              {message.series && (
                <>
                  <Dot />
                  <p>message.series</p>
                </>
              )}
              {message.scripture && (
                <>
                  <Dot />
                  <p>message.scripture</p>
                </>
              )}
            </div>
            <p>{message.description}</p>
          </div>
          {/* Message Button Bar */}
          <div className="flex gap-3">
            <Button>Sermon Notes</Button>
            {message.series && (
              <Button variant={'secondary'}>More In This Series</Button>
            )}
            <Button variant={'secondary'}>All Messages</Button>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};
