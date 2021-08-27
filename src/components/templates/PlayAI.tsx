import React, { ReactElement, ReactNode } from 'react'
import { useAuthContext } from '../../providers/AuthProvider'
import PlayAIDataProvider from '../../providers/PlayAI/PlayAIDataProvider'
import { PlayAIErrorContextProvider } from '../../providers/PlayAI/PlayAIErrorProvider'

import Alert from '../atoms/Alert/Alert'
import { BackToHomeLink } from '../atoms/Button'
import ContentContainer from '../atoms/ContentContainer'
import PageHeader from '../molecules/PageHeader'
import DownloadMetamask from '../organisms/DownloadMetamask'

export interface PlayAIProps {
  children: ReactNode
  title: string
  guidelines: string
  comingSoon?: boolean
  description?: string
  noPageHeader?: boolean
  headerCenter?: boolean
}

export default function PlayAI({
    children,
    title,
    comingSoon,
    guidelines,
    description,
    noPageHeader,
    headerCenter
  }: PlayAIProps): ReactElement {
    
    const { notLoggedInError } = useAuthContext()

    return (
        <>
          <BackToHomeLink />
          
          {title && !noPageHeader && (
            <PageHeader
              title={title}
              description={description}
              center={headerCenter}
            />
          )}
          
          {(notLoggedInError && notLoggedInError !== `Please accept DataUnion's Guidelines.`) && (
            <DownloadMetamask 
                errorText={notLoggedInError}
            />
          )}

          {comingSoon ? (
            <Alert text="COMING SOON" state="guidelinesWarning" />
          ) : (!notLoggedInError || notLoggedInError === `Please accept DataUnion's Guidelines.`) && (
            <PlayAIErrorContextProvider>
              <PlayAIDataProvider>
                <ContentContainer
                  children={children}
                />
              </PlayAIDataProvider>
            </PlayAIErrorContextProvider>
          )}
        </>
      )
}