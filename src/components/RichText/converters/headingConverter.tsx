import { SerializedHeadingNode } from '@payloadcms/richtext-lexical';
import { JSXConverters } from '@payloadcms/richtext-lexical/react';
import Balancer from 'react-wrap-balancer';

export const headingConverter: JSXConverters<SerializedHeadingNode> = {
  heading: ({ node, nodesToJSX }) => {
    if (node.tag === 'h2' || node.tag === 'h3' || node.tag === 'h4') {
      const text = nodesToJSX({ nodes: node.children });

      const id = text
        .join('')
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');
      return (
        <node.tag id={id} className="scroll-mt-32">
          <Balancer>{text}</Balancer>
        </node.tag>
      );
    } else {
      const text = nodesToJSX({ nodes: node.children }).join('');
      const Tag = node.tag;
      return (
        <Tag>
          <Balancer>{text}</Balancer>
        </Tag>
      );
    }
  },
};
