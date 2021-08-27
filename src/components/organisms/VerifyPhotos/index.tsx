import React, { useRef, useState } from 'react'
import { useVerificationDataContext } from '../../../providers/Verify/VerificationDataProvider'
import { useVerificationErrorContext } from '../../../providers/Verify/VerificationErrorProvider'
import { SimpleButton } from '../../atoms/Button'
import VerifyAllData from './VerifyAllData'
import styles from './VerifyAllData.module.css'

// TODO
// Move all indexing for the ImageDrawer into this file. This will keep the image, tags and description indicies equal.
export default function VerifyPhotos() {

    const [status, setStatus] = useState<'tagging' | 'verifying'>()

    const { 
    } = useVerificationDataContext()

    const switchToTagging = () => {
        setStatus('tagging')
    }

    const switchToVerifying = () => {
        setStatus('verifying')
    }

    return (
        <>
            <div className={styles.openingButtonsPadding}>
            <SimpleButton
                onClick={switchToTagging}
                text={"Report Image"}
            />
            <SimpleButton
                onClick={switchToVerifying}
                text={"Validate & Load Next"}
            />
            </div>

        <VerifyAllData />
        </>
    )
}