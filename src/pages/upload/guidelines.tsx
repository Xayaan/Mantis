import React, { ReactElement } from 'react'
import Guidelines, { GuidelinesProps } from '../../components/templates/Guidelines'
import GuidelinesView from '../../components/organisms/GuidelinesView'
import { Helmet } from "react-helmet"

export default function PageGatsbyGuidelines(props: GuidelinesProps): ReactElement {
    const title = "Upload Data"
    const tagline = "Upload, Describe & Tag Data for the DataUnion.app image dataset & receive rewards."
    const uri = '/upload/guidelines'
    const guidelines = ""

    return (
    <Guidelines
        title={title}
        description={tagline}
    >
        <GuidelinesView guidelines={guidelines}/>

    </Guidelines>
  )
}