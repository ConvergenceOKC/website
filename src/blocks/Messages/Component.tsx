import { LatestMessage } from '@/blocks/Messages/LatestMessage';
import { MoreFromSeries } from '@/blocks/Messages/MoreFromSeries';
import { RecentMessages } from '@/blocks/Messages/RecentMessages';
import { RecentSeries } from '@/blocks/Messages/RecentSeries';
import { getLatestMessage } from '@/blocks/Messages/getLatestMessage';
import { MessagesBlock as MessagesBlockProps } from '@/payload-types';

export const MessagesBlock: React.FC<MessagesBlockProps> = async ({
  block,
  useLatestMessage,
  excludeLatestMessage = false,
  message,
}) => {
  if (!block) {
    return null;
  }

  switch (block) {
    case 'latest':
      return <LatestMessage />;
    case 'moreSeries':
      if (useLatestMessage) {
        const latestMessage = await getLatestMessage();
        if (
          !latestMessage ||
          latestMessage.docs.length === 0 ||
          !latestMessage.docs[0]
        ) {
          return <div>No latest message found.</div>;
        }
        return <MoreFromSeries message={latestMessage.docs[0]} />;
      } else if (message && typeof message === 'object' && 'id' in message) {
        return <MoreFromSeries message={message} />;
      }
    case 'recentSeries':
      return <RecentSeries />;
    case 'recentMessages':
      return (
        <RecentMessages excludeLatestMessage={excludeLatestMessage || false} />
      );
    // case 'archive':
    //   return <MessageArchive />;
    default:
      return null;
  }
};
