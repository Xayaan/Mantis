import React, { createContext, ReactElement, ReactNode, useContext, useState } from 'react'

interface ErrorContextValue {
  loadingBatch: boolean
  verifyingImage: boolean
  reportingImage: boolean
  noMoreData: boolean
  ended: boolean
  
  setLoadingBatch: (loadingBatch: boolean) => void
  setVerifyingImage: (status: boolean) => void
  setReportingImage: (status: boolean) => void

  setNoMoreData: (status: boolean) => void
  setEnded: (status: boolean) => void
}

const defaultState: ErrorContextValue = {
  loadingBatch: false,
  verifyingImage: false,
  reportingImage: false,
  noMoreData: false,
  ended: false,

  setLoadingBatch: (loadingBatch: boolean) => {},
  setVerifyingImage: (status: boolean) => {},
  setReportingImage: (status: boolean) => {},

  setNoMoreData: (status: boolean) => {},
  setEnded: (status: boolean) => {},
}

const VerificationErrorContext = createContext(defaultState)

function VerificationErrorContextProvider({children}: {children: ReactNode}): ReactElement {
  const [loadingBatch, setLoadingBatch] = useState<boolean>()
  const [verifyingImage, setVerifyingImage] = useState<boolean>(false)
  const [reportingImage, setReportingImage] = useState<boolean>(false)

  const [noMoreData, setNoMoreData] = useState<boolean>(false)
  const [ended, setEnded] = useState<boolean>(false)

  const SetLoadingBatch = (status: boolean) => {
    setLoadingBatch(status)
  }

  const SetVerifyingImage = (status: boolean) => {
    setVerifyingImage(status)
  }

  const SetReportingImage = (status: boolean) => {
    setReportingImage(status)
  }

  const SetNoMoreData = (status: boolean) => {
    setNoMoreData(status)
  }

  const SetEnded = (status: boolean) => {
    setEnded(status)
  }

  return (
    <VerificationErrorContext.Provider value={{
        loadingBatch: loadingBatch,
        verifyingImage: verifyingImage,
        reportingImage: reportingImage,
        noMoreData: noMoreData,
        ended: ended,

        setLoadingBatch: SetLoadingBatch,
        setVerifyingImage: SetVerifyingImage,
        setReportingImage: SetReportingImage,

        setNoMoreData: SetNoMoreData,
        setEnded: SetEnded,
      }}>
        {children}
      </VerificationErrorContext.Provider>
    )
  }


const useVerificationErrorContext = (): ErrorContextValue =>
  useContext(VerificationErrorContext)

export { VerificationErrorContextProvider, useVerificationErrorContext, ErrorContextValue }
export default VerificationErrorContextProvider