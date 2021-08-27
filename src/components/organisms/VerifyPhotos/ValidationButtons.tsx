import * as React from 'react'

import { SimpleButton } from '../../atoms/Button'
import styles from './ValidationButtons.module.css'

type ValidationButtonsProps = {
    buttonsDisabled: boolean
    onReportPhoto: () => void
    onValidatePhoto: () => void
    notSure: () => void
}

export default function ValidationButtons({
    buttonsDisabled,
    onReportPhoto,
    onValidatePhoto,
    notSure
}: ValidationButtonsProps) {
    return (
        <div className={styles.Padding}>
            <SimpleButton
                disabled={buttonsDisabled}
                onClick={onReportPhoto}
                text={"Report Image"}
            />
            <SimpleButton
                disabled={buttonsDisabled}
                onClick={onValidatePhoto}
                text={"Validate & Load Next"}
            />
            <SimpleButton
                onClick={notSure}
                text={"Help"}
            />
        </div>
    )
}