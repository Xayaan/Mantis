import React, { ReactElement } from 'react'
import styles from './Challenge.module.css'

type ChallengeViewProps = {
    title: string
    description: string
    linkTo?: string
}
  
export default function DescriptionView({ 
    title,
    description,
    linkTo
}: ChallengeViewProps): ReactElement {
      return (
        <a href={linkTo} target="_blank">
            <div className={styles.challengeBox}>
                <div className={styles.challengeIcon}>
                    <img width="70px" src={`/DataUnion.svg`} />
                </div>
                <div className={styles.challengeText}>
                    <h2>{title}</h2>
                    <p>{description}</p>
                    <p><b>Click to begin</b></p>
                </div>
            </div>
        </a>
      )
  }