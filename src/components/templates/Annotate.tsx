import React, { ReactElement, ReactNode } from 'react'

import AnnotationDataProvider from '../../providers/Annotation/AnnotationDataProvider'
import AnnotationErrorContextProvider from '../../providers/Annotation/AnnotationErrorProvider'
import { useAuthContext } from '../../providers/AuthProvider'
import Alert from '../atoms/Alert/Alert'
import { BackToHomeLink } from '../atoms/Button'
import ContentContainer from '../atoms/ContentContainer'
import PageHeader from '../molecules/PageHeader'
import DownloadMetamask from '../organisms/DownloadMetamask'

export interface AnnotateProps {
  children: ReactNode
  title: string
  guidelines: string
  comingSoon?: boolean
  description?: string
  noPageHeader?: boolean
  headerCenter?: boolean
}

export default function Annotate({
    children,
    title,
    comingSoon,
    guidelines,
    description,
    noPageHeader,
    headerCenter
  }: AnnotateProps): ReactElement {
    
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

          {/* <Collapser 
            title={"Read & Accept the Annotation Guidelines"}
          />

          <Collapser 
            title={"View Annotation Tutorials"}
            color={"rgb(0, 72, 186)"}
          /> */}

          {(notLoggedInError && notLoggedInError !== `Please accept DataUnion's Guidelines.`) && (
            <DownloadMetamask 
                errorText={notLoggedInError}
            />
          )}
          
          {comingSoon ? (
            <Alert text="COMING SOON" state="guidelinesWarning" />
          ) : (!notLoggedInError || notLoggedInError === `Please accept DataUnion's Guidelines.`) && (
            <AnnotationErrorContextProvider>
              <AnnotationDataProvider>
                <ContentContainer
                  children={children}
                />
              </AnnotationDataProvider>
            </AnnotationErrorContextProvider>
          )}
        </>
      )
}