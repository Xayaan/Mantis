import React, { ReactElement } from 'react'
import { Helmet } from "react-helmet"

import BountyView from '../components/organisms/Bounties'
import Bounties from '../components/templates/Bounties'


export default function PageGatsbyDashboard(): ReactElement {
  const title = "Data Bounties"
  const description = "Read about how you can earn extra rewards."

  const underConstruction = false
  
  return (
      <Bounties
        title={title}
        description={description}
        underConstruction={underConstruction}
      >
        
        <Helmet>
      	    <title>DataUnion.app Mantis Bounties</title>
      	    <meta name="description" content="Overview over DataUnion.app's bounties on the Mantis platform." />
      	</Helmet>
        <BountyView />

      </Bounties>
  )
}
