import React, { ReactElement } from 'react'
import styles from './GuidelinesView.module.css'

type GuidelinesViewProps = {
    guidelines: string
}

export default function GuidelinesView({guidelines}: GuidelinesViewProps): ReactElement {
    return (
        <div>
            {guidelines}
        </div>
    )
} 