import React, { ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import ImageCategorization from '../components/templates/ImageCategorization'
import ImageCategorizationView from '../components/organisms/ImageCategorizationView'

export default function PageGatsbyDashboard(): ReactElement {
    const title = "Image Categorization"
	const description = "Please read about your security responsibilities when uploading images. If you upload confidential or copyright information without knowing the rules, you could get in trouble."

	const underConstruction = false
	
	return (
	<ImageCategorization
        title={title}
        description={description}
        underConstruction={underConstruction}
    >
		<Helmet>
      	    <title>DataUnion.app Mantis Bounties</title>
      	    <meta name="description" content="Overview over DataUnion.app's bounties on the Mantis platform." />
      	</Helmet>
        <ImageCategorizationView />
	</ImageCategorization>
  )
}
