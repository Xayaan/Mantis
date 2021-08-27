import React, { ReactElement } from 'react'
import { Helmet } from "react-helmet"

import TutorialView from '../components/organisms/Tutorial'
import Tutorial from '../components/templates/Tutorial'

export default function PageGatsbyTutorials(): ReactElement {
    const title = "Tutorials & FAQ"
    const description = "For people who are new to cryptocurrency, unsure how our site works, or simply curious."

    const underConstruction = false

    return (
    <Tutorial
        title={title}
        description={description}
        underConstruction={underConstruction}
    >
        <Helmet>
            <title>DataUnion.app Mantis Tutorials</title>
            <meta name="description" content="For people who are new to cryptocurrency, unsure how our site works, or simply curious." />
        </Helmet>
        <TutorialView />
    </Tutorial>
  )
}