import { Privacy } from '@/blocks/Embed/Privacy';
import { Terms } from '@/blocks/Embed/Terms';
import { EmbedBlock as EmbedBlockProps } from '@/payload-types';

export const EmbedBlock: React.FC<EmbedBlockProps> = ({ type }) => {
  if (!type) {
    return null;
  }

  switch (type) {
    case 'privacy':
      return <Privacy />;
    case 'terms':
      return <Terms />;
    default:
      return null;
  }
};
