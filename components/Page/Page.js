import { BlockRenderer } from 'components/BlockRenderer';
import { MainMenu } from 'components/MainMenu';
import { PageWrapper } from 'context/page';
import Head from 'next/head';
import SmoothScrolling from "components/SmoothScrolling";

export const Page = (props) => {
  console.log('PAGE PROPS: ', props);
  return (
    <SmoothScrolling>
      <PageWrapper value={{ title: props.title, featuredImage: props.featuredImage }}>
        <Head>
          <title>{props.seo.title}</title>
          <meta name="description" content={props.seo.metaDesc} />
        </Head>
        <MainMenu
          items={props.mainMenuItems}
          callToActionLabel={props.callToActionLabel}
          callToActionDestination={props.callToActionDestination}
        />

        <BlockRenderer blocks={props.blocks} />
      </PageWrapper>
    </ SmoothScrolling>
  )
}