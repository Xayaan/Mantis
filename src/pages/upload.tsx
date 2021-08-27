import React, { ReactElement } from 'react'

import PhotoUpload from '../components/organisms/PhotoUpload/PhotoUpload'
import Upload, { UploadProps } from '../components/templates/Upload'

import { Helmet } from "react-helmet"

export default function PageGatsbyUpload(): ReactElement {
    const title = "Upload Data"
    const tagline = "Upload, Describe & Tag Data for the DataUnion.app image dataset & receive rewards."
    const guidelines = '/upload/guidelines'
    
    return (
    <Upload
        title={title}
        description={tagline}
        guidelines={guidelines}
    >
        <Helmet>
            <title>DataUnion.app Mantis Upload</title>
            <meta name="description" content="Upload, describe and tag images for DataUnion.app's Image & Annotation Vault." />
        </Helmet>
        <PhotoUpload />
    </Upload>
  )
}