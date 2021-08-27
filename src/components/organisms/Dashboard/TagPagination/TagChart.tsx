import React, { ReactElement, useEffect, useState } from 'react';
import { Line } from "react-chartjs-2";
import { useUserPreferences } from '../../../../providers/UserPreferences';

import { cumulativeSum } from '../../../../utils/findCumulativeSum';
import { format_time } from '../../../../utils/timeState';
import styles from './TagChart.module.css'

type SingleTagChartProps = {
  chartKey: string
  tagMetadata: any
  tagName: string
}

const TagChart = ({ chartKey, tagMetadata, tagName }: SingleTagChartProps): ReactElement => {
  const [tagChartData, setTagChartData] = useState({});

  // ts
  // console.log(`[TagChart.tsx] tagName, tagMetadata = `)
  // console.log(tagName, tagMetadata)

  const { currentFontColor } = useUserPreferences()

  const chart = () => {
    let tagCount: any[] = []
    let time: string[] = [];

    tagMetadata.forEach((dataPoint: any) => {
      tagCount.push(dataPoint.value)
      time.push(dataPoint.date)
    })

    if (tagCount.length > 1) {
      setTagChartData({
        labels: time,
        datasets: [
          {
            label: tagName,
            data: cumulativeSum(tagCount),
            backgroundColor: ["rgba(255,99,132,0.2)"],
            borderColor: "rgb(249, 37, 255, 0.9)",
            borderWidth: 4,
            hoverBackgroundColor: "rgba(255,99,132, 0.4)",
            hoverBorderColor: "rgb(249, 37, 255, 0.9)",
          }
        ]
      });
    } else {
      time.push(format_time(Date.now(), false))
      setTagChartData({
        labels: time,
        datasets: [
          {
            label: tagName,
            data: [0, tagCount[0]],
            backgroundColor: ["rgba(255,99,132,0.2)"],
            borderColor: "rgb(249, 37, 255, 0.9)",
            borderWidth: 4,
            hoverBackgroundColor: "rgba(255,99,132, 0.4)",
            hoverBorderColor: "rgb(249, 37, 255, 0.9)",
          }
        ]
      });
    }
  };

  useEffect(() => {
    if (tagMetadata) {
      chart();
    }
  }, [tagMetadata]);


  return (
    <>
      <h3 className={styles.tagHeading}>{tagName}</h3>

      <div key={chartKey} className={styles.chartPadding}>
        <Line
            data={tagChartData}
            options={{
              responsive: true,
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
                      labelString: "Tag Count",
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
    </>
  )
}

export default TagChart