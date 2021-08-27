import React, { ReactElement, ReactNode } from 'react'

import { useAuthContext } from '../../providers/AuthProvider'
import Alert from '../atoms/Alert/Alert'
import { BackToHomeLink } from '../atoms/Button'
import ContentContainer from '../atoms/ContentContainer'
import PageHeader from '../molecules/PageHeader'

export interface BountiesProps {
  children: ReactNode
  title: string
  underConstruction?: boolean
  description?: string
  noPageHeader?: boolean
}

export default function Bounties({
  children,
  title,
  underConstruction,
  description,
  noPageHeader
}: BountiesProps): ReactElement {

  return (
      <>
        <BackToHomeLink />
        
        {title && !noPageHeader && (
          <PageHeader
            title={title}
            description={description}
          />
        )}
        
        {underConstruction && (
          <Alert 
            text="UNDER CONSTRUCTION. Developers are currently fixing and optimising this feature. Please come back tomorrow. Thank you for your patience." 
            state="guidelinesWarning" 
          />
        )}

        <ContentContainer 
          children={children}
        />
      </>
    )
}