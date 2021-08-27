import React, { ReactNode, ReactElement } from 'react'
import PageHeader from '../molecules/PageHeader'

export interface PageProps {
  children: ReactNode
  title: string
  uri: string
  description?: string
  noPageHeader?: boolean
  headerCenter?: boolean
}

export default function Page({
  children,
  title,
  uri,
  description,
  noPageHeader,
  headerCenter
}: PageProps): ReactElement {

  return (
    <>
      {title && !noPageHeader && (
        <PageHeader
          title={title}
          description={description}
          center={headerCenter}
        />
      )}
      {children}
    </>
  )
}
