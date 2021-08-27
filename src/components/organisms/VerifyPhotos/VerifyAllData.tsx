import { navigate } from 'gatsby'
import React, { useRef } from 'react'
import { useEffect, useState } from 'react'

import { noError } from '../../../@types/constants'
import { PostReport, PostReportRequest, PostVerification, PostVerificationImageRequest } from '../../../api/verify/post'
import { useAuthContext } from '../../../providers/AuthProvider'
import { useVerificationDataContext } from '../../../providers/Verify/VerificationDataProvider'
import { useVerificationErrorContext } from '../../../providers/Verify/VerificationErrorProvider'
import { useWeb3 } from '../../../providers/Web3'
import { unpackImageRenderPackage } from '../../../utils/imageRenderPackage'
import Alert from '../../atoms/Alert/Alert'
import Loader from '../../atoms/Loader'
import { ImageDrawer } from '../../molecules/ImageDrawer/ImageDrawer'
import ValidationButtons from './ValidationButtons'
import styles from './VerifyAllData.module.css'
import VerifyDescriptionView from './VerifyDescriptionView'
import VerifyTagsView from './VerifyTagsView'

// TODO
// Move all indexing for the ImageDrawer into this file. This will keep the image, tags and description indicies equal.
export default function VerifyAllData() {

    const [didRefresh, setDidRefresh] = useState(false)
    const [loading, setLoading] = useState(true)

    const { 
        verificationImageRenderPackage, 
        currentVerificationIndex,
        setCurrentVerificationIndex,
        addedTags,
        addedDescription,
        batchInterval,
        awaitingBatchNotLoaded,
    } = useVerificationDataContext()    // essential communication between this file and ImageDrawer. they communicate via VDataProvider

    const { accessToken, setNeedToRefreshTokenError } = useAuthContext()
    const { accountId } = useWeb3()
    
    const { 
        loadingBatch, 
        ended, 
        noMoreData,
        verifyingImage,
        reportingImage,
        setVerifyingImage, 
        setReportingImage,
        setEnded,
    } = useVerificationErrorContext()

    const { notLoggedInError } = useAuthContext()
    const [length, setLength] = useState<number>(verificationImageRenderPackage ? verificationImageRenderPackage.length : 0)           // used for prev and next slide.
    
    const [currentPhotoId, setCurrentPhotoId] = useState<string>()                        // used for verification API call.

    const [localPhotoIds, setPhotoIds] = useState<string[]>()                             // used for indexing
    const [localImageUrls, setImageUrls] = useState<string[]>()                           // passed as component parameter
    const [localTagList, setTagList] = useState<string[][]>()                             // passed as component parameter
    const [localDescriptions, setDescriptions] = useState<string[]>()                     // passed as component parameter

    const [disabledNextSlide, setDisabledNextSlide] = useState<boolean>()
    const [readyToEnableNextSlide, setReadyToEnableNextSlide] = useState<boolean>(false)

    const [currentTags, setCurrentTags] = useState<string[]>()
    const [currentDescription, setCurrentDescription] = useState<string>()
    const [upvotedTags, setUpvotedTags] = useState<string[] | undefined>([])
    const [downvotedTags, setDownvotedTags] = useState<string[] | undefined>([])
    const [upvotedDescriptions, setUpvotedDescriptions] = useState<string[]>([])
    const [downvotedDescriptions, setDownvotedDescriptions] = useState<string[]>([])
    const [descriptionChecked, setDescriptionChecked] = useState<boolean>()

    const [failedToPost401, setFailedToPost401] = useState<boolean>()


    const onFlagDescription = (flagged_description: string) => {
        if (componentIsMounted) {
            // add description to downvotedDescriptions and remove it from upvotedDescriptions
            if (!upvotedDescriptions.includes(flagged_description) && !downvotedDescriptions.includes(flagged_description)) {
                setDownvotedDescriptions(downvotedDescriptions.concat(flagged_description))
                setDescriptionChecked(false)
            }
            // reverse the downvote
            else if (downvotedDescriptions.includes(flagged_description)) {
                setDownvotedDescriptions(downvotedDescriptions.filter(item => item != flagged_description))
                setDescriptionChecked(undefined)
            }
            // set the downvote and reverse the upvote
            else if (upvotedDescriptions.includes(flagged_description) && !downvotedDescriptions.includes(flagged_description)) {
                setUpvotedDescriptions(upvotedDescriptions.filter(item => item != flagged_description))
                downvotedDescriptions.push(flagged_description)
                setDescriptionChecked(false)
            }
        }
    }

     // add description to upvotedDescriptions and remove it from downvotedDescriptions
    const onVerifyDescription = (verified_description: string) => {
        // console.log(`EXECUTING ONVERIFYDESCRIPTION`)
        if (componentIsMounted) {            
            // set the upvote
            if (!upvotedDescriptions.includes(verified_description) && !downvotedDescriptions.includes(verified_description)) {
                // console.log(`Setting the upvote`)
                setUpvotedDescriptions(upvotedDescriptions.concat(verified_description))
                setDescriptionChecked(true)
            }
            // reverse the upvote 
            else if (upvotedDescriptions.includes(verified_description)) { 
                // console.log(`Reversing the upvote`)
                setUpvotedDescriptions(upvotedDescriptions.filter(item => item != verified_description))
                setDescriptionChecked(undefined)
            } 
            // set the upvote and reverse the downvote
            else if (!upvotedDescriptions.includes(verified_description) && downvotedDescriptions.includes(verified_description)) {
                // console.log(`Setting the upvote and reversing the downvote`)                
                setDownvotedDescriptions(downvotedDescriptions.filter(item => item != verified_description))
                upvotedDescriptions.push(verified_description)
                setDescriptionChecked(true)
            } else {
                console.log(`FATAL ERROR: Neither item was checked.`)
            }
        }
    }

    useEffect(() => {
        setUpvotedTags([])
        setDownvotedTags([])
        setDescriptionChecked(undefined)
        setDescriptionChecked(undefined)
    }, [currentVerificationIndex])

    useEffect(() => {
        // initialization of currentTags. Change with every new index.
        if (currentVerificationIndex !== undefined) {
            localTagList !== undefined && setCurrentTags(localTagList[currentVerificationIndex]) 
            localDescriptions !== undefined && setCurrentDescription(localDescriptions[currentVerificationIndex])
        }
    }, [currentTags, currentVerificationIndex, localTagList, localDescriptions])


    // SETTERS
    const SetDisabledNextSlide = (status: boolean) => {
        setDisabledNextSlide(status)
    }

    const SetReadyToEnableNextSlide = (status: boolean) => {
        setReadyToEnableNextSlide(status)
    }

    const SetCurrentPhotoId = (currentPhotoId: string) => {
        setCurrentPhotoId(currentPhotoId)
    }

    const SetDownvotedTags = (new_tags: string[]) => {
        setDownvotedTags(new_tags)
    }

    const SetUpvotedTags = (new_tags: string[]) => {
        setUpvotedTags(new_tags)
    }

    const SetFailedToPost401 = (status: boolean) => {
        setFailedToPost401(status)
    }


    useEffect(() => {
        if (localPhotoIds !== undefined && currentVerificationIndex !== undefined) {
            if (localPhotoIds.length !== 0) {
                SetCurrentPhotoId(localPhotoIds[currentVerificationIndex])
            }
        } 
        // console.log(`CURRENTINDEX = ${currentVerificationIndex}`)
    }, [currentVerificationIndex, localPhotoIds])


    // Handling Disabling Buttons, Slide Switching
    // ReadyToEnableNextSlide ALWAYS switches after 10 sec.
    useEffect(() => {
        if (currentVerificationIndex === batchInterval - 1) {
            SetDisabledNextSlide(true)
            SetReadyToEnableNextSlide(true)
        } else {
            SetDisabledNextSlide(false)
            SetReadyToEnableNextSlide(false)
        }
    }, [currentVerificationIndex])


    useEffect(() => {
        // console.log(`=== READY TO ENABLE NEXT SLIDE CHANGED. ===`)
        if (readyToEnableNextSlide) {
            // console.log(`readyToEnableNextSlide === true`)
            if (currentVerificationIndex === batchInterval - 1) {
                // console.log(`currentVerificationIndex === batchInterval - 1`)
                if (awaitingBatchNotLoaded) {
                    // console.log(`awaitingBatchNotLoaded = true`)
                    setDisabledNextSlide(true)
                } else {
                    // console.log(`awaitingBatchNotLoaded = false`)
                    setDisabledNextSlide(false)
                }
            } else {
                setDisabledNextSlide(false)
            }
        }
    }, [readyToEnableNextSlide, awaitingBatchNotLoaded])


    // Unpack the ImageRenderPackage into 4 variables, to send to their own components for rendering.
    useEffect(() => {
        // Set Loading to defined if verificationImageRenderPackage is undefined.
        if (verificationImageRenderPackage !== undefined) {
            setLength(verificationImageRenderPackage.length)
            setLoading(false)
        } else {
            setLoading(true)
        }

        if (verificationImageRenderPackage !== undefined) {
            if (verificationImageRenderPackage.length !== 0) {                
                const { photoIds, imageUrls, tagList, descriptions } = unpackImageRenderPackage(verificationImageRenderPackage)
                setPhotoIds(photoIds)
                setImageUrls(imageUrls)
                setTagList(tagList)
                setDescriptions(descriptions)
            } else {
                console.log(`verificationImageRenderPackage is blank.`)
            }
        }
    }, [verificationImageRenderPackage])


    // Slide Navigators
    const prevSlide = () => {
        if (componentIsMounted) {
            setCurrentVerificationIndex(currentVerificationIndex === 0 ? length - 1 : currentVerificationIndex - 1)
        }
        // setCurrentVerificationIndex(currentIndex)
    }


    const nextSlide = () => {
        if (componentIsMounted) {
            setCurrentVerificationIndex(currentVerificationIndex === length - 1 ? 0 : currentVerificationIndex + 1)
        }
        if (noMoreData) {
            setEnded(true)
        }
    }

    // API Button Submit Calls
    const onValidatePhoto = () => {
        
        setVerifyingImage(true)

        const request: PostVerificationImageRequest = {
            image_id: currentPhotoId,
            verification: {
                tags: {
                    up_votes: upvotedTags,
                    down_votes: downvotedTags
                },
                descriptions: {
                    up_votes: upvotedDescriptions,
                    down_votes: downvotedDescriptions,
                }
            },
            annotation: {
                tags: addedTags,
                description: addedDescription
            }
        }

        if (currentPhotoId && accountId) {
            // signal setting
            SetFailedToPost401(false)
            PostVerification(accessToken, request).then(jsonResult => {
                if (jsonResult["status"] === "success") {
                    setVerifyingImage(false)
                    nextSlide()

                    // ts
                    // console.log(`=== IMAGE VALIDATED. JSONRESULT = `)
                    // console.log(jsonResult)
                    // console.log(`REQUEST WAS: `)
                    // console.log(request)
                } else if (jsonResult["msg"] !== "Token has expired") {
                    // TODO
                    // SET ERROR HERE
                    // console.log(`[VerifyAllData.tsx] onValidatePhoto ERROR: status === failed. Check network tab.`)
                    setVerifyingImage(false)
                    nextSlide()
                } else if (jsonResult["msg"] === "Token has expired") {
                    setNeedToRefreshTokenError(true)
                    setVerifyingImage(false)
                    SetFailedToPost401(true)
                }
            }).catch(err => {                
                setVerifyingImage(false)
                nextSlide()
            })
        }
    }
    

    const onReportPhoto = () => {
        if (currentPhotoId && accountId) {
            // signal setting
            SetFailedToPost401(false)
            setReportingImage(true)

            const request: PostReportRequest = {
                "photo_id": currentPhotoId
            }
            PostReport(accessToken, request).then(jsonResult => {
                if (jsonResult["msg"] !== "Token has expired") {
                    setReportingImage(false)
                    nextSlide()
                } else if (jsonResult["msg"] === "Token has expired") {
                    setNeedToRefreshTokenError(true)
                    setReportingImage(false)
                    SetFailedToPost401(true)
                }
            }).catch(err => {                
                setReportingImage(false)
                nextSlide()
            })
        } else {
            console.log(`[VerifyAllData.tsx] onValidatePhoto ERROR: photoId == ${currentPhotoId} and accountId == ${accountId}`)
        }
    }

    const notSure = () => {
        navigate('/tutorials/#verifyImage')
    }

    const componentIsMounted = useRef(true)
    useEffect(() => {
        return () => {
            componentIsMounted.current = false
        }
    }, [])


    useEffect(() => {
        setDidRefresh(true)
    }, [didRefresh])

    // TS
    // useEffect(() => {
    //     console.log(`[VERIFY ALL DATA] NOTLOGGEDINERROR = ${notLoggedInError}`)
    // }, [notLoggedInError])


    return (
        <>
        {!loading && !ended && !notLoggedInError && (
            <>                
                {localImageUrls && (
                    <ImageDrawer 
                        imageurls={localImageUrls}
                        location={'verification'}
                        disableScrolling={true}
                        prevSlide={prevSlide}
                        nextSlide={nextSlide}
                    />
                )}

                {localDescriptions && (
                    <VerifyDescriptionView
                        currentDescription={currentDescription}
                        descriptionChecked={descriptionChecked}
                        onVerifyDescription={onVerifyDescription}
                        onFlagDescription={onFlagDescription}
                    />
                )}

                {localTagList && (
                    <VerifyTagsView 
                        currentTags={currentTags}
                        upvotedTags={upvotedTags}
                        downvotedTags={downvotedTags}
                        setUpvotedTags={SetUpvotedTags}
                        setDownvotedTags={SetDownvotedTags}
                    />
                )}

                {localImageUrls && (
                    <ValidationButtons 
                        buttonsDisabled={disabledNextSlide}
                        onReportPhoto={onReportPhoto}
                        onValidatePhoto={onValidatePhoto}
                        notSure={notSure}
                    />
                )}

                {disabledNextSlide && (
                    <Loader message={"Loading next batch..."}/>
                )}
            </>
        )}

        <div className={styles.lowerCenter}>
            {loading && !loadingBatch && !ended && (
                <Loader message={"Loading images for verification. This might take a few moments..."} />
            )}
        </div>

        <div className={styles.lowerCenter}>
            {!loading && !loadingBatch && !ended && verifyingImage && (
                <Loader message={"Verifying Image..."} />
            )}
        </div>

        <div className={styles.lowerCenter}>
            {!loading && !loadingBatch && !ended && reportingImage && (
                <Loader message={"Reporting Image..."} />
            )}
        </div>

        <div className={styles.lowerCenter}>
            {failedToPost401 && (
                <Alert text={"There was a problem sending your data. We're sorry about this. Please try again in 10 seconds."} state="guidelinesWarning"/>
            )}
        </div>

        <div className={styles.lowerCenter}>
            {!loadingBatch && ended && (
                <h1>Congratulations, you've reached the end of verifiable images! To continue verifying, you will have to wait until others upload more images. You can still upload more images.</h1>
            )}
        </div>
        </>
    )
}