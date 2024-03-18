import { Accessor } from "solid-js";
// series 基本数据类型
export interface seriesInf {
  name: string;
  type: string;
  data: number[];
}

// echarts 基本数据类型
export interface lineOptionsInf {
  xAxis: echarts.XAXisComponentOption;
  series: seriesInf[];
  legend?: echarts.LegendComponentOption;
  yAxis?: echarts.YAXisComponentOption;
  grid?: echarts.GridComponentOption;
  tooltip?: echarts.TooltipComponentOption;
}

// echarts 组件基本设置
export type echartsInf = {
  options: lineOptionsInf;
};
