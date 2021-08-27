import React, { ReactElement } from 'react'

import UserDashboard from '../components/organisms/UserDashboard'
import MyDashboard from '../components/templates/MyDashboard'

import { Helmet } from "react-helmet"

export default function PageGatsbyUserAccount(): ReactElement {
  const title = "User Statistics"
  const description = "View your contributions and your QUICRA-0 rewards."

  const underConstruction = false

  return (

    <MyDashboard
      title={title}
      description={description} 
      underConstruction={underConstruction}
    >
    <Helmet>
        <title>DataUnion.app Mantis Personal Statistics</title>
        <meta name="description" content="Overview of your personal statistics of contributing to DataUnion.app's challenges on the Mantis platform." />
    </Helmet>
      <UserDashboard />
    </MyDashboard>

  )
}