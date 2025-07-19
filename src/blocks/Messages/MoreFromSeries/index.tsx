import Link from 'next/link';

import { getSeriesMessages } from '@/blocks/Messages/getSeriesMessages';
import { Media } from '@/components/Media';
import { Message } from '@/payload-types';

interface MoreFromSeriesProps {
  message: Message;
}

export const MoreFromSeries: React.FC<MoreFromSeriesProps> = async ({
  message,
}) => {
  if (!message) {
    return <div>No message provided for MoreFromSeries block.</div>;
  }
  if (typeof message !== 'object' || !('id' in message)) {
    return <div>Invalid message data provided.</div>;
  }

  const series = message.series;
  if (!series) {
    return <div>No series found for the provided message.</div>;
  }

  // Get more messages from the same series
  const messages = await getSeriesMessages(series, 5); // Fetch one extra in case we filter out the current message
  if (!messages || messages.docs.length === 0) {
    return <div>No additional messages found for this series.</div>;
  }

  // Filter out the provided message
  const moreMessages = messages.docs
    .filter((msg) => msg.id !== message.id)
    .slice(0, 4);

  if (moreMessages.length === 0) {
    return <div>No additional messages found for this series.</div>;
  }

  return (
    <div>
      <h4>More From This Series</h4>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {moreMessages.map((message) => (
          <Link
            href={`/messages/${message.id}`}
            key={message.id}
            className="flex flex-col items-start"
          >
            <Media resource={message.thumbnail} size="sm" />
            <h5>{message.title}</h5>
          </Link>
        ))}
      </div>
    </div>
  );
};
