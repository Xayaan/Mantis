import React, { ReactElement, useEffect, useRef, useState } from 'react';

import { GetUserStats } from '../../../api/userStats/userStats'
import { useAuthContext } from '../../../providers/AuthProvider';
import { useUserDashboardStatsContext } from '../../../providers/Dashboard/UserDashboardStatsProvider';
import { calculateQuicraTotal, calculateQuicraTotalAnnotations, calculateQuicraTotalVerify } from '../../../utils/calculateRewards';
import Alert from '../../atoms/Alert/Alert';
import Loader from '../../atoms/Loader';
import { MyCumulativeCountChart } from './MyCumulativeCountChart';
import styles from './UserDashboard.module.css'

export default function UserDashboard(): ReactElement {
  const [didRefresh, setDidRefresh] = useState<boolean>(false)
  const [statsLoading, setStatsLoading] = useState<boolean>(false)
  const [statsError, setStatsError] = useState<boolean>(false)

  const [myAnnotationsAdded, setMyAnnotationsAdded] = useState<number>()
  const [myUploadCount, setMyUploadCount] = useState<number>()
  const [myVerifications, setMyVerifications] = useState<number>()

  const [quicraTokensTotalImages, setQuicraTokensTotalImages] = useState<number>(0)
  const [quicraTokensTotalVerified, setQuicraTokensTotalVerified] = useState<number>(0)
  const [quicraTokensTotalAnnotations, setQuicraTokensTotalAnnotations] = useState<number>(0)
  // const [usdTotal, setUsdTotal] = useState<number>()
  const [failedToPost401, setFailedToPost401] = useState<boolean>()

  const { 
    userCumulativeChartStats,     // Obtained from /api/v1/stats/user
    timeState,
    setUserCumulativeChartStats,
    setTimeState
  } = useUserDashboardStatsContext()

  const { accessToken, setNeedToRefreshTokenError } = useAuthContext()

  // SETTERS
  const SetMyAnnotationsAdded = (count: any) => {
    setMyAnnotationsAdded(count)
  }

  const SetMyUploadCount = (count: any) => {
    setMyUploadCount(count)
  }

  const SetMyVerifications = (count: any) => {
    setMyVerifications(count)
  }

  const SetQuicraTokensTotalAnnotations = (count: any) => {
    setQuicraTokensTotalAnnotations(count)
  } 
  
  const SetStatsLoading = (status: boolean) => {
    setStatsLoading(status)
  }

  const SetStatsError = (status: boolean) => {
    setStatsError(status)
  }

  const SetFailedToPost401 = (status: boolean) => {
    setFailedToPost401(status)
  }

  // SETTING DATA
  useEffect(() => {
    SetFailedToPost401(false)
    setDidRefresh(true)

    // if userCumulativeChartStats NOT set:
    if (componentIsMounted && accessToken && !userCumulativeChartStats && timeState) {
      GetUserStats(timeState.start_date, timeState.end_date, accessToken).then((res: any) => {
        if (res["msg"] === "Token has expired") {
          setNeedToRefreshTokenError(true)
          SetFailedToPost401(true)
        } else {
          const tagsCount = (res && res.data.result["tag_annotations"].map((dataObj: any) =>
          dataObj).reduce((a: any, b: any) => a + b, 0 ));

          const descriptionsCount = (res && res.data.result["text_annotations"].map((dataObj: any) =>
            dataObj).reduce((a: any, b: any) => a + b, 0 ));

          const quicraTokensCalculated = calculateQuicraTotalAnnotations(descriptionsCount, tagsCount)
          SetQuicraTokensTotalAnnotations(quicraTokensCalculated)
          SetMyAnnotationsAdded(tagsCount + descriptionsCount)

          const uploadCount = (res && res.data.result["uploads"].map((dataObj: any) =>
            dataObj).reduce((a: any, b: any) => a + b, 0 ));
          SetMyUploadCount(uploadCount)

          const verificationCount = (res && res.data.result["verifications"].map((dataObj: any) =>
            dataObj).reduce((a: any, b: any) => a + b, 0 ));
          SetMyVerifications(verificationCount)

          setUserCumulativeChartStats(res)
        }
      }).catch((err: any) => {
        if (err == "Error: Request failed with status code 401") {
          setNeedToRefreshTokenError(true)
          SetFailedToPost401(true)
        } else {
          SetStatsError(true)
        }
      })

    } 
    // if userCumulativeChartStats already set:
    else if (userCumulativeChartStats && timeState) {
      
      const tagsCount = (userCumulativeChartStats && userCumulativeChartStats.data.result["tag_annotations"].map((dataObj: any) =>
        dataObj).reduce((a: any, b: any) => a + b, 0 ));

      const descriptionsCount = (userCumulativeChartStats && userCumulativeChartStats.data.result["text_annotations"].map((dataObj: any) =>
        dataObj).reduce((a: any, b: any) => a + b, 0 ));
      
      const quicraTokensCalculated = calculateQuicraTotalAnnotations(descriptionsCount, tagsCount)
      SetQuicraTokensTotalAnnotations(quicraTokensCalculated)
      SetMyAnnotationsAdded(tagsCount + descriptionsCount)

      const uploadCount = (userCumulativeChartStats  && userCumulativeChartStats.data.result["uploads"].map((dataObj: any) =>
        dataObj).reduce((a: any, b: any) => a + b, 0 ));
      SetMyUploadCount(uploadCount)

      const verificationCount = (userCumulativeChartStats && userCumulativeChartStats.data.result["verifications"].map((dataObj: any)=>
        dataObj).reduce((a: any, b: any) => a + b, 0 ));
      SetMyVerifications(verificationCount)
    }
  }, [didRefresh, JSON.stringify(accessToken)])


  // SET QUICRA TOKENS FOR IMAGES UPLOADED
  useEffect(() => {
    if (myUploadCount) {
      const quicraTokensCalculated = calculateQuicraTotal(myUploadCount)
      setQuicraTokensTotalImages(quicraTokensCalculated)
    }
  }, [myUploadCount])

  // SET QUICRA TOKENS FOR IMAGES VERIFIED
  useEffect(() => {
    if (myVerifications) {
      const quicraTokensCalculated = calculateQuicraTotalVerify(myVerifications)
      setQuicraTokensTotalVerified(quicraTokensCalculated)
    }
  }, [myVerifications])


  useEffect(() => {
    if (userCumulativeChartStats !== {}) {
      SetStatsLoading(false)
      if (statsError) {
        SetStatsError(false)
      }
    }
  }, [userCumulativeChartStats])


  const componentIsMounted = useRef(true)
  useEffect(() => {
    return () => {
      componentIsMounted.current = false
    }
  }, [])


    return (
      <>
      {!statsLoading ? ( 
        <>
        {componentIsMounted && !statsError ? (
          <>
          <div>
            <ul className={styles.metrics}>
              <a href={`https://market.oceanprotocol.com/asset/did:op:7Bce67697eD2858d0683c631DdE7Af823b7eea38`} target="_blank">
                <li>
                    <h1>{myUploadCount}</h1>
                    <p>Your Images Uploaded</p>
                    <br />
                    <h5>≈ {quicraTokensTotalImages} QUICRA-0</h5>
                    {/* <h5>≈ {usdTotal} $USD</h5> */}
                </li>
              </a>
  
              <a href={`https://market.oceanprotocol.com/asset/did:op:7Bce67697eD2858d0683c631DdE7Af823b7eea38`} target="_blank">
                <li>
                  <h1>{myVerifications}</h1>
                  <p>Your Verifcations</p>
                  <br />
                  <h5>≈ {quicraTokensTotalVerified} QUICRA-0</h5>
                </li>
              </a>
  
              <a href={`https://market.oceanprotocol.com/asset/did:op:7Bce67697eD2858d0683c631DdE7Af823b7eea38`} target="_blank">
                <li>
                  <h1>{myAnnotationsAdded}</h1>
                  <p>Your Annotations</p>
                  <br />
                  <h5>≈ {quicraTokensTotalAnnotations} QUICRA-0</h5>
                </li>
              </a>
  
            </ul>
          </div>
  
          {/* QUICRA TOTAL CALCULATED HERE */}
          <div>
            {(quicraTokensTotalImages + quicraTokensTotalVerified + quicraTokensTotalAnnotations !== NaN) ? (
              <>
                <p className={styles.large}><b>Total earned =</b> {(quicraTokensTotalImages + quicraTokensTotalAnnotations + quicraTokensTotalVerified).toFixed(6)} QUICRA</p>
              </>
            ) : (
              <>
                <p className={styles.large}><b>Total QUICRA earned =</b> None yet. Begin uploading and verifying!</p>
              </>
            )}
          </div>
  
          <br />
          <br />
          <br />

          <div className={styles.verificationGraph}>
            <div className={styles.chartContainer}>
              <h1>Your Contribution Data</h1>
              <MyCumulativeCountChart />
            </div>
          </div>
  
          </>
        ) : statsError && !failedToPost401 ? (
          <Alert text={"FATAL ERROR: Data not loading. You may not be connected to the internet. If you are connected, please clear your cookies and then reload the page in a new tab. The devs are working on this issue."} state="error" />
        ) : failedToPost401 && (
          <Alert text={"There was a problem retrieving your data. We're trying again. If you keep receiving this message, please clear your cookies and then reload the page in a new tab."} state="guidelinesWarning" />
        )}
        </>
      ) : (
        <Loader message="Loading Your Statistics..."/>
      )}      
      </>
    )
}
