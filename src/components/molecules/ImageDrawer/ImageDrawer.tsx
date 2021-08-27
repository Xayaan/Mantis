import React, { KeyboardEvent, ReactElement, useEffect, useState } from 'react'
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa'

import { useBatchUploadDataContext } from '../../../providers/PhotoUpload/BatchUpload/BatchUploadDataProvider'
import { useVerificationDataContext } from '../../../providers/Verify/VerificationDataProvider'
import Loader from '../../atoms/Loader'
import styles from './ImageDrawer.module.css'

export type ImageDrawerProps = {
    imageurls: string[]
    location?: string
    disableScrolling?: boolean
    prevSlide: () => void
    nextSlide: () => void
}

export function ImageDrawer({ imageurls, location, disableScrolling, prevSlide, nextSlide }: ImageDrawerProps): ReactElement {
    const [currentIndex, setCurrentIndex] = useState<number>()
    const [loading, setLoading] = useState<boolean>()

    const { currentVerificationIndex } = useVerificationDataContext()
    const { currentBatchUploadIndex } = useBatchUploadDataContext()


    const SetLoading = (status: boolean) => {
        setLoading(status)
    }

    // ts
    // console.log(`currentVerificationIndex = ${currentVerificationIndex}`)

    useEffect(() => {
        if (location === 'verification') {
            setCurrentIndex(currentVerificationIndex)
            if (currentVerificationIndex > imageurls.length) {
                SetLoading(true)
            } else {
                SetLoading(false)
            }
        } else if (location === 'batchUpload') {
            setCurrentIndex(currentBatchUploadIndex)
        }
    }, [currentVerificationIndex, currentBatchUploadIndex])


    const handleKeyDown = (evt: KeyboardEvent<SVGElement>) => {
        const { cursor, result } = this.state
        // arrow up/down button should select next/previous list element
        // console.log(evt.key)
        if (evt.key == '') {

        } else if (evt.key == '') {
          
        }
    }
    

    // TODO
    // Remove Arrows for 'verification' and 'IC' --> Arrows shouldn't show for verification or IC
    return (
        <>
        {loading ? (
            <Loader message={"FATAL ERROR: PLEASE REFRESH THE PAGE TO LOAD MORE IMAGES. Don't worry, your progress hasn't been lost. We're sorry about this."}/>
        ) : (
            <div className={styles.ImageDrawer}>
            {!disableScrolling && (
                <>
                    <FaArrowAltCircleLeft className={styles.leftArrow} onClick={prevSlide} onKeyPress={(e) => handleKeyDown(e)} />
                    <FaArrowAltCircleRight className={styles.rightArrow} onClick={nextSlide} onKeyPress={(e) => handleKeyDown(e)}/>
                </>
            )}
            
            {imageurls.map((imageurl, index) => {

                return (
                    <div className={index === currentIndex ? 'slide active' : 'slide'} key={index}>

                        {index === currentIndex && (
                            <img className={styles.maxImageSize} src={imageurl} />
                        )}

                    </div>
                )
            })}
        </div>
        )}
        </>
    )
}