import { SerializedLinkNode } from '@payloadcms/richtext-lexical';

export const internalDocToHref = ({
  linkNode,
}: {
  linkNode: SerializedLinkNode;
}) => {
  const { value, relationTo } = linkNode.fields.doc!;

  const slug = typeof value !== 'string' && value.slug;

  if (relationTo === 'messages') {
    return `/messages/${slug}`;
  } else if (relationTo === 'series') {
    return `/series/${slug}`;
  } else {
    return `/${slug}`;
  }
};
