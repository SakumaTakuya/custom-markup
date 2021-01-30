module.exports = {
  siteMetadata: {
    title: `Custom Markup`,
    description: `A customizable markup language editor`,
    author: {
      name: 'Sakkun',
    },
    social: {
      github: 'https://github.com/SakumaTakuya',
    },
  },
  plugins: [
    `gatsby-plugin-typescript`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: 'gatsby-plugin-material-ui',
      // If you want to use styled components you should change the injection order.
      options: {
        // stylesProvider: {
        //   injectFirst: true,
        // },
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        //trackingId: `ADD YOUR TRACKING ID HERE`,
        // Puts script in the head instead of the body
        head: false,
        // Setting this parameter is optional
        anonymize: true,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Customizable Markup`,
        short_name: `Custom Markup`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/ui/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
