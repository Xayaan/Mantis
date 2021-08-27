import React, { createContext, ReactNode, useContext } from 'react'

interface PlayAIDataContextValue {}

const defaultState: PlayAIDataContextValue = {}

const PlayAIDataContext = createContext(defaultState)
const sessionStorageKey = "mantis-annotation"


function PlayAIDataContextProvider( {children} : {children: ReactNode} ) {

    return (
        <PlayAIDataContext.Provider value={{}}>
            {children}
        </PlayAIDataContext.Provider>
    )
}

const usePlayAIDataContext = (): PlayAIDataContextValue =>
  useContext(PlayAIDataContext)

export { PlayAIDataContextProvider, usePlayAIDataContext, PlayAIDataContextValue }
export default PlayAIDataContextProvider

