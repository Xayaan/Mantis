import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { timeStates } from '../../@types/constants'
import { TimeState } from '../../@types/MetaData'

interface DashboardStatsContextValue {
    timeState: TimeState                    // set in /@types/MetaData
    numberOfUsers: any                      // from /staticdata/user-count
    cumulativeChartStats: any               // 
    tagStatistics: any                      // 
    setTimeState: (new_time_state: string) => void
    setNumberOfUsers: (stats: any) => void
    setCumulativeChartStats: (stats: any) => void
    setTagStatistics: (stats: any) => void
}

const defaultState: DashboardStatsContextValue = {
    timeState: timeStates['ALL'],
    numberOfUsers: {},
    cumulativeChartStats: {},
    tagStatistics: {},            
    setCumulativeChartStats: (stats: any) => {},
    setTimeState: (new_time_state: string) => {},
    setNumberOfUsers: (stats: any) => {},
    setTagStatistics: (stats: any) => {}
}

const DashboardStatsContext = createContext(defaultState)

function DashboardStatsContextProvider( {children} : {children?: ReactNode} ) { 
    const [timeState, setTimeState] = useState<TimeState>()
    const [numberOfUsers, setNumberOfUsers] = useState<any>()
    const [cumulativeChartStats, setCumulativeChartStats] = useState<any>()
    const [tagStatistics, setTagStatistics] = useState<any>()


    const SetTimeState = (new_time_state: string) => {
        // console.log(`[DashboardStatsProvider.tsx] Setting time state...`)
        setTimeState(timeStates[new_time_state])
    }

    const SetCumulativeChartStats = (stats: any) => {
        // console.log(`SETTING CUMULATIVE CHART STATS`)
        setCumulativeChartStats(stats)
    }

    const SetTagStatistics = (stats: any) => {
        setTagStatistics(stats)
    }

    const SetNumberOfUsers = (stats: any) => {
        setNumberOfUsers(stats)
    }


    // initialize timeState
    useEffect(() => {
        if (!timeState) {
            SetTimeState('ALL')
        }
    }, [timeState])


    return (
        <DashboardStatsContext.Provider value={{
            timeState: timeState,
            numberOfUsers: numberOfUsers,
            cumulativeChartStats: cumulativeChartStats,
            tagStatistics: tagStatistics,
            
            setTimeState: SetTimeState,
            setNumberOfUsers: SetNumberOfUsers,
            setCumulativeChartStats: SetCumulativeChartStats,
            setTagStatistics: SetTagStatistics,
        }}>
            {children}
        </DashboardStatsContext.Provider>
    )
}

const useDashboardStatsContext = (): DashboardStatsContextValue =>
  useContext(DashboardStatsContext)
  
export { DashboardStatsContextProvider, useDashboardStatsContext, DashboardStatsContextValue }
export default DashboardStatsContextProvider