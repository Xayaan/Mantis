import React, { ReactElement } from 'react'
import { Helmet } from "react-helmet"

import { PlayAIView } from '../components/organisms/PlayAI'
import PlayAI, { PlayAIProps } from '../components/templates/PlayAI'

// TODO
// Implement feature which "holds" Uploaded Data for 1 day.
// Users may want to annotate their own data, or they may not.
// Once the data is on the site, if the user wants to annotate it themselves, they can store it for up to a day.

export default function PageGatsbyPlayAI(props: PlayAIProps): ReactElement {
  const title = "Dupe the AI"
  const tagline = "Play against the AI, improve the algorithm and get rewarded!"
  const guidelines = '/upload/guidelines'
    
  const comingSoon = true

    return (
      <PlayAI
        title={title}
        description={tagline}
        guidelines={guidelines}
        comingSoon={comingSoon}
      >
      <Helmet>
          <title>DataUnion.app Mantis Dupe the AI</title>
          <meta name="description" content="Under construction." />
      </Helmet>
        <PlayAIView />
    </PlayAI>
  )
}