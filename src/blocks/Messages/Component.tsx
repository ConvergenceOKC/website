// import configPromise from '@payload-config';
// import { getPayload } from 'payload';
import { LatestMessage } from '@/blocks/Messages/LatestMessage';
import { MoreFromSeries } from '@/blocks/Messages/MoreFromSeries';
import { getSeriesMessages } from '@/blocks/Messages/getSeriesMessages';
import { MessagesBlock as MessagesBlockProps } from '@/payload-types';

export const MessagesBlock: React.FC<MessagesBlockProps> = async ({
  block,
  message,
}) => {
  if (!block) {
    return null;
  }

  if (message) {
    // console.log(await getSeriesMessages(message));
  }

  switch (block) {
    case 'latest':
      return <LatestMessage />;
    case 'moreSeries':
      return <MoreFromSeries />;
    case 'recentSeries':
      return <div>Recent Series Block</div>;
    case 'archive':
      return <div>Message Archive Block</div>;
    default:
      return null;
  }
};
