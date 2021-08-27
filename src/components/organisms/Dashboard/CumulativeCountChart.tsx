import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { Line } from "react-chartjs-2";

import { useDashboardStatsContext } from '../../../providers/Dashboard/DashboardStatsProvider';
import { useUserPreferences } from '../../../providers/UserPreferences';
import { cumulativeSum } from '../../../utils/findCumulativeSum'
import Loader from '../../atoms/Loader';
import styles from './CumulativeChartCount.module.css'

type CumulativeChartProps = {}

function CumulativeCountChart(): ReactElement {
  // TODO
  // Replace cumulativeChartStats

  const [chartData, setChartData] = useState<any>();

  const { cumulativeChartStats, setTimeState } = useDashboardStatsContext()
  const { currentFontColor } = useUserPreferences()

  const chart = () => {
    let time: string[] = cumulativeChartStats.data.result["dates"]
    let uploadCount: any[] = cumulativeChartStats.data.result["uploads"]
    let verificationCount: any[] = cumulativeChartStats.data.result["verifications"]

    let tagsAdded: any[] = cumulativeChartStats.data.result["tag_annotations"] 
    let descriptionsAdded: any[] = cumulativeChartStats.data.result["text_annotations"]
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
            data: cumulativeSum(verificationCount),
            backgroundColor: ["rgba(90, 94, 226, 0.5)"],
            borderColor: "rgb(93, 93, 93)",
            borderWidth: 4,
            hoverBackgroundColor: "rgba(255,99,132,0.4)",
            hoverBorderColor: "rgba(255,99,132,1)",
          }
        ]
      });
  }

  useEffect(() => {
    if (cumulativeChartStats !== {} && cumulativeChartStats) {
      chart();
    }
  }, [cumulativeChartStats]);

  const componentIsMounted = useRef(true)
  useEffect(() => {
    return () => {
      componentIsMounted.current = false
    }
  }, [])

  return (
    <>
    {componentIsMounted && (
      <>
      {chartData ? (

        <div className={styles.chartContainer}>
          <div>
            <Line
              data={chartData}
              options={{
                responsive: true,
                title: { text: "Images Uploaded", display: false },
                scales: {
                  yAxes: [
                    {
                      ticks: {
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
                        labelString: `Time (YY-MM-DD)`,
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
      ) : (
        <Loader message="Loading Total Image Analytics..."/>
      )}
      </>
    )}
    </>
  );
};

export default CumulativeCountChart;
