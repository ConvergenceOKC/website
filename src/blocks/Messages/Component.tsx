// import configPromise from '@payload-config';
// import { getPayload } from 'payload';
import { LatestMessage } from '@/blocks/Messages/LatestMessage';
import { getSeriesMessages } from '@/blocks/Messages/getSeriesMessages';
import { MessagesBlock as MessagesBlockProps } from '@/payload-types';

export const MessagesBlock: React.FC<MessagesBlockProps> = async ({
  block,
  series,
}) => {
  if (!block) {
    return null;
  }

  if (series) {
    console.log(await getSeriesMessages(series));
  }

  switch (block) {
    case 'latest':
      return <LatestMessage />;
    case 'moreSeries':
      return <div>More From Series Block</div>;
    case 'recentSeries':
      return <div>Recent Series Block</div>;
    case 'archive':
      return <div>Message Archive Block</div>;
    default:
      return null;
  }
};
