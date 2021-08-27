import React, { ReactElement } from 'react'

import App from '../components/App'

export default function PageGatsbyDashboard(): ReactElement {
    return (
      <div className={"privacy"}>
        <h1>Copyright - TOS</h1>
        <p>In accordance with the Digital Millennium Copyright Act ("DMCA”), Directive 2001/29/EG and other relevant laws, DataUnion.app reserves the right to terminate accounts (and block Ethereum addresses) of users who appear to be repeatedly responsible for legal violations. In addition, DataUnion.app may, in its sole discretion, restrict access to its services and / or close the accounts of users who infringe the intellectual property rights of others, regardless of whether they are repeated infringements. DataUnion.app will respond accordingly to alleged copyright infringements that have occurred while using our services and that are reported to the address mentioned below.</p>
        <p>Contact for copyright violations (Designated Agent): <a href="mailto:copyright@dataunion.app">copyright@dataunion.app</a></p>
      </div>
  )
}
