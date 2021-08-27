import React, { ReactElement, ReactNode } from 'react'
import { metamaskVideo } from '../../@types/constants'

import { useAuthContext } from '../../providers/AuthProvider'
import { UserDashboardStatsContextProvider } from '../../providers/Dashboard/UserDashboardStatsProvider'
import Alert from '../atoms/Alert/Alert'
import { BackToHomeLink } from '../atoms/Button'
import ContentContainer from '../atoms/ContentContainer'
import PageHeader from '../molecules/PageHeader'
import { TutorialVideo, VideoData } from '../molecules/TutorialVideo'
import DownloadMetamask from '../organisms/DownloadMetamask'
import UserDashboard from '../organisms/UserDashboard'

export interface DashboardProps {
  title: string
  description: string
  children?: ReactNode
  underConstruction?: boolean
}

export default function MyDashboard({
  title,
  description,
  children,
  underConstruction
}: DashboardProps): ReactElement {

  const { notLoggedInError } = useAuthContext()

  return (
    <>
      <BackToHomeLink />
      
      <PageHeader
        title={title}
        description={description}
      />
      {underConstruction && (
        <Alert text="UNDER CONSTRUCTION. Developers are currently fixing and optimising this feature. Please come back tomorrow. Thank you for your patience." state="guidelinesWarning" />
      )}
        
      {notLoggedInError && (
        <DownloadMetamask 
          errorText={notLoggedInError}
        />
      )}

      {!notLoggedInError && !underConstruction && (
        <UserDashboardStatsContextProvider>
          <ContentContainer
            children={children}
          />
        </UserDashboardStatsContextProvider>
      )}
    </>
  )
}