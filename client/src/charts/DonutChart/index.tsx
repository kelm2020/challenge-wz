import React, { useEffect, useRef, useState } from 'react'
import { CircularProgress } from '@material-ui/core'
import { DataChart, Dimensions } from '../../interfaces'
import useWindowDimensions from '../../utils/WindowDimensions'

import DonutChart from './DonutChartComponent'
import ChartHelper from './DonutChartHelper'

const DonutChartWidget = () => {
  
  const [data, setData] = useState<DataChart[]>([{}])
  const [propertiesNames] = useState(['name', 'value'])
  const { width, height } = useWindowDimensions()
  const dimensions = useRef() as { current: Dimensions }
  dimensions.current = ChartHelper.getDimensions(width * 0.9, height * 0.9, 30, 50, 10, 50)

  useEffect(() => {
    (dimensions as unknown as { current: Dimensions }).current = ChartHelper.getDimensions(width * 0.9, height * 0.9, 30, 50, 10, 50)
  }, [width, height, dimensions])

  const getAgents = React.useCallback(async () => {
    try {
      const response = await fetch('http://localhost:5000/agents')
      const data = await response.json()
      let dataChart = []
      data.json.data.forEach((agent) => {
        dataChart.push({ name: agent.name, value: agent.total_alerts })
      })
      setData(dataChart)
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    if (data.length <= 1)
      getAgents()
  })

  return (
    <>
      {data.length > 1 ? (
        <div style={{ width: '100%' }}>
          <DonutChart dimensions={dimensions.current} data={data} propertiesNames={propertiesNames} />
        </div>
      ) : (
        <CircularProgress />
      )}
    </>
  )
}

export default DonutChartWidget;

