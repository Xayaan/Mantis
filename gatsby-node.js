/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require('path')

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
      node: {
        fs: 'empty'
      },
      externals: ['got'],
      resolve: {
        alias: {
          react: path.resolve('./node_modules/react')
        }
      }
    })
}
