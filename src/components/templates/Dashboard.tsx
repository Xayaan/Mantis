import React, { ReactElement, ReactNode } from 'react'

import { DashboardStatsContextProvider } from '../../providers/Dashboard/DashboardStatsProvider'
import { TagPaginationProvider } from '../../providers/PaginationBridge'
import Alert from '../atoms/Alert/Alert'
import { BackToHomeLink } from '../atoms/Button'
import ContentContainer from '../atoms/ContentContainer'

export interface DashboardProps {
  children?: ReactNode
  underConstruction?: boolean
}

export default function DashboardPage({
    children,
    underConstruction
}: DashboardProps): ReactElement {
    
    return (
        <>
          <BackToHomeLink />
          {underConstruction ? (
            <Alert text="UNDER CONSTRUCTION. Developers are currently fixing and optimising this feature. Please come back tomorrow. Thank you for your patience." state="guidelinesWarning" />
          ): (
            
            <TagPaginationProvider>
                <DashboardStatsContextProvider>
                    
                  <ContentContainer 
                      children={children}
                  />

                </DashboardStatsContextProvider>
            </TagPaginationProvider>    
                
          )}
        </>
      )
}