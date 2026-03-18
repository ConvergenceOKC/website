import {
  DefaultNodeTypes,
  type DefaultTypedEditorState,
  SerializedBlockNode,
} from '@payloadcms/richtext-lexical';
import {
  RichText as ConvertRichText,
  JSXConvertersFunction,
  LinkJSXConverter,
} from '@payloadcms/richtext-lexical/react';

import { BannerBlock } from '@/blocks/Banner/Component';
import { ButtonBlock } from '@/blocks/ButtonBlock/Component';
import { CallToActionBlock } from '@/blocks/CallToAction/Component';
import { CodeBlock, CodeBlockProps } from '@/blocks/Code/Component';
import { ContentPathwayBlock } from '@/blocks/ContentPathway/Component';
import { EmbedBlock } from '@/blocks/Embed/Component';
import { EventsBlock } from '@/blocks/Events/Component';
import { FormBlock } from '@/blocks/Form/Component';
import { HouseChurchMapBlock } from '@/blocks/HouseChurchMap/Component';
import { IconBlock } from '@/blocks/IconBlock/Component';
import { LinkGroupBlock } from '@/blocks/LinkGroupBlock/Component';
import { LinkedTextBlock } from '@/blocks/LinkedText/Component';
import { MediaBlock } from '@/blocks/MediaBlock/Component';
import { MegaButtonPairBlock } from '@/blocks/MegaButtonPair/Component';
import { MessagesBlock } from '@/blocks/Messages/Component';
import { ShowcaseGalleryBlock } from '@/blocks/ShowcaseGallery/Component';
import { SliderGalleryBlock } from '@/blocks/SliderGallery/Component';
import { StaffBlock } from '@/blocks/StaffBlock/Component';
import { headingConverter } from '@/components/RichText/converters/headingConverter';
import { internalDocToHref } from '@/components/RichText/converters/internalLink';
import type {
  BannerBlock as BannerBlockProps,
  ButtonBlock as ButtonBlockProps,
  CallToActionBlock as CTABlockProps,
  ContentPathwayBlock as ContentPathwayBlockProps,
  EmbedBlock as EmbedBlockProps,
  EventsBlock as EventsBlockProps,
  FormBlock as FormBlockProps,
  HouseChurchMapBlock as HouseChurchMapBlockProps,
  IconBlock as IconBlockProps,
  LinkGroupBlock as LinkGroupBlockProps,
  LinkedText as LinkedTextProps,
  MediaBlock as MediaBlockProps,
  MegaButtonPair as MegaButtonPairProps,
  MessagesBlock as MessagesBlockProps,
  ShowcaseGalleryBlock as ShowcaseGalleryBlockProps,
  SliderGalleryBlock as SliderGalleryBlockProps,
  StaffBlock as StaffBlockProps,
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
      | ShowcaseGalleryBlockProps
      | ContentPathwayBlockProps
      | MessagesBlockProps
      | HouseChurchMapBlockProps
      | EmbedBlockProps
      | IconBlockProps
      | StaffBlockProps
      | SliderGalleryBlockProps
      | EventsBlockProps
    >;

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({
  defaultConverters,
}) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  ...headingConverter,
  blocks: {
    banner: ({ node }) => (
      <BannerBlock className="col-start-2 mb-4" {...node.fields} />
    ),
    mediaBlock: ({ node }) => (
      <MediaBlock
        className="col-span-3 col-start-1"
        imgClassName="mb-[2rem]"
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
    showcaseGallery: ({ node }) => <ShowcaseGalleryBlock {...node.fields} />,
    contentPathway: ({ node }) => <ContentPathwayBlock {...node.fields} />,
    messagesBlock: ({ node }) => <MessagesBlock {...node.fields} />,
    houseChurchMap: ({ node }) => <HouseChurchMapBlock {...node.fields} />,
    embed: ({ node }) => <EmbedBlock {...node.fields} />,
    iconBlock: ({ node }) => <IconBlock {...node.fields} />,
    staffBlock: ({ node }) => <StaffBlock {...node.fields} />,
    sliderGallery: ({ node }) => <SliderGalleryBlock {...node.fields} />,
    eventsBlock: ({ node }) => <EventsBlock />,
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
