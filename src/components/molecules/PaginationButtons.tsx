import React, { useEffect, useRef, useState } from 'react'

import { useTagPaginationContext } from '../../providers/PaginationBridge'
import { LeftArrowButton, PaginationNumberButton, RightArrowButton } from '../atoms/Button'
import styles from './PaginationButtons.module.css'

type PaginationButtonProps = {
    nextPage: () => void
    prevPage: () => void
    goToPage?: (pageNo: number) => void
    goToPagePopup?: () => void
    numberOfPages: number
    currentPage?: number
}

export const PaginationButtons = ({
    nextPage, 
    prevPage, 
    goToPagePopup,
    numberOfPages,
    currentPage
}: PaginationButtonProps) => {    

    const [leftPageOptions, setLeftPageOptions] = useState<number[]>()
    const [rightPageOptions, setRightPageOptions] = useState<number[]>()
    

    const {
        currentTagChartPage
    } = useTagPaginationContext()


    const componentIsMounted = useRef(true)
    useEffect(() => {
        return () => {
            componentIsMounted.current = false
        }
    }, [])


    useEffect(() => {
        if (numberOfPages && currentTagChartPage) {
            if (numberOfPages > 3) {
                if (currentTagChartPage === 1) {
                    const newLeftPageOptions: number[] = []
                    const newRightPageOptions = [numberOfPages - 1, numberOfPages]
                    setLeftPageOptions(newLeftPageOptions)
                    setRightPageOptions(newRightPageOptions)
                } else if (currentTagChartPage === 2) {
                    const newLeftPageOptions = [currentTagChartPage - 1]                                    // reverse order for leftPageOptions
                    const newRightPageOptions = [numberOfPages - 1, numberOfPages]
                    setLeftPageOptions(newLeftPageOptions)
                    setRightPageOptions(newRightPageOptions)
                } else if (currentTagChartPage === numberOfPages - 2) {
                    const newLeftPageOptions = [currentTagChartPage - 2, currentTagChartPage - 1]           // reverse order for leftPageOptions
                    const newRightPageOptions = [numberOfPages - 1, numberOfPages]
                    setLeftPageOptions(newLeftPageOptions)
                    setRightPageOptions(newRightPageOptions)
                } else if (currentTagChartPage === numberOfPages - 1) {
                    const newLeftPageOptions = [currentTagChartPage - 2, currentTagChartPage - 1]           // reverse order for leftPageOptions
                    const newRightPageOptions = [numberOfPages]
                    setLeftPageOptions(newLeftPageOptions)
                    setRightPageOptions(newRightPageOptions)
                } else if (currentTagChartPage === numberOfPages) {
                    const newLeftPageOptions = [currentTagChartPage - 2, currentTagChartPage - 1]           // reverse order for leftPageOptions
                    const newRightPageOptions: number[] = []
                    setLeftPageOptions(newLeftPageOptions)
                    setRightPageOptions(newRightPageOptions)
                } else {
                    const newLeftPageOptions = [currentTagChartPage - 2, currentTagChartPage - 1]           // reverse order for leftPageOptions
                    const newRightPageOptions = [numberOfPages - 2, numberOfPages - 1]
                    setLeftPageOptions(newLeftPageOptions)
                    setRightPageOptions(newRightPageOptions)
                }
            }
        }
    }, [numberOfPages, currentTagChartPage])


    const goToPage = (pageNo: number) => {

    }


    return (
        <>
            <div className={styles.paginationRow}>
                {/* <div className={styles.selectChartsPerPage}>
                
                </div>  */}

                {currentTagChartPage > 1 && (
                    <LeftArrowButton onClick={prevPage}/>
                )}
                
                {currentTagChartPage === 1 && (
                    <>
                        <PaginationNumberButton 
                            text={"1"}
                            onClick={goToPage(1)}
                            current={true}
                        />
                        <PaginationNumberButton 
                            text={"..."}
                            onClick={goToPagePopup()}
                        />
                    </>
                )}

                {currentTagChartPage !== 1 && currentTagChartPage !== numberOfPages && (
                    <PaginationNumberButton 
                        text={currentTagChartPage.toString()}
                        onClick={goToPage(currentTagChartPage)}
                        current={true}
                    />
                )}

                {currentTagChartPage === numberOfPages && numberOfPages !== 1 && (
                    <>
                        <PaginationNumberButton 
                            text={"..."}
                            onClick={goToPagePopup()}
                        />
                        <PaginationNumberButton 
                            text={`${numberOfPages}`}
                            onClick={goToPage(numberOfPages)}
                            current={true}
                        />
                    </>
                )}

                {currentTagChartPage < numberOfPages && numberOfPages !== 1 && (
                    <RightArrowButton onClick={nextPage}/>
                )}
        </div>
        </>
    )
}