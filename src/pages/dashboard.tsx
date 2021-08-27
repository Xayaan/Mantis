import React, { ReactElement } from 'react'

import Dashboard from '../components/organisms/Dashboard'
import DashboardPage from '../components/templates/Dashboard'

import { Helmet } from "react-helmet"

export default function PageGatsbyDashboard(): ReactElement {
  const underConstruction = false

  return (
      <DashboardPage
        underConstruction={underConstruction}
      >
      <Helmet>
          <title>DataUnion.app Mantis Dashboard</title>
          <meta name="description" content="Get an overview over the dataset behind the DataUnion.app Image & Annotation Vault. See the status of the current challenges as well as the distribution of annotated tags." />
      </Helmet>
        <Dashboard />
      </DashboardPage>
  )
}