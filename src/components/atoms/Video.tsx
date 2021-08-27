import React, { ReactElement, useEffect, useRef, useState } from 'react'
import styles from './Video.module.css'

type VideoProps = {
    embedId: string
}

export function Video({ 
    embedId
}: VideoProps): ReactElement {


    return (
        <div className={styles.videoResponsive}>
            <iframe
                width="853"
                height="480"
                src={`https://www.youtube.com/embed/${embedId}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded youtube"
            />
        </div>
    )
}