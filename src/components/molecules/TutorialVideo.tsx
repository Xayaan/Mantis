import React, { ReactElement } from 'react'

import { Video } from '../atoms/Video'
import styles from './TutorialVideo.module.css'

// TODO: put this in general metadata
export type VideoData = {
    id: string
    embedId: string
    description: string
    title: string
}

type TutorialVideoProps = {
    videos: VideoData[]
}

export function TutorialVideo({ 
    videos
}: TutorialVideoProps): ReactElement {
  
    return (
        <>
            {videos.map((video: VideoData) => {
                return (
                <div className={styles.tutorial} key={video.id} id={video.id}>
                        <>
                            <div>
                                <h3 className={styles.tutorialTitle}>{video.title}</h3>
                                <p className={styles.tutorialText}>{video.description}</p>
                                <Video 
                                    embedId={video.embedId}
                                />
                            </div>
                        </>                    
                </div>
            )})}
        </>
    )
}