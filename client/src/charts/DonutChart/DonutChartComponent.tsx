import React, { useEffect, useCallback, useState } from 'react'
import * as d3 from 'd3'
import { IDonutChartProps } from '../../interfaces'
import DonutChartHelper from './DonutChartHelper'

const DonutChart = ( props : IDonutChartProps ) => {

  const [loaded, setLoaded] = useState(false)

  const [prevHeight, setPrevHeight] = useState(props.dimensions.height)
  const [prevWidth, setPrevWidth] = useState(props.dimensions.width)

  const memoizedDrawCallback = useCallback(() => {
    d3.select('#chart-group').selectAll('*').remove()
  }, [])

  const memoizedUpdateCallback = useCallback(() => {
    const scales = DonutChartHelper.getScales(props.data, props.dimensions.boundedWidth, props.dimensions.boundedHeight, props.propertiesNames)
    const bounds = d3.select('#bounds')

    const radius = Math.min(props.dimensions.width, props.dimensions.height) / 2 - props.dimensions.margin.left

    const pieSvg = bounds
      .select('#chart-group')
      .append('svg')
      .attr('width', props.dimensions.width)
      .attr('height', props.dimensions.height)
      .append('g')
      .attr('transform', `translate(${  props.dimensions.width / 2  },${  props.dimensions.height / 2  })`);

    const pie = d3.pie()
      .sort(null)
      // @ts-ignore
      .value((d) => d.value)

    // @ts-ignore
    const pieData = pie(props.data)

    const arc = d3.arc()
      .innerRadius(radius * 0.5)
      .outerRadius(radius * 0.8)

    const outerArcForLabelsPosition = d3.arc()
      .innerRadius(radius * 0.9)
      .outerRadius(radius * 0.9)

    pieSvg
      .selectAll('allSlices')
      .data(pieData)
      .enter()
      .append('path')
      // @ts-ignore
      .attr('d', arc)
      // @ts-ignore
      .attr('fill', (d) => { return (scales.color(d.data.name)) })
      .attr('stroke', 'black')
      .style('stroke-width', '2px')
      .style('opacity', 0.7)

    pieSvg
      .selectAll('allPolylines')
      .data(pieData)
      .enter()
      .append('polyline')
      .attr('stroke', 'black')
      .style('fill', 'none')
      .attr('stroke-width', 1)
      // @ts-ignore
      .attr('points', (d) => {
        // @ts-ignore
        const posA = arc.centroid(d)
        // @ts-ignore
        const posB = outerArcForLabelsPosition.centroid(d)
        // @ts-ignore
        const posC = outerArcForLabelsPosition.centroid(d);
        const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
        posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1);
        return [posA, posB, posC]
      })

    pieSvg
      .selectAll('allLabels')
      .data(pieData)
      .enter()
      .append('text')
      // @ts-ignore
      .text(  (d) => { return d.data.name } )
      .attr('transform', (d) => {
        // @ts-ignore
        const pos = outerArcForLabelsPosition.centroid(d);
        const midAngle = d.startAngle + (d.endAngle - d.startAngle) / 2
        pos[0] = radius * 0.99 * (midAngle < Math.PI ? 1 : -1);
        return `translate(${  pos  })`;
      })
      .style('text-anchor', (d) => {
        const midAngle = d.startAngle + (d.endAngle - d.startAngle) / 2
        return (midAngle < Math.PI ? 'start' : 'end')
      })
      .style('fill', 'black')

  }, [props.data, props.dimensions, props.propertiesNames])

  useEffect(() => {
    if (!loaded) {
      setLoaded(true)
      memoizedDrawCallback()
      memoizedUpdateCallback()
    } else {
      memoizedUpdateCallback()
    }
  }, [loaded, memoizedDrawCallback, memoizedUpdateCallback])

  useEffect(() => {
    const isNewHeight = prevHeight !== props.dimensions.height
    const isNewWidth = prevWidth !== props.dimensions.width
    if (isNewHeight || isNewWidth) {
      setPrevWidth(props.dimensions.height)
      setPrevHeight(props.dimensions.width)
      memoizedDrawCallback()
      memoizedUpdateCallback()
    }
  }, [memoizedDrawCallback, memoizedUpdateCallback, prevHeight, prevWidth, props.dimensions.height, props.dimensions.width])

  return (
    <div id="div">
      <svg id="wrapper" width={props.dimensions.width} height={props.dimensions.height}>
        <g
          id="bounds"
          style={{ transform: `translate(${props.dimensions.margin.left}px, ${props.dimensions.margin.top}px)` }}
        >
          <g
            id="chart-group"
          />
        </g>
      </svg>
    </div>
  )
}

export default DonutChart;