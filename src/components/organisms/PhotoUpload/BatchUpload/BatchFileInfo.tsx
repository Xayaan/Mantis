import { ImageRenderPackage } from '../../../../@types/Providers'
import * as React from 'react'

import { useBatchUploadDataContext } from '../../../../providers/PhotoUpload/BatchUpload/BatchUploadDataProvider'
import Loader from '../../../atoms/Loader'
import styles from './BatchFileInfo.module.css'

type FileBoxProps = {
    clicked: boolean
    fileNumber: number
    image: ImageRenderPackage                           // only pass this parameter if it's running
    onClick?: (fileNumber: number) => void              // only pass this parameter if it's running
}

type BatchFileInfoProps = {
    images?: ImageRenderPackage[]                       // only pass this parameter if it's running
    onClickBox?: (fileNumber: number) => void           // only pass this parameter if it's running
}

// IF THERE IS AN ERROR, image.errors should always have at least one element. if not, there is an error with the back-end.
const FileBox = ({
    clicked,
    fileNumber,
    image,
    onClick
}: FileBoxProps) => {
    return (
        <>
            {(image.errors !== undefined && image.errors !== []) && (image.photoId === undefined || image.photoId === '') && (
                <>
                {clicked ? (
                    <button className={`${styles.batchFileBoxRed} ${styles.clicked}`} onClick={() => onClick(fileNumber)}>
                        File {fileNumber}
                    </button>
                ) : (
                    <button className={styles.batchFileBoxRed} onClick={() => onClick(fileNumber)}>
                        File {fileNumber}
                    </button>
                )}
                </>
            )} 
            
            {(image.photoId !== '' && image.photoId !== undefined) && (
                <>
                {clicked ? (
                    <button className={`${styles.batchFileBoxGreen} ${styles.clicked}`} onClick={() => onClick(fileNumber)}>
                        File {fileNumber}
                    </button>
                ) : (
                    <button className={styles.batchFileBoxGreen} onClick={() => onClick(fileNumber)}>
                        File {fileNumber}
                    </button>
                )}
                </>
            )}

            {((image.errors === undefined || image.errors === []) && (image.photoId !== undefined || image.photoId === '')) && (
                <button className={styles.batchFileBoxWhite} onClick={() => onClick(fileNumber)}>
                    <Loader />
                </button> 
            )}
        </>
    )
}

export default function BatchFileInfo({
    images,
    onClickBox
}: BatchFileInfoProps) {

  const { currentBatchUploadIndex, batchUploadImageRenderPackage } = useBatchUploadDataContext()

  React.useEffect(() => {
    console.log(`re-rendering BatchFileInfo.tsx`)
  }, [batchUploadImageRenderPackage])

  return (
    <>
    {images && (
        <div className={styles.batchFileInfoGrid}>        
            {images.map((image, i) => {
                return (
                    <FileBox 
                        key={i}
                        fileNumber={i}
                        image={image}
                        onClick={onClickBox}
                        clicked={currentBatchUploadIndex === i}
                    />
                )
            })}
        </div>
    )}
    </>
  )
}