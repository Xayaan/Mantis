import { Link } from "gatsby"
import React, { ReactElement } from 'react'
import { Helmet } from "react-helmet"

import VerifyAllData from '../components/organisms/VerifyPhotos/VerifyAllData'
import Verify from '../components/templates/Verify'

export default function PageGatsbyVerify(): ReactElement {
    const title = "Verify data"
    const description = "Flag inappropriate images, check that tags & descriptions are fitting, and add missing tags. If a description is not fitting you can add another one. \
        Bad actors will be weeded out by the democratic system."

    const guidelines = '/verify/guidelines'
    const underConstruction = false

    return (

    <Verify
        title={title}
        description={description}
        guidelines={guidelines}
        underConstruction={underConstruction}
    >
        <Helmet>
            <title>DataUnion.app Mantis Verifications</title>
            <meta name="description" content="Verify, describe and tag images for DataUnion.app's Image & Annotation Vault." />
        </Helmet>

        <h4>Verify - <Link to='/image_categorization'>Personal Information</Link>, <Link to='/tutorials/#verifyImages'>Tutorial</Link>, <Link to='/bounties'>Data Bounties</Link></h4>
        
        <VerifyAllData />
    </Verify>
  )
}