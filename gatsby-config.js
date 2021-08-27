module.exports = {
  siteMetadata: {
    title: `Mantis`,
    description: `Take photos, add labels, verify labels & GET CRYPTO REWARDS! Mantis is DataUnion's tool for image data curation. Get Rewarded for uploading, annotating & curating text data today!`,
    author: `@dataUnion`,
  },
  plugins: [
    {
       resolve: "gatsby-plugin-react-svg",
       options: {
         rule: {
           include: /images/ 
         }
       }
    },
    `gatsby-plugin-react-helmet`,
    'gatsby-plugin-styled-components',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: 'gatsby-plugin-use-dark-mode',
      options: {
      //   ...appConfig.darkModeConfig,
        minify: true
      }
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
