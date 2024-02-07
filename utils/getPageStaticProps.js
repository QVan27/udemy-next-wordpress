import client from 'client';
import { gql } from '@apollo/client';
import { cleanAndTransformBlocks } from 'utils/cleanAndTransformBlocks';
import { mapMainMenuItems } from 'utils/mapMainMenuItems';

export const getPageStaticProps = async (ctx) => {
  const uri = ctx.params?.slug ? `/${ctx.params.slug.join('/')}/` : '/';

  const { data } = await client.query({
    query: gql`
      query PageQuery($uri: String!) {
        nodeByUri(uri: $uri) {
          ... on Page {
            id
            title
            blocksJSON
            featuredImage {
              node {
                sourceUrl
              }
            }
          }
          ... on Property {
            id
            title
            blocksJSON
            featuredImage {
              node {
                sourceUrl
              }
            }
          }
        }
        acfOptionsMainMenu {
          mainMenu {
            callToActionButton {
              label
              destination {
                ... on Page {
                  uri
                }
              }
            }
            menuItems {
              menuItem {
                destination {
                    ... on Page {
                    uri
                  }
                }
                label
              }
              items {
                destination {
                    ... on Page {
                    uri
                  }
                }
                label
              }
            }
          }
        }
      }
    `,
    variables: {
      uri
    }
  });

  const blocks = await cleanAndTransformBlocks(data.nodeByUri.blocksJSON);

  return {
    props: {
      title: data.nodeByUri.title,
      featuredImage: data.nodeByUri.featuredImage?.node?.sourceUrl || null,
      mainMenuItems: mapMainMenuItems(data.acfOptionsMainMenu.mainMenu.menuItems),
      callToActionLabel: data.acfOptionsMainMenu.mainMenu.callToActionButton.label,
      callToActionDestination: data.acfOptionsMainMenu.mainMenu.callToActionButton.destination.uri,
      blocks
    },
  };
};