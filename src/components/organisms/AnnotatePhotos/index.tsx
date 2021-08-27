import { AnnotationImageRenderPackage } from "../../../@types/Providers";
import ReactImageAnnotate from "@dataunion/react-annotate";
import React, { useEffect, useState } from "react";

import { Annotation, PostAnnotation } from "../../../api/annotation/post";
import { useAnnotationDataContext } from "../../../providers/Annotation/AnnotationDataProvider";
import { useAnnotationErrorContext } from "../../../providers/Annotation/AnnotationErrorProvider";
import { useAuthContext } from "../../../providers/AuthProvider";
import Alert from "../../atoms/Alert/Alert";
import Loader from "../../atoms/Loader";
import styles from './index.module.css'
import ModeSelection from "./ModeSelection";

export const AnnotatePhotos = () => {
    const { 
        annotationImagesCurrentTags,
        annotationImagesCurrentId,
        annotationImageRendered,
        loadingNextImage,
        nextAnnotationSlide
    } = useAnnotationDataContext() 

    const { 
        couldntLoadImages,
        changingMode, 
        ended
    } = useAnnotationErrorContext()

    const { accessToken, setNeedToRefreshTokenError } = useAuthContext()

    const [currentImage, setCurrentImage] = useState<AnnotationImageRenderPackage>()

    // Signals
    const [annotateDataSuccess, setAnnotateDataSuccess] = useState<boolean>()
    const [boxesWithoutTags, setBoxesWithoutTags] = useState<boolean>(false)
    const [failedToPost401, setFailedToPost401] = useState<boolean>(false)
    const [imageSkipped, setImageSkipped] = useState<boolean>(false)

    // Signal Setters
    const SetAnnotateDataSuccess = (status: boolean) => {
        setAnnotateDataSuccess(status)
    }

    const SetBoxesWithoutTags = (status: boolean) => {
        setBoxesWithoutTags(status)
    }

    const SetFailedToPost401 = (status: boolean) => {
        setFailedToPost401(status)
    }

    const SetImageSkipped = () => {
        setImageSkipped(true)
        setTimeout(() => {
            setImageSkipped(false)
        }, 500)
    }

    
    useEffect(() => {        
        if (annotationImageRendered !== undefined) {
            annotationImageRendered.length > 0 && setCurrentImage(annotationImageRendered[0])
        }
    }, [JSON.stringify(annotationImageRendered)])


    const submitFunction = (data: any) => {
        SetBoxesWithoutTags(false)
        if (data.images !== undefined) {
            if (data.images.length > 0) {                
                // cultivate regions object.
                if (data.images[0].regions.length > 0) {
                    const regions: Annotation[] = []
                    data.images[0].regions.forEach((region: any) => {
                        // set error if one of the boxes is blank.
                        if (region.cls === "" || region.cls === undefined) {
                            SetBoxesWithoutTags(true)
                        }  else {
                            const annotationObject: Annotation = {
                                type: region.type,
                                tag: region.cls,
                                x: region.x,
                                y: region.y,
                                width: region.w,
                                height: region.h
                            }
                            regions.push(annotationObject)
                        }

                        if (regions.length === data.images[0].regions.length && !boxesWithoutTags) {
                            PostAnnotation(accessToken, annotationImagesCurrentId, regions).then(jsonResult => {
                                if (jsonResult.status === "success" && jsonResult["msg"] !== "Token has expired") {
                                    // ts
                                    // console.log(`SUCCESS ACHIEVED`)
                                    SetAnnotateDataSuccess(true)
                                    setTimeout(() => {
                                        SetAnnotateDataSuccess(undefined)
                                    }, 5000)
                                    
                                    // reset image and load next one: signal to AnnotationDataProvider
                                    nextAnnotationSlide()
                                } else if (jsonResult.status === "failed" && jsonResult["msg"] !== "Token has expired") {
                                    // ts
                                    // console.log(`FAILURE`)
                                    SetAnnotateDataSuccess(false)
                                    setTimeout(() => {
                                        SetAnnotateDataSuccess(undefined)
                                    }, 5000)
                                } else if (jsonResult["msg"] === "Token has expired") {
                                    setNeedToRefreshTokenError(true)
                                    SetFailedToPost401(true)
                                }
                            }) 
                        }      
                    })
                } else {
                    SetImageSkipped()
                    nextAnnotationSlide()
                }
            }
        } else {
            console.log(`THERE IS NO BOX DATA TO SEND.`)
        }
    }

    return (
        <div>
            <div className={styles.dropdownLocation}>
                {/* <p>Data Mode: </p> */}
                <ModeSelection />
            </div>

            {(annotationImageRendered && !couldntLoadImages && currentImage && !changingMode) ? (
            <>
                <div className={styles.theme}>
                    <ReactImageAnnotate
                        key={`${JSON.stringify(currentImage)}`}
                        labelImages
                        regionClsList={annotationImagesCurrentTags}
                        allowComments={true}
                        hideNext={true}
                        hidePrev={true}
                        hideClone={true}
                        images={[currentImage]}
                        hideRegionTagOption={true}
                        onExit={submitFunction}

                        // ERROR AND LOADING SIGNALS
                        couldntLoadImages={couldntLoadImages}       // show aesthetic error
                    />
                </div>

                {loadingNextImage && (
                    <div className={styles.padding}>
                        <Loader message={"Loading next image... "} />
                    </div>
                )}
                </>
            ) : !annotationImageRendered && !couldntLoadImages && !ended ? (
                <Loader message={"Loading images for annotation. This may take a few minutes..."}/>
            ) : couldntLoadImages ? (
                <Alert text="Images couldn't be loaded. Please check your internet connection, refresh the page and/or contact support through Telegram." state="error"/>
            ) : changingMode === true && (
                <Loader message={"Changing Annotation Mode. This may take a few minutes. Please wait..."} />
            )}

            {/********************/}
            {/** SIGNAL DISPLAY **/}
            {/********************/}
            {(annotateDataSuccess !== undefined || boxesWithoutTags !== undefined || failedToPost401 !== undefined) && (
                <div className={styles.signalPadding}>
                    {boxesWithoutTags === true && (
                        <Alert text={"Some boxes aren't tagged. Please go back and tag all the boxes you've drawn, or delete them. All boxes must have tags to submit."} state="error" />
                    )}

                    {annotateDataSuccess === true ? (
                        <Alert text={"Successfully uploaded your annotations!"} state="success"/>
                    ) : annotateDataSuccess === false && (
                        <Alert text={"There was an error uploading your annotations. We're sorry. Please contact the devs."} state="error"/>
                    )} 
                    
                    {imageSkipped && (
                        <Alert text="Image skipped" state="guidelinesWarning" />
                    )}

                    {failedToPost401 && (
                        <Alert text={"There was a problem sending your data. We're sorry about this. Please try again in 10 seconds."} state="guidelinesWarning" />
                    )}
                </div>
            )}

            {ended && (
                <h1>Congratulations, you've reached the end of annotatable images for this category! To continue annotating, you will have to wait until others upload more images of this category. 
                    You can still upload more images.</h1>
            )}
        </div>
    )
} 