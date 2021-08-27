import * as React from 'react'
import { timesList } from '../../../@types/constants'
import { TimeStateButton } from '../../atoms/Button'

type IntervalButtonsProps = {
    changeTimestate: (new_time_state: string) => void
}

export const IntervalButtons = ({
    changeTimestate
}: IntervalButtonsProps) => {

    return (
        <>
            {timesList.map((time: string, i: number) => {
                <TimeStateButton 
                    onClick={changeTimestate(time)}
                    text={time}
                    current={false}
                />
            })}
        </>
    )
}