import * as d3 from 'd3'
import { DataChart } from '../../interfaces'

export default class DonutChartHelper {

  private readonly metric: string[]

  constructor(metric: string[]) {
    this.metric = metric
  }

  public xAccessor = (d: DataChart) => d[this.metric[0]]
  public yAccessor = (d: DataChart) => d[this.metric[1]]

  static getDimensions = (width: number, height: number, left: number, right: number, top: number, bottom: number) => {
    const dimensions = {
      width,
      height,
      margin: {
        left,
        right,
        top,
        bottom,
      },
      boundedWidth: 0,
      boundedHeight: 0,
    }
    dimensions.boundedWidth = dimensions.width - dimensions.margin.left - dimensions.margin.right
    dimensions.boundedHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom

    return dimensions
  }

  static getScales = (data: DataChart[], width: number, height: number, metric: string[]) => {
    return {
      color: d3
        .scaleOrdinal()
        .domain(
          (d3.extent(data, (d) => {
            return d.name
          }) as unknown) as string
        )
        .range(d3.schemeCategory10)
    }
  }
};
