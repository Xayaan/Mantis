import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'

interface PlayAIErrorContextValue {}

const defaultState: PlayAIErrorContextValue = {}

const PlayAIErrorContext = createContext(defaultState)
const sessionStorageKey = "mantis-annotation"


function PlayAIErrorContextProvider( {children} : {children: ReactNode} ) {

    return (
        <PlayAIErrorContext.Provider value={{}}>
            {children}
        </PlayAIErrorContext.Provider>
    )
}

const usePlayAIErrorContext = (): PlayAIErrorContextValue =>
  useContext(PlayAIErrorContext)

export { PlayAIErrorContextProvider, usePlayAIErrorContext, PlayAIErrorContextValue }
export default PlayAIErrorContextProvider