import React, { ReactElement, ReactNode } from 'react'

import { metamaskVideo } from '../../@types/constants'
import { useAuthContext } from '../../providers/AuthProvider'
import VerificationDataContextProvider from '../../providers/Verify/VerificationDataProvider'
import VerificationErrorContextProvider from '../../providers/Verify/VerificationErrorProvider'
import Alert from '../atoms/Alert/Alert'
import { BackToHomeLink } from '../atoms/Button'
import ContentContainer from '../atoms/ContentContainer'
import { AcceptGuidelinesCollapser } from '../molecules/AcceptGuidelinesCollapser'
import PageHeader from '../molecules/PageHeader'
import { TutorialVideo, VideoData } from '../molecules/TutorialVideo'
import DownloadMetamask from '../organisms/DownloadMetamask'

export interface VerifyProps {
  children: ReactNode
  title: string
  guidelines: string
  underConstruction?: boolean
  description?: string
  noPageHeader?: boolean
}

export default function Verify({
  children,
  title,
  underConstruction,
  description,
  noPageHeader
}: VerifyProps): ReactElement {
    
  const { notLoggedInError } = useAuthContext()
  const videos: VideoData[] = [metamaskVideo
    // {
    //   title: `How to View QUICRA-0 in Metamask & Ocean Marketplace`,
    //   description: `At the end of each DataUnion challenge, QUICRA-0 will be distributed to the wallet addresses that contributed. This video shows you how to keep up with the QUICRA-0 in your wallet.`,
    //   embedId: ``
    // }
  ]

  return (
      <>
        <BackToHomeLink />
        
        {title && !noPageHeader && (
          <PageHeader
            title={title}
            description={description}
          />
        )}

        {/* <Collapser 
          title={"Read & Accept the Verification Guidelines"}
        /> */}
        
        {underConstruction && (
          <Alert 
            text="UNDER CONSTRUCTION. Developers are currently fixing and optimising this feature. Please come back tomorrow. Thank you for your patience." 
            state="guidelinesWarning" 
          />
        )}

        {(notLoggedInError && notLoggedInError !== `Please accept DataUnion's Guidelines.`) && (
          <DownloadMetamask 
            errorText={notLoggedInError}
          />
        )}

        {(!notLoggedInError || notLoggedInError === `Please accept DataUnion's Guidelines.`) && !underConstruction && (
          <VerificationErrorContextProvider>
            <VerificationDataContextProvider> 
              
              <ContentContainer 
                children={children}
              />

            </VerificationDataContextProvider>
          </VerificationErrorContextProvider>
        )}
      </>
    )
}