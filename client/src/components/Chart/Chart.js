import React from "react";

import { Chart } from "react-google-charts";

const Charts = ({data}) => {
  const female_chart_arr = data && data.female_chart_arr;
  const male_chart_arr = data && data.male_chart_arr;

  const chartData = [
    ['Label', 'Female Members', 'Male Members'],
    ['Jan', female_chart_arr && female_chart_arr[0], male_chart_arr && male_chart_arr[0]],
    ['Feb', female_chart_arr && female_chart_arr[1], male_chart_arr && male_chart_arr[1]],
    ['Mar', female_chart_arr && female_chart_arr[2], male_chart_arr && male_chart_arr[2]],
    ['Apr', female_chart_arr && female_chart_arr[3], male_chart_arr && male_chart_arr[3]],
    ['May', female_chart_arr && female_chart_arr[4], male_chart_arr && male_chart_arr[4]],
    ['Jun', female_chart_arr && female_chart_arr[5], male_chart_arr && male_chart_arr[5]],
    ['Jul', female_chart_arr && female_chart_arr[6], male_chart_arr && male_chart_arr[6]],
    ['Aug', female_chart_arr && female_chart_arr[7], male_chart_arr && male_chart_arr[7]],
    ['Sep', female_chart_arr && female_chart_arr[8], male_chart_arr && male_chart_arr[8]],
    ['Oct', female_chart_arr && female_chart_arr[9], male_chart_arr && male_chart_arr[9]],
    ['Nov', female_chart_arr && female_chart_arr[10], male_chart_arr && male_chart_arr[10]],
    ['Dec', female_chart_arr && female_chart_arr[11], male_chart_arr && male_chart_arr[11]],
  ]
  return (
    <Chart
      width={600}
      height={400}
      chartType="ColumnChart"
      loader={<div>Loading Chart</div>}
      data={chartData}
      options={{
        title: 'Number of new members',
        chartArea: { width: '80%', height: '70%' },
        hAxis: {
          title: 'Month',
          minValue: 0,
        },
        vAxis: {
          title: 'New Members',
        },
      }}
      legendToggle
    />
  )
}

export default Charts;