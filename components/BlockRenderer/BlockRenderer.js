import { Cover } from "components/Cover";
import { Heading } from "components/Heading";
import { Paragraph } from 'components/Paragraph';
import { CallToActionButton } from 'components/CallToActionButton';
import { theme } from 'theme';
import { Columns } from 'components/Columns';

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
            isStackOnMobile={block.attributes.isStackOnMobile}
          >
            <BlockRenderer blocks={block.innerBlocks} />
          </Columns>
        )
      }
      default: {
        console.log('UNKNOWN: ', block);
        return null;
      }
    }
  })
}