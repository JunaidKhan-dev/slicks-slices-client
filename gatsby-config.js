// In your gatsby-config.js file
require('dotenv').config({
  path: `.env`,
});

module.exports = {
  siteMetadata: {
    title: `slicks slices`,
    siteUrl: 'https://gatsby.pizza',
    description: 'The best Pizza place in Town',
    twitter: '@slickSlices',
  },
  plugins: [
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-sanity`,
      options: {
        projectId: `sq8u4u9g`,
        dataset: `production`,
        watchMode: true,
        token: process.env.SANITY_TOKEN,
      },
    },
  ],
};
