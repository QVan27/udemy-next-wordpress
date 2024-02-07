import { Cover } from "components/Cover";
import { Heading } from "components/Heading";
import { Paragraph } from 'components/Paragraph';
import { CallToActionButton } from 'components/CallToActionButton';
import { theme } from 'theme';
import { Columns } from 'components/Columns';
import { Column } from 'components/Column';
import Image from 'next/image';

export const BlockRenderer = ({ blocks }) => {
  return blocks.map(block => {
    switch (block.name) {
      case "acf/ctabutton": {
        return (
          <CallToActionButton
            key={block.id}
            buttonLabel={block.attributes.data.label}
            buttonDestination={block.attributes.data.destination || '/'}
            buttonAlign={block.attributes.data.align}
          />
        )
      }
      case "core/paragraph": {
        return (
          <Paragraph
            key={block.id}
            content={block.attributes.content}
            textAlign={block.attributes.align}
            textColor={theme[block.attributes.textColor] || block.attributes.style?.color?.text}
          />
        )
      }
      case "core/heading": {
        return (
          <Heading
            key={block.id}
            level={block.attributes.level}
            content={block.attributes.content}
            textAlign={block.attributes.textAlign}
          />
        )
      }
      case "core/cover": {
        return (
          <Cover key={block.id} background={block.attributes.url}>
            <BlockRenderer blocks={block.innerBlocks} />
          </Cover>
        )
      }
      case "core/columns": {
        return (
          <Columns
            key={block.id}
            isStackedOnMobile={block.attributes.isStackedOnMobile}
          >
            <BlockRenderer blocks={block.innerBlocks} />
          </Columns>
        )
      }
      case "core/column": {
        return (
          <Column
            key={block.id}
            width={block.attributes.width}
          >
            <BlockRenderer blocks={block.innerBlocks} />
          </Column>
        )
      }
      case "core/block":
      case "core/group": {
        return (
          <BlockRenderer key={block.id} blocks={block.innerBlocks} />
        )
      }
      case "core/image": {
        return (
          <Image
            key={block.id}
            src={block.attributes.url}
            width={block.attributes.originalWidth}
            height={block.attributes.originalHeight}
            alt={block.attributes.alt || ''}
          />
        )
      }
      default: {
        console.log('UNKNOWN: ', block);
        return null;
      }
    }
  })
}