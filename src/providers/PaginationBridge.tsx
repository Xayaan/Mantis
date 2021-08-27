import React, { createContext, ReactElement, ReactNode, useContext, useState } from 'react'

interface PaginationContextValue {
    currentTagChartPage: number
    setCurrentTagChartPage: (pageNo: number) => void
    numberOfPages: number
    setNumberOfTagChartPages: (numberOfPages: number) => void
}

const defaultState: PaginationContextValue = {
    currentTagChartPage: 1,
    setCurrentTagChartPage: (pageNo: number) => {},
    numberOfPages: undefined,
    setNumberOfTagChartPages: (numberOfPages: number) => {}
}

const TagPaginationContext = createContext(defaultState)

function TagPaginationProvider({children}: {children: ReactNode}): ReactElement {

    const [currentTagChartPage, setCurrentTagChartPage ] = useState<number>()
    const [numberOfPages, setNumberOfPages] = useState<number>()

    const SetCurrentTagChartPage = (pageNo: number) => {
        setCurrentTagChartPage(pageNo)
    }

    const SetNumberOfTagChartPages = (numberOfPages: number) => {
        setNumberOfPages(numberOfPages)
    }

    // ts
    // console.log(`[PaginationBridge.tsx] currentTagChartPage = ${currentTagChartPage}`)
    // console.log(`[PaginationBridge.tsx] numberOfPages = ${numberOfPages}`)

    return (
        <TagPaginationContext.Provider value={{
            currentTagChartPage: currentTagChartPage,
            setCurrentTagChartPage: SetCurrentTagChartPage,
            numberOfPages: numberOfPages,
            setNumberOfTagChartPages: SetNumberOfTagChartPages
        }}>
            {children}    
        </TagPaginationContext.Provider>
    )
}

// Helper hook to access the provider values
const useTagPaginationContext = (): PaginationContextValue =>
  useContext(TagPaginationContext)

export { TagPaginationProvider, useTagPaginationContext, PaginationContextValue }
export default TagPaginationProvider