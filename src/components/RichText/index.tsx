import {
  DefaultNodeTypes,
  type DefaultTypedEditorState,
  SerializedBlockNode,
  SerializedLinkNode,
} from '@payloadcms/richtext-lexical';
import {
  RichText as ConvertRichText,
  JSXConvertersFunction,
  LinkJSXConverter,
} from '@payloadcms/richtext-lexical/react';

import { BannerBlock } from '@/blocks/Banner/Component';
import { CallToActionBlock } from '@/blocks/CallToAction/Component';
import { CodeBlock, CodeBlockProps } from '@/blocks/Code/Component';
import { MediaBlock } from '@/blocks/MediaBlock/Component';
import type {
  BannerBlock as BannerBlockProps,
  CallToActionBlock as CTABlockProps,
  MediaBlock as MediaBlockProps,
} from '@/payload-types';
import { cn } from '@/utilities/ui';

type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<
      CTABlockProps | MediaBlockProps | BannerBlockProps | CodeBlockProps
    >;

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({
  defaultConverters,
}) => ({
  ...defaultConverters,
  blocks: {
    banner: ({ node }) => (
      <BannerBlock className="col-start-2 mb-4" {...node.fields} />
    ),
    mediaBlock: ({ node }) => (
      <MediaBlock
        className="col-span-3 col-start-1"
        imgClassName="m-0"
        {...node.fields}
        captionClassName="mx-auto max-w-[48rem]"
        enableGutter={false}
        disableInnerContainer={true}
      />
    ),
    code: ({ node }) => <CodeBlock className="col-start-2" {...node.fields} />,
    cta: ({ node }) => <CallToActionBlock {...node.fields} />,
  },
});

type Props = {
  data: DefaultTypedEditorState;
  enableGutter?: boolean;
  enableProse?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export default function RichText(props: Props) {
  const { className, enableProse = true, enableGutter = true, ...rest } = props;
  return (
    <ConvertRichText
      converters={jsxConverters}
      className={cn(
        'payload-richtext',
        {
          container: enableGutter,
          'max-w-none': !enableGutter,
          'prose mx-auto md:prose-md dark:prose-invert': enableProse,
        },
        className,
      )}
      {...rest}
    />
  );
}
