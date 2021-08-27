import React, { ReactElement } from 'react'

export default function PageGatsbyDashboard(): ReactElement {
    return (
      <div className={"contact"}>
        <h1>Contact us</h1>
        <p>Please feel free to contact us via mail or via the social media channels listed in the footer of this page</p>
        <h2>Bug bounty</h2>
        <p>If you want to report a bug, please contact us at <a href="mailto:bugs@dataunion.app">bugs@dataunion.app</a> - we are paying bug bounties!</p>
        <h2>Feedback or Suggestions</h2>
        <p>If you have feedback or suggestions regarding our product, website or other topics, please let us know <a href="mailto:feedback@dataunion.app">feedback@dataunion.app</a></p>
        <h2>Sales or Data requests</h2>
        <p>To buy/use our data before our sales portal is available please contact us via <a href="mailto:sales@dataunion.app">sales@dataunion.app</a> - we are happy to discuss the collection of specific data, the creation or validation of an algorithm for your use case on DataUnion.app's data.</p>
        <h2>Collaboration or Partnership requests</h2>
        <p>If you are interested in collaborating with us please contact us at <a href="mailto:collaborate@dataunion.app">collaborate@dataunion.app</a></p>
      </div>
  )
}
