import React, { ReactElement, ReactNode } from 'react'

import ContentContainer from '../atoms/ContentContainer'
import { AcceptGuidelinesCollapser } from '../molecules/AcceptGuidelinesCollapser'
import PageHeader from '../molecules/PageHeader'

export interface GuidelinesProps {
    children: ReactNode
    title: string
    description?: string
    noPageHeader?: boolean
    headerCenter?: boolean
}

export default function Guidelines({
    children,
    title,
    description,
    noPageHeader,
    headerCenter}: GuidelinesProps): ReactElement {
    
    return (
        <>
          {title && !noPageHeader && (
            <PageHeader
              title={title}
              description={description}
              center={headerCenter}
            />
          )}

          <AcceptGuidelinesCollapser />

          <ContentContainer
            children={children}
          />
        </>
      )
}