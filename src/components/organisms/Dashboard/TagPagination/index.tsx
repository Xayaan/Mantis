import React, { useEffect, useRef, useState } from 'react'

import { useDashboardStatsContext } from '../../../../providers/Dashboard/DashboardStatsProvider';
import { useTagPaginationContext } from '../../../../providers/PaginationBridge';
import Alert from '../../../atoms/Alert/Alert';
import Search from '../../../atoms/InputText/Search';
import Loader from '../../../atoms/Loader';
import { PaginationButtons } from '../../../molecules/PaginationButtons';
import TagChart from './TagChart';
import styles from './TagPagination.module.css'

export const TagPagination = () => {

    const defaultPostsPerPage = 30
    const [didRefresh, setDidRefresh] = useState<boolean>(false)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [postsPerPage, setPostsPerPage] = useState<number>(defaultPostsPerPage)
    const [numberOfPages, setNumberOfPages] = useState<number>()
    const [showLoading, setShowLoading] = useState<boolean>(true)

    const { 
        cumulativeChartStats, 
        tagStatistics, 
        timeState,
        setTimeState 
    } = useDashboardStatsContext()

    const { setCurrentTagChartPage } = useTagPaginationContext()
    const [filteredTagStatistics, setFilteredTagStatistics] = useState<string[]>(tagStatistics !== undefined ? Object.keys(tagStatistics.data.result) : undefined)

    // SETTERS
    const SetPostsPerPage = (postsPerPage: number) => {
        setPostsPerPage(postsPerPage)
    }
    
    const SetNumberOfPages = (numberOfPages: number) => {
        setNumberOfPages(numberOfPages)
    }

    const SetFilteredTagStatistics = (filteredTagStats: string[]) => {
        setFilteredTagStatistics(filteredTagStats)
    }

    const SetShowLoading = (status: boolean) => {
        setShowLoading(status)
    }


    useEffect(() => {
        // ts
        // console.log(`=== filteredTagStatistics ===\nfilteredTagStatistics = `)
        // console.log(filteredTagStatistics)

        if (filteredTagStatistics && numberOfPages != 0) {
            SetShowLoading(false)
        }
    }, [filteredTagStatistics, numberOfPages])


    // if tagStatistics changes, filteredTagStatistics needs to be updated.
    useEffect(() => {
        if (tagStatistics) {
            // ts
            // console.log(`=== TagPagination ===\ntagStatistics = `)
            // console.log(tagStatistics)            
            // console.log(`==== OBJECT.KEYS ====`)
            // console.log(Object.keys(tagStatistics.data.result))
            
            SetFilteredTagStatistics(Object.keys(tagStatistics.data.result))
        }
    }, [tagStatistics])


    const componentIsMounted = useRef(true)
    useEffect(() => {
        return () => {
            componentIsMounted.current = false
        }
    }, [])


    useEffect(() => {
        // console.log(`filteredTagStatistics changed.`)
        if (filteredTagStatistics && postsPerPage) {
            const calcNumberOfPages = Math.ceil(filteredTagStatistics.length / postsPerPage)
            SetNumberOfPages(calcNumberOfPages)                          // local
        }
    }, [tagStatistics])


    useEffect(() => {
        if (filteredTagStatistics && postsPerPage) {
            const calcNumberOfPages = Math.ceil(filteredTagStatistics.length / postsPerPage)
            SetNumberOfPages(calcNumberOfPages)                          // local
        }
    }, [filteredTagStatistics, postsPerPage])


    useEffect(() => {
        setCurrentTagChartPage(currentPage)
    }, [currentPage])


    /* going to next page */
    const prevPage = () => {
        if (componentIsMounted && numberOfPages) {
            setCurrentPage(currentPage === 1 ? 1 : currentPage - 1)
        }
        setCurrentTagChartPage(currentPage)
    }
    
    const nextPage = () => {
        if (componentIsMounted && numberOfPages) {
            setCurrentPage(currentPage === numberOfPages ? numberOfPages : currentPage + 1)
        }
        setCurrentTagChartPage(currentPage === numberOfPages ? numberOfPages : currentPage + 1)
    }

    // TODO
    // Write this
    const goToPagePopup = () => {

    }

    const searchFilter = (filter_text: string) => {
        setCurrentTagChartPage(1)   // global
        setCurrentPage(1)           // local

        if (tagStatistics) {
            const filteredItems = filter_text === '' ? Object.keys(tagStatistics.data.result) : Object.keys(tagStatistics.data.result).filter(
                item => item.slice(0, filter_text.length).toLocaleLowerCase().includes(filter_text)
            )

            if (filteredItems.length < postsPerPage) {
                SetPostsPerPage(filteredItems.length)
            } else if (postsPerPage < defaultPostsPerPage) {
                SetPostsPerPage(defaultPostsPerPage)
            }

            SetFilteredTagStatistics(filteredItems)
        }
    }

    return (
        <>
        {!showLoading ? (
            <>
            {filteredTagStatistics && numberOfPages != 0 ? (
               <>
               <h1>Tags</h1>

                <Search 
                    name="tag"
                    placeholder="Search for a tag..."
                    size="small"
                    searchFilter={searchFilter}
                />
     
                {componentIsMounted && currentPage && numberOfPages && (
                    <PaginationButtons 
                        prevPage={prevPage}
                        nextPage={nextPage}
                        goToPagePopup={goToPagePopup}
                        numberOfPages={numberOfPages}
                    />
                )}

                <div className={styles.PaginationContainer}>
                    {componentIsMounted && filteredTagStatistics && cumulativeChartStats && (
                        <>
                        {/* {console.log(`FILTEREDTAGSTATISTICS = ${filteredTagStatistics}`)}
                        {console.log(filteredTagStatistics)}
                        {console.log(filteredTagStatistics.slice(1))} */}
                        {filteredTagStatistics.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage)
                            .map((tag: any, i: number) => {
                                return (
                                    <div key={tag} className={styles.firstContainer}>
                                        <TagChart 
                                            chartKey={tag + i.toString()}
                                            tagMetadata={tagStatistics.data.result[tag]}
                                            tagName={tag}
                                        />
                                    </div>
                                )
                            }
                        )}
                        </>
                    )}
                </div>
    
                {/* {console.log(`CURRENT PAGE = ${currentPage}`)}
                {console.log(`NUMBER OF PAGES = ${numberOfPages}`)} */}
                {componentIsMounted && currentPage && numberOfPages && (
                    <PaginationButtons 
                        prevPage={prevPage}
                        nextPage={nextPage}
                        goToPagePopup={goToPagePopup}
                        numberOfPages={numberOfPages}
                    />
                )}
                </>
            ): (
                <>
                <h1>Tags</h1>

                <Search 
                    name="tag"
                    placeholder="Search for a tag..."
                    size="small"
                    searchFilter={searchFilter}
                />

                <div className={styles.alertPadding}>
                    <Alert text={"Be the first to add this tag!"} state="guidelinesWarning"/>
                </div>
                </>
            )} 
            </>
        ) : (
            <Loader message="Loading Tag Charts..."/>
        )}
        </>
    )
}