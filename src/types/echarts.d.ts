import { Accessor } from "solid-js";
// series 基本数据类型

export type BarSeries = echarts.BarSeriesOption;
export type PieSeries = echarts.PieSeriesOption;
export type LineSeries = echarts.LineSeriesOption;
export type MapSeries = echarts.MapSeriesOption;

// echarts 基本数据类型
export interface LineOptionsInf<T> {
  xAxis: echarts.XAXisComponentOption;
  series: T;
  legend?: echarts.LegendComponentOption;
  yAxis?: echarts.YAXisComponentOption;
  grid?: echarts.GridComponentOption;
  tooltip?: echarts.TooltipComponentOption;
  calculable?: boolean;
}

// echarts 组件基本设置
export type EchartsInf = {
  options: lineOptionsInf;
};
