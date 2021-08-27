import React, { ReactElement } from 'react'
import { Helmet } from "react-helmet"

import { AnnotatePhotos } from '../components/organisms/AnnotatePhotos'
import Annotate, { AnnotateProps } from '../components/templates/Annotate'

// TODO
// Implement feature which "holds" Uploaded Data for 1 day.
// Users may want to annotate their own data, or they may not.
// Once the data is on the site, if the user wants to annotate it themselves, they can store it for up to a day.

export default function PageGatsbyAnnotate(props: AnnotateProps): ReactElement {
  const title = "Annotate Data"
  const tagline = "Annotate Data for QUICRA-0."
  const guidelines = '/upload/guidelines'
    
  const comingSoon = false

    return (
      <Annotate
        title={title}
        description={tagline}
        guidelines={guidelines}
        comingSoon={comingSoon}
      >
      <Helmet>
          <title>DataUnion.app Mantis Annotation</title>
          <meta name="description" content="Under construction." />
      </Helmet>
        <AnnotatePhotos />
    </Annotate>
  )
}