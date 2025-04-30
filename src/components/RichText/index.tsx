import {
  DefaultNodeTypes,
  type DefaultTypedEditorState,
  SerializedBlockNode,
} from '@payloadcms/richtext-lexical';
import {
  RichText as ConvertRichText,
  JSXConvertersFunction,
} from '@payloadcms/richtext-lexical/react';

import { BannerBlock } from '@/blocks/Banner/Component';
import { ButtonBlock } from '@/blocks/ButtonBlock/Component';
import { CallToActionBlock } from '@/blocks/CallToAction/Component';
import { CodeBlock, CodeBlockProps } from '@/blocks/Code/Component';
import { FormBlock } from '@/blocks/Form/Component';
import { LinkGroupBlock } from '@/blocks/LinkGroupBlock/Component';
import { LinkedTextBlock } from '@/blocks/LinkedText/Component';
import { MediaBlock } from '@/blocks/MediaBlock/Component';
import { MegaButtonPairBlock } from '@/blocks/MegaButtonPair/Component';
import type {
  BannerBlock as BannerBlockProps,
  ButtonBlock as ButtonBlockProps,
  CallToActionBlock as CTABlockProps,
  FormBlock as FormBlockProps,
  LinkGroupBlock as LinkGroupBlockProps,
  LinkedText as LinkedTextProps,
  MediaBlock as MediaBlockProps,
  MegaButtonPair as MegaButtonPairProps,
} from '@/payload-types';
import { cn } from '@/utilities/ui';

type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<
      | CTABlockProps
      | MediaBlockProps
      | BannerBlockProps
      | CodeBlockProps
      | LinkedTextProps
      | MegaButtonPairProps
      | LinkGroupBlockProps
      | FormBlockProps
      | ButtonBlockProps
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
    linkedText: ({ node }) => <LinkedTextBlock {...node.fields} />,
    megaButtonPair: ({ node }) => <MegaButtonPairBlock {...node.fields} />,
    linkGroupBlock: ({ node }) => <LinkGroupBlock {...node.fields} />,
    formBlock: ({ node }) => <FormBlock {...node.fields} />,
    buttonBlock: ({ node }) => <ButtonBlock {...node.fields} />,
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
          'prose md:prose-md mx-auto': enableProse,
        },
        className,
      )}
      {...rest}
    />
  );
}
