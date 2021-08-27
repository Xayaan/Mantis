import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { Line } from "react-chartjs-2";

import { useUserDashboardStatsContext } from '../../../providers/Dashboard/UserDashboardStatsProvider';
import { useUserPreferences } from '../../../providers/UserPreferences';
import { cumulativeSum } from '../../../utils/findCumulativeSum'
import Loader from '../../atoms/Loader';
import styles from '../Dashboard/CumulativeChartCount.module.css'

export function MyCumulativeCountChart(): ReactElement {
  const [chartData, setChartData] = useState({});
  const [showLoading, setShowLoading] = useState<boolean>(true)

  const SetShowLoading = (status: boolean) => {
    setShowLoading(status)
  }

  const { 
    userCumulativeChartStats,
  } = useUserDashboardStatsContext()

  const {
    currentFontColor
  } = useUserPreferences()


  const chart = () => {
    if (userCumulativeChartStats !== undefined) {
      let time: string[] = userCumulativeChartStats.data.result["dates"]
      let uploadCount: any[] = userCumulativeChartStats.data.result["uploads"]
      let verificationsCount: any[] = userCumulativeChartStats.data.result["verifications"]

      let tagsAdded: any[] = userCumulativeChartStats.data.result["tag_annotations"]
      let descriptionsAdded: any[] = userCumulativeChartStats.data.result["text_annotations"]
      let annotationsAdded: any[] = []

      for(var i = 0; i < tagsAdded.length; ++i)
        annotationsAdded[i] = tagsAdded[i] + descriptionsAdded[i];
      
      setChartData({
        labels: time,
        datasets: [
          {
            label: "Images Uploaded",
            data: cumulativeSum(uploadCount),
            backgroundColor: ["rgba(233, 124, 124, 0.5)"],
            borderColor: "rgb(93, 93, 93)",
            borderWidth: 4,
            hoverBackgroundColor: "rgba(255,99,132,0.4)",
            hoverBorderColor: "rgba(255,99,132,1)",
          },
          {
            label: "Annotations Added",
            data: cumulativeSum(annotationsAdded),
            backgroundColor: ["rgba(242, 242, 242, 0.5)"],
            borderColor: "rgb(93, 93, 93)",
            borderWidth: 4,
            hoverBackgroundColor: "rgba(255,99,132,0.4)",
            hoverBorderColor: "rgba(255,99,132,1)",
          },
          {
            label: "Verifications Made",
            data: cumulativeSum(verificationsCount),
            backgroundColor: ["rgba(90, 94, 226, 0.5)"],
            borderColor: "rgb(93, 93, 93)",
            borderWidth: 4,
            hoverBackgroundColor: "rgba(255,99,132,0.4)",
            hoverBorderColor: "rgba(255,99,132,1)",
          }
        ]
      }); 
    }
  }
  
  useEffect(() => {
    if (userCumulativeChartStats !== {} && userCumulativeChartStats) {
      chart()
    }
  }, [userCumulativeChartStats]);

  useEffect(() => {
    if (chartData !== {} && chartData !== undefined) {
      SetShowLoading(false)
    }
  }, [chartData])


  const componentIsMounted = useRef(true)
  useEffect(() => {
    return () => {
      componentIsMounted.current = false
    }
  }, [])


  return (
    <>
    {!showLoading ? (
      <>
      {componentIsMounted && chartData && (
        <div className={styles.ChartContainer}>
        
        <div>
          <Line
            data={chartData}
            options={{
              responsive: true,
              title: { text: "Count", display: false },
              scales: {
                yAxes: [
                  {
                    ticks: {
                      fontColor: "var(--font-color-text)",
                      autoSkip: true,
                      maxTicksLimit: 10,
                      beginAtZero: true
                    },
                    gridLines: {
                      display: true,
                    },
                    scaleLabel: {
                      display: true,
                      labelString: "Count",
                      fontColor: currentFontColor
                    }
                  }
                ],
                xAxes: [
                  {
                    gridLines: {
                      display: true,
                    },
                    ticks: {
                      display: false,
                    },
                    scaleLabel: {
                      display: true,
                      labelString: "Time (YY-MM-DD)",
                      fontColor: currentFontColor,
                    },
                  }
                ]
              },
              legend: {
                labels: {
                  fontColor: currentFontColor
                }
              }
            }}
          />
        </div>
  
      </div>
      )}
      </>
    ) : (
      <Loader message="Loading chart..."/>
    )}
    </>
  )
};