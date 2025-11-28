import Link from 'next/link';

import Balancer from 'react-wrap-balancer';

import { RecentSeries } from '@/blocks/Messages/RecentSeries';
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
    return null;
  }

  // Get more messages from the same series
  const messages = await getSeriesMessages(series, 4); // Fetch one extra in case we filter out the current message
  if (!messages || messages.docs.length === 0) {
    return <div>No additional messages found for this series.</div>;
  }

  // Filter out the provided message
  const moreMessages = messages.docs
    .filter((msg) => msg.id !== message.id)
    .slice(0, 3);

  if (moreMessages.length === 0) {
    return <div>No additional messages found for this series.</div>;
  }

  return (
    <div>
      <h3 id="more-from-series" className="scroll-mt-32">
        More From This Series
      </h3>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {moreMessages.map((message) => (
          <Link
            href={`/messages/${message.slug}`}
            key={message.id}
            className="flex flex-col items-start gap-3 no-underline"
          >
            <div className="w-full overflow-hidden rounded-lg">
              <Media
                resource={message.thumbnail}
                imgClassName="h-60 object-cover object-center hover:scale-110 transition-transform duration-300"
                size='4:3'
              />
            </div>
            <h5>
              <Balancer>{message.title}</Balancer>
            </h5>
          </Link>
        ))}
      </div>
    </div>
  );
};
