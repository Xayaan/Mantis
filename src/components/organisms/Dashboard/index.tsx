import React, { ReactElement, useEffect, useRef, useState } from 'react';

import { timesList } from '../../../@types/constants';
import { GetNumberOfUsers, GetOverallStats, GetTagSummary } from '../../../api/stats/stats'
import { useDashboardStatsContext } from '../../../providers/Dashboard/DashboardStatsProvider';
import ContentContainer from '../../atoms/ContentContainer'
import CumCountChart from './CumulativeCountChart';
import styles from './Dashboard.module.css';
import { TagPagination } from './TagPagination';

export default function Dashboard(): ReactElement {
  const [didRefresh, setDidRefresh] = useState<boolean>(false)

  const [userTotal, setUserTotal] = useState<number>()

  const [tagsAddedTotal, setTagsAddedTotal] = useState<number>()
  const [descriptionsAddedTotal, setDescriptionsAddedTotal] = useState<number>()
  const [uploadsTotal, setUploadsTotal] = useState<number>()
  const [verificationsTotal, setVerificationsTotal] = useState<number>() 

  const { 
    timeState,
    numberOfUsers,
    cumulativeChartStats,
    tagStatistics,
    setTimeState,
    setNumberOfUsers,
    setCumulativeChartStats,
    setTagStatistics
  } = useDashboardStatsContext()


  const SetTagsAddedTotal = (count: number) => {
    setTagsAddedTotal(count)
  }

  const SetDescriptionsAddedTotal = (count: number) => {
    setDescriptionsAddedTotal(count)
  }

  const SetUploadsTotal = (count: number) => {
    setUploadsTotal(count)
  }

  const SetVerificationsTotal = (count: number) => {
    setVerificationsTotal(count)
  }

  const SetUserTotal = (count: number) => {
    setUserTotal(count)
  }


  // API CALLS
  useEffect(() => {
    if (componentIsMounted) {
      setDidRefresh(true)

      // GET OVERALL STATS (cumulativeChartStats)
      if (!cumulativeChartStats && timeState) {
        GetOverallStats(timeState.start_date, timeState.end_date).then(res => {
          setCumulativeChartStats(res)

          const tagsAddedCount = (res && res.data.result["tag_annotations"].map((dataObj: any) =>
            dataObj).reduce((a: any, b: any) => a + b, 0 ));

          // console.log(`tagsAddedCount = ${tagsAddedCount}`)
          SetTagsAddedTotal(tagsAddedCount)

          const descriptionsAddedCount = (res && res.data.result["text_annotations"].map((dataObj: any) =>
            dataObj).reduce((a: any, b: any) => a + b, 0 ));

          // console.log(`descriptionsAddedCount = ${descriptionsAddedCount}`)
          SetDescriptionsAddedTotal(descriptionsAddedCount)

          const uploadCount = (res && res.data.result["uploads"].map((dataObj: any) =>
            dataObj).reduce((a: any, b: any) => a + b, 0 ));

          // console.log(`uploadCount = ${uploadCount}`)
          SetUploadsTotal(uploadCount)

          const verificationCount = (res && res.data.result["verifications"].map((dataObj: any) =>
            dataObj).reduce((a: any, b: any) => a + b, 0 ));

          // console.log(`verificationCount = ${verificationCount}`)
          SetVerificationsTotal(verificationCount)
        });
      } else {
        const tagsAddedCount = (cumulativeChartStats && cumulativeChartStats.data.result["tag_annotations"].map((dataObj: any) =>
          dataObj).reduce((a: any, b: any) => a + b, 0 ));

        // console.log(`tagsAddedCount = ${tagsAddedCount}`)
        SetTagsAddedTotal(tagsAddedCount)
        
        const descriptionsAddedCount = (cumulativeChartStats && cumulativeChartStats.data.result["text_annotations"].map((dataObj: any) =>
          dataObj).reduce((a: any, b: any) => a + b, 0 ));

        // console.log(`descriptionsAddedCount = ${descriptionsAddedCount}`)
        SetDescriptionsAddedTotal(descriptionsAddedCount)

        const uploadCount = (cumulativeChartStats && cumulativeChartStats.data.result["uploads"].map((dataObj: any) =>
          dataObj).reduce((a: any, b: any) => a + b, 0 ));

        // console.log(`uploadCount = ${uploadCount}`)
        SetUploadsTotal(uploadCount)

        const verificationCount = (cumulativeChartStats && cumulativeChartStats.data.result["verifications"].map((dataObj: any) =>
          dataObj).reduce((a: any, b: any) => a + b, 0 ));

        // console.log(`verificationCount = ${verificationCount}`)
        SetVerificationsTotal(verificationCount)

      }
    }

    // GET NUMBER OF USERS (userStats)
    if (!numberOfUsers) {
      GetNumberOfUsers().then(user_data => {
        // ts
        // console.log(`=== NUMBER OF USERS RETRIEVED.\nShowing static data: ===`)
        // console.log(user_data)

        setNumberOfUsers(user_data)
        const count = (user_data && user_data.data.result.count);
        SetUserTotal(count)
      });

    } else {
      const user_count = (numberOfUsers &&
        numberOfUsers.data.result.count
      );
      SetUserTotal(user_count)
    }

    // GET TAG STATISTICS
    if (!tagStatistics && timeState) {
      GetTagSummary(timeState.start_date, timeState.end_date).then(res => {
        // ts
        // console.log(`=== TAG SUMMARY RETRIEVED.\nShowing tag summary: ===`)
        // console.log(res)

        setTagStatistics(res)
      })
    }
  }, [didRefresh, timeState])


  const componentIsMounted = useRef(true)
  useEffect(() => {
    return () => {
      componentIsMounted.current = false
    }
  }, [])


  return (
    <ContentContainer>
      
      <h1>Data Statistics Dashboard</h1>

      {componentIsMounted && uploadsTotal && (
        <div className={styles.textGrid}>
          <p><b>Number of Contributors:</b> {userTotal}</p>
          <p><b>Total Images Uploaded:</b> {uploadsTotal} </p>
          <p><b>Total Verifications Made: </b> {verificationsTotal} </p>
          <p><b>Total Annotations Added:</b> {descriptionsAddedTotal + tagsAddedTotal}</p>
        </div>
      )}

      {componentIsMounted && timeState && timesList !== [] && (
        <div className={styles.container} >
          <CumCountChart />
          <hr/><br/>
          <TagPagination />
        </div> 
      )}

    </ContentContainer>
  );
};
