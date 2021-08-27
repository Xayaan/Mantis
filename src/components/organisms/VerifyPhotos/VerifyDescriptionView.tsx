import * as React from 'react'
import { useEffect, useState } from 'react'

import { useVerificationDataContext } from '../../../providers/Verify/VerificationDataProvider'
import InputDescription from '../../atoms/InputText/InputDescription'
import Description from '../../molecules/Description/Description'
import styles from './VerifyDescriptionView.module.css'

export type VerifyDescriptionViewProps = {
    currentDescription: string
    descriptionChecked?: boolean
    onFlagDescription?: (flagged_description: string) => void
    onVerifyDescription?: (verified_description: string) => void
}

export default function VerifyDescriptionView({
    currentDescription,
    descriptionChecked,
    onFlagDescription,
    onVerifyDescription
} : VerifyDescriptionViewProps) {
    

    // TODO
    // Take this logic to verifyAllData so that you can send the data off.

    const {
        addedDescription,
        addAddedDescription,
        removeAddedDescription
    } = useVerificationDataContext()


    return (
        <>
        {(!addedDescription && !currentDescription) && (
            <div className={styles.LightPadding}>
                <p className={styles.paragraphPadding}>No descriptions on this image yet. Please add some.</p>
            </div>
        )}
        
        {(addedDescription || currentDescription) && (
            <div className={styles.PaddingBottom}>
                <Description 
                    location={'verification'}
                    description={currentDescription}
                    addedDescription={addedDescription}
                    descriptionChecked={descriptionChecked}
                    onRemove={removeAddedDescription}
                    onFlagDescription={onFlagDescription}
                    onVerifyDescription={onVerifyDescription}
                />
            </div>
        )}

        <InputDescription
            name='description'
            placeholder='Describe the image currently shown then press ENTER.'
            size='default'
            addDescription={addAddedDescription}
        />

        </>
    )
}