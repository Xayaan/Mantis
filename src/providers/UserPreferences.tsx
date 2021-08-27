import { useOcean } from '@oceanprotocol/react'
import React, { createContext, ReactElement, ReactNode, useContext, useEffect, useState } from 'react'
import useDarkMode from 'use-dark-mode'
import { darkModeConfig } from '../../app.config'

// TODO
// Prepare UserPreferences file 

interface UserPreferencesValue {
  debug: boolean
  currency: string
  locale: string
  bookmarks: {
    [network: string]: string[]
  }
  currentFontColor?: "black" | "white"             // here for chartjs parameter
  setDebug: (value: boolean) => void
  setCurrency: (value: string) => void
//   addBookmark: (did: string) => void
//   removeBookmark: (did: string) => void
}

const defaultState: UserPreferencesValue = {
  debug: false,
  currency: 'EUR',
  locale: 'EU',
  bookmarks: {},
  currentFontColor: undefined,                      // here for chartjs parameter.
  setDebug: (value: boolean) => {},
  setCurrency: (value: string) => {},
//   addBookmark: (did: string) => {},
//   removeBookmark: (did: string) => {}
}

const UserPreferencesContext = createContext(defaultState)

const localStorageKey = 'ocean-user-preferences'

function getLocalStorage(): UserPreferencesValue {
  const storageParsed =
    typeof window !== 'undefined' &&
    JSON.parse(window.localStorage.getItem(localStorageKey))
  return storageParsed
}

function setLocalStorage(values: Partial<UserPreferencesValue>) {
  return (
    typeof window !== 'undefined' &&
    window.localStorage.setItem(localStorageKey, JSON.stringify(values))
  )
}

function UserPreferencesProvider({
  children
}: {
  children: ReactNode
}): ReactElement {
  const { config } = useOcean()
//   const networkName = (config as ConfigHelperConfig).network
  const localStorage = getLocalStorage()

  const [debug, setDebug] = useState<boolean>(localStorage?.debug || false)
  const [currency, setCurrency] = useState<string>(localStorage?.currency || 'EUR')
  const [locale, setLocale] = useState<string>()
  const [bookmarks, setBookmarks] = useState(localStorage?.bookmarks || {})
  const [currentFontColor, setCurrentFontColor] = useState<"black" | "white">()

  const darkMode = useDarkMode(false, darkModeConfig)

  useEffect(() => {
    if (darkMode) {
      if (darkMode.value !== undefined) {
        if (darkMode.value === true) {
          setCurrentFontColor("white")
        } else if (darkMode.value == false) {
          setCurrentFontColor("black")
        }
      }
    }
    
  }, [JSON.stringify(darkMode)])

  useEffect(() => {
    setLocalStorage({ debug, currency, bookmarks })
  }, [debug, currency, bookmarks])

  // Set ocean.js log levels, default: Error
  // useEffect(() => {
  //   debug === false
  //     ? Logger.setLevel(LogLevel.None)
  //     : Logger.setLevel(LogLevel.None)
  // }, [debug])

  // Get locale always from user's browser
  useEffect(() => {
    if (!window) return
    setLocale(window.navigator.language)
  }, [])

//   function addBookmark(didToAdd: string): void {
//     const newPinned = {
//       ...bookmarks,
//       [networkName]: [didToAdd].concat(bookmarks[networkName])
//     }
//     setBookmarks(newPinned)
//   }

//   function removeBookmark(didToAdd: string): void {
//     const newPinned = {
//       ...bookmarks,
//       [networkName]: bookmarks[networkName].filter(
//         (did: string) => did !== didToAdd
//       )
//     }
//     setBookmarks(newPinned)
//   }

  // Bookmarks old data structure migration
  useEffect(() => {
    if (!bookmarks.length) return
    const newPinned = { mainnet: bookmarks as any }
    setBookmarks(newPinned)
  }, [bookmarks])

  return (
    <UserPreferencesContext.Provider
      value={
        {
          debug,
          currency,
          locale,
          bookmarks,
          currentFontColor,
          setDebug,
          setCurrency,
        //   addBookmark,
        //   removeBookmark
        } as UserPreferencesValue
      }
    >
      {children}
    </UserPreferencesContext.Provider>
  )
}

// Helper hook to access the provider values
const useUserPreferences = (): UserPreferencesValue =>
  useContext(UserPreferencesContext)

export { UserPreferencesProvider, useUserPreferences, UserPreferencesValue }
export default UserPreferencesProvider