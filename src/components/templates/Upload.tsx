import React, { ReactElement, ReactNode } from 'react'

import { useAuthContext } from '../../providers/AuthProvider'
import { BatchUploadDataContextProvider } from '../../providers/PhotoUpload/BatchUpload/BatchUploadDataProvider'
import { BatchUploadErrorContextProvider } from '../../providers/PhotoUpload/BatchUpload/BatchUploadErrorProvider'
import { BatchUploadContextProvider } from '../../providers/PhotoUpload/BatchUpload/BatchUploadProvider'
import { PhotoUploadErrorContextProvider } from '../../providers/PhotoUpload/SingleImageUpload/PhotoUploadErrorProvider'
import { PhotoUploadContextProvider } from '../../providers/PhotoUpload/SingleImageUpload/PhotoUploadProvider'
import { BackToHomeLink, Button } from '../atoms/Button'
import ContentContainer from '../atoms/ContentContainer'
import { AcceptGuidelinesCollapser } from '../molecules/AcceptGuidelinesCollapser'
import PageHeader from '../molecules/PageHeader'
import DownloadMetamask from '../organisms/DownloadMetamask'

export interface UploadProps {
  children: ReactNode
  title: string
  guidelines: string
  description?: string
  noPageHeader?: boolean
  headerCenter?: boolean
}

export default function Upload({
  children,
  title,
  description,
  noPageHeader,
  headerCenter}: UploadProps): ReactElement {

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
        
        {/* <a href={guidelines}>Read the Upload Guidelines in More Detail</a> */}

        {notLoggedInError && notLoggedInError !== `Please accept DataUnion's Guidelines.` && (
          <DownloadMetamask 
            errorText={notLoggedInError}
          />
        )}

        {(notLoggedInError === `Please accept DataUnion's Guidelines.` || !notLoggedInError) && (
          <>
          <BatchUploadErrorContextProvider>
            {/* <BatchUploadDataContextProvider>
              <BatchUploadContextProvider> */}
                <PhotoUploadErrorContextProvider>
                  <PhotoUploadContextProvider>
                    
                    <AcceptGuidelinesCollapser />
                    
                    <ContentContainer
                      children={children}
                    />

                  </PhotoUploadContextProvider>
                </PhotoUploadErrorContextProvider>
              {/* </BatchUploadContextProvider>
            </BatchUploadDataContextProvider> */}
          </BatchUploadErrorContextProvider>
          </>
        )}
      </>
    )
}
