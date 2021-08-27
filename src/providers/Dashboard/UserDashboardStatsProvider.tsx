import { TimeState } from '../../@types/MetaData'
import React, { createContext, ReactNode, useContext, useEffect, useRef, useState } from 'react'

import { timeStates } from '../../@types/constants'

interface UserDashboardStatsContextValue {
    timeState: TimeState                    // set in /@types/MetaData
    userCumulativeChartStats: any           // Obtained from /api/v1/stats/user
    setTimeState: (new_time_state: string) => void
    setUserCumulativeChartStats: (stats: any) => void
}

const defaultState: UserDashboardStatsContextValue = {
    timeState: timeStates['ALL'],
    userCumulativeChartStats: {},
    setTimeState: (new_time_state: string) => {},
    setUserCumulativeChartStats: (stats: any) => {},
}

const UserDashboardStatsContext = createContext(defaultState)

function UserDashboardStatsContextProvider( {children} : {children?: ReactNode} ) { 
    const [timeState, setTimeState] = useState<TimeState>(timeStates ? timeStates['ALL'] : undefined)             // TODO: Store localstorage state when user last visited site.
    const [userCumulativeChartStats, setUserCumulativeChartStats] = useState<any>()

    const SetUserCumulativeChartStats = (stats: any) => {
        // console.log(`[DashboardStatsProvider.tsx] Setting Cumulative chart stats...`)
        if (componentIsMounted) {
            setUserCumulativeChartStats(stats)
        }
    }

    const SetTimeState = (new_time_state: string) => {
        // console.log(`[DashboardStatsProvider.tsx] Setting time state...`)
        setTimeState(timeStates[new_time_state])
    }

    // initialize timeState
    useEffect(() => {
        if (componentIsMounted && !timeState) {
            SetTimeState('ALL')
        }
    }, [timeState])


    const componentIsMounted = useRef(true)
    useEffect(() => {
        return () => {
            componentIsMounted.current = false
        }
    }, [])


    return (
        <UserDashboardStatsContext.Provider value={{
            timeState: timeState,
            userCumulativeChartStats: userCumulativeChartStats,
            setTimeState: SetTimeState,
            setUserCumulativeChartStats: SetUserCumulativeChartStats,
        }}>
            {children}
        </UserDashboardStatsContext.Provider>
    )
}

const useUserDashboardStatsContext = (): UserDashboardStatsContextValue =>
  useContext(UserDashboardStatsContext)
  
export { UserDashboardStatsContextProvider, useUserDashboardStatsContext, UserDashboardStatsContextValue }
export default UserDashboardStatsContextProvider