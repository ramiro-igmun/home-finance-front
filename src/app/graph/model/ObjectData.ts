import {ChartType} from "chart.js";

export interface ObjectData {
  datasets: {
    data: {x: string, y: number}[],
    label: string,
    type: ChartType
  }[];
}
