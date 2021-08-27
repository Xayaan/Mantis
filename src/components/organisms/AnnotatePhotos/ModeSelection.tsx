import React from 'react'

import Caret from '../../../images/caret.svg'
import { useAnnotationDataContext } from '../../../providers/Annotation/AnnotationDataProvider'
import { Dropdown } from '../../atoms/Dropdown'
import Tooltip from '../../atoms/Tooltip/Tooltip'
import styles from './ModeSelection.module.css'

const styleMode = (text: string) => {
    if (text !== undefined) {
        if (text.length > 0) {
            const str = text[0].toUpperCase().concat(text.slice(1, text.length))
            return str
        } else {
            return ''
        }
    } else {
        return ''
    }
}

const ModeSelection = React.forwardRef((props, ref: any) => {
    const { mode, setMode } = useAnnotationDataContext()
    
    const changeMode = (option: any) => {
        setMode(option)
    }
    
    return (
        <Tooltip 
            content={
                <Dropdown 
                    location={'annotation'} 
                    options={[
                        `${styleMode('normal')}`, 
                        // `${styleMode(`anonymization bounty`)}`
                    ]} 
                    changeMode={changeMode}
                />
            }
            trigger="click focus" 
            disabled={false}
        >
            <div className={styles.dropdown}>
                <div className={styles.border}>
                    <p>{styleMode(mode)}</p>
                    <div className={styles.caret}>
                        <Caret aria-hidden="true" />
                    </div>
                </div>
            </div>
        </Tooltip>
    )
})

export default ModeSelection