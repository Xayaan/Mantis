import { Tokens } from '../@types/MetaData'
import React, { createContext, ReactElement, ReactNode, useContext, useEffect, useRef, useState } from 'react'

import { GetTokens, RefreshTokens, RegisterTokens } from '../api/auth'
import { GetAcceptedStatus, PostAcceptedStatus } from '../api/hasAcceptedTerms'
import { useWeb3 } from './Web3'

interface AuthContextValue {
    accessToken: string
    changingAccessToken: boolean
    refreshToken: string
    acceptedUpload: boolean
    acceptedUploadInitWaiting: boolean
    notLoggedInError: string
    needToRefreshTokenError: boolean
    executingRefresh: boolean

    setAcceptedUpload: (status: boolean, post: boolean) => void
    setNeedToRefreshTokenError: (status: boolean) => void
}

const defaultState: AuthContextValue = {
    accessToken: "",
    changingAccessToken: false,
    refreshToken: "",
    acceptedUpload: false,
    acceptedUploadInitWaiting: true,
    notLoggedInError: "",
    needToRefreshTokenError: false,
    executingRefresh: false,

    setAcceptedUpload: (status: boolean, post: boolean) => {},
    setNeedToRefreshTokenError: (status: boolean) => {}
}

const AuthContext = createContext(defaultState)

function getCookieStorage(): any {
    if (typeof document !== 'undefined') {
        const cookies = document.cookie.split(';')
        .map(cookie => cookie.split('='))
        .reduce((accumulator, [key, value]) => 
            ({...accumulator, [key.trim()]: decodeURIComponent(value)}), {})
    
        return cookies
    }
}
  
function setCookieStorage(values: Partial<AuthContextValue>) {
    if (typeof document !== 'undefined') {
        document.cookie = `jwtAccess=${values.accessToken}`
        document.cookie = `jwtRefresh=${values.refreshToken}`
        document.cookie = `acceptedUpload=${values.acceptedUpload}`
    }
}


function AuthContextProvider({children}: {children: ReactNode}): ReactElement {
    const { accountId, networkId } = useWeb3()
    const cookieStorage = getCookieStorage()

    // control signals 
    const [didRefresh, setDidRefresh] = useState(true)
    const [changingAccessToken, setChangingAccessToken] = useState(false)
    const [executingRefresh, setExecutingRefresh] = useState<boolean>()
    const [acceptedUploadInitWaiting, setAcceptedUploadInitWaiting] = useState(true)
    const [needToRefreshTokenError, setNeedToRefreshTokenError] = useState<boolean>(false)
    
    // access tokens
    const [accessToken, setAccessToken] = useState<string>(cookieStorage?.jwtAccess || '')
    const [refreshToken, setRefreshToken] = useState<string>(cookieStorage?.jwtRefresh || '')
    const [acceptedUpload, setAcceptedUpload] = useState<boolean>(cookieStorage?.acceptedUpload || false)
    
    const [notLoggedInError, setNotLoggedInError] = useState<string>()

    const changeAccessToken = (new_token: string) => {
        setChangingAccessToken(true)
        setAccessToken(new_token)
    }
    
    const changeRefreshToken = (new_token: string) => {
        setRefreshToken(new_token)
    }

    // TS
    // useEffect(() => {
    //     console.log(`=== ACCOUNTID CHANGED ===`)
    //     console.log(accountId)
    // }, [accountId])

    // useEffect(() => {
    //     console.log(`=== DIDREFRESH CHANGED ===`)
    //     console.log(didRefresh)
    // }, [didRefresh])

    // useEffect(() => {
    //     console.log(`=== EXECUTINGREFRESH CHANGED ===`)
    //     console.log(executingRefresh)
    // }, [executingRefresh])
    
    useEffect(() => {
        if (!accessToken) {
            // ts
            // console.log(`=== ACCESS TOKEN IS BLANK ===`)
            // console.log(`accessToken = ${accessToken}`)
        } else if (accessToken && changingAccessToken) {
            // console.log(`=== ACCESS TOKEN IS NO LONGER BLANK ===`)
            setChangingAccessToken(false)
        }
    }, [accessToken])

    const SetAcceptedUpload = (status: boolean, post: boolean) => {
        setAcceptedUpload(status)
        if (post) {
            const text = status ? 'ACCEPTED' : 'REJECTED'
            status && PostAcceptedStatus(accessToken, text).then(data => {
                // console.log(`=============== [AuthProvider.tsx] POST ACCEPTED STATUS RESPONSE ============`)
                // console.log(data)
            })
        }
    }

    const componentIsMounted = useRef(true)
    useEffect(() => {
        return () => {
            componentIsMounted.current = false
        }
    }, [])


    const sign = () => {
        // console.log(`cookieStorageLoaded = ${cookieStorageLoaded}`)
            // GETTING TOKENS FOR FIRST TIME
            GetTokens(accountId).then(({accessToken, refreshToken}: Tokens) => {
                setCookieStorage({ accessToken, refreshToken })

                changeAccessToken(accessToken)
                changeRefreshToken(refreshToken)

            }).catch((err) => {
                // console.log(`[AuthProvider.ts] GetTokens ERROR = ${err}. Trying to Register...`)
                console.log(`Registering...`)
                RegisterTokens(accountId).then(({accessToken, refreshToken}: Tokens) => {
                    setCookieStorage({ accessToken, refreshToken })

                    changeAccessToken(accessToken)
                    changeRefreshToken(refreshToken)
                }).catch((err) => {
                    console.log(`[AuthProvider.ts] RegisterTokens ERROR = ${err}. Contact support.`)
                })
            })
    }

    const queueRefresh = () => {
        // REFRESHING TOKENS
        // console.log(`REFRESHING... in 10 secs`)
        const thisRefreshToken = refreshToken
        if (thisRefreshToken && thisRefreshToken !== undefined) {
            setTimeout(() => { 
                RefreshTokens(thisRefreshToken).then(jsonResult => {
                    const newAccessToken = jsonResult["access_token"]
                    // const newRefreshToken = jsonResult["refresh_token"]
                    
                    changeAccessToken(newAccessToken)
                    // changeRefreshToken(newRefreshToken)
                })
                    
            }, 900000); 
        }
    }


    const executeRefresh = () => {
        setExecutingRefresh(true)
        const thisRefreshToken = refreshToken
        if (thisRefreshToken && thisRefreshToken !== undefined) {
            RefreshTokens(thisRefreshToken).then(jsonResult => {
                const newAccessToken = jsonResult["access_token"]
                changeAccessToken(newAccessToken)

                // set control signals
                setExecutingRefresh(false)
                setNeedToRefreshTokenError(false)
            })
        }
    }


    // GENERATING TOKENS
    useEffect(() => {
        if (componentIsMounted && !accessToken && !refreshToken && accountId) {
            sign()
            queueRefresh()
        }

        if (componentIsMounted && accountId && accessToken && refreshToken) {
            queueRefresh()
        }
    }, [didRefresh, accountId, accessToken, refreshToken])


    useEffect(() => {
        // console.log(`DIDREFRESH CHANGED ==> Page refreshed`)
        if (didRefresh) {
            executeRefresh()
        }
    }, [didRefresh])

    useEffect(() => {
        if (needToRefreshTokenError) {
            executeRefresh()
        }
    }, [needToRefreshTokenError])


    // INITIALIZING ACCEPTED UPLOAD
    useEffect(() => {
        if (acceptedUploadInitWaiting && accessToken) {
            setAcceptedUploadInitWaiting(false)
            GetAcceptedStatus(accessToken).then(response => {
                // ts
                // console.log(`=============== [AuthProvider.tsx] GET ACCEPTED STATUS RESPONSE ============`)
                // console.log(response)
                if (response.data.usage_flag === 'ACCEPTED') {
                    setAcceptedUpload(true)
                } else if (response.data.usage_flag === 'REJECTED') {
                    setAcceptedUpload(false)
                }
            })
        }
    }, [acceptedUploadInitWaiting, accessToken])

    // ERROR SETTING
    useEffect(() => {
        if (componentIsMounted) {
            if (!accountId) {
                setNotLoggedInError(`NO ACCOUNT CONNECTED - To begin using Mantis, please download the Metamask extension.\n\nVisit https://metamask.io/ to download Metamask. Watch the video below for extra assistance.`)
            }
            // else if (networkId != 4 && networkId != 1) {
            //  setError(`Incorrect network connection.\nPlease connect your wallet to the Rinkeby Test Network or Ethereum Mainnet to begin curating data.`);
            // } 
            else if (accountId && !changingAccessToken && !accessToken) {
                setNotLoggedInError(`Your signature is needed. A new window should pop up. If you aren't getting a sign notification, refresh the page.`)
            } else if (accountId && accessToken && !acceptedUpload) {
                setNotLoggedInError(`Please accept DataUnion's Guidelines.`)
            }
            else { 
                setNotLoggedInError(``)
            }
        }
    }, [accountId, accessToken, acceptedUpload])

    const SetNeedToRefreshTokenError = (status: boolean) => {
        setNeedToRefreshTokenError(status)
    }

    return (
        <AuthContext.Provider value={{
            accessToken: accessToken, 
            changingAccessToken: changingAccessToken,
            refreshToken: refreshToken,
            acceptedUpload: acceptedUpload,
            acceptedUploadInitWaiting: acceptedUploadInitWaiting,
            notLoggedInError: notLoggedInError,

            needToRefreshTokenError: needToRefreshTokenError,
            executingRefresh: executingRefresh,

            setAcceptedUpload: SetAcceptedUpload,
            setNeedToRefreshTokenError: SetNeedToRefreshTokenError,
            // clearAuth: ClearAuth
        }}>
            {children}    
        </AuthContext.Provider>
    )
}

// Helper hook to access the provider values
const useAuthContext = (): AuthContextValue =>
  useContext(AuthContext)

export { AuthContextProvider, useAuthContext, AuthContextValue }
export default AuthContextProvider