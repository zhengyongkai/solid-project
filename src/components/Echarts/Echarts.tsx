import type { echartsInf } from "@/types/echarts";
import * as echarts from "echarts";
import { Ref, onCleanup, onMount } from "solid-js";

import { gridOptions, tooltipOptions } from "./options/default";

export interface linePropsInf extends echartsInf {
  height: number;
  ref?: (params: refFn) => void;
}

export interface refFn {
  increment: (value: echarts.SeriesOption) => void;
}

export default function LineEcharts(props: linePropsInf) {
  const {
    height,
    options: {
      xAxis,
      series,
      legend,
      yAxis = { type: "value" },
      grid = gridOptions,
      tooltip = tooltipOptions,
    },
    ref,
  } = props;

  let chartsRef: HTMLDivElement | undefined;
  let charts: echarts.ECharts | null = null;

  function resize() {
    charts?.resize();
  }

  onMount(() => {
    charts = echarts.init(chartsRef);
    charts.setOption({
      legend: {
        data: legend,
      },
      tooltip,
      grid,
      xAxis,
      yAxis,
      series,
    });
    window.addEventListener("resize", resize);
  });

  onCleanup(() => {
    charts = null;
    window.removeEventListener("resize", resize);
  });

  ref?.({
    increment(value) {
      charts?.setOption({
        ...charts.getOption(),
        series: value,
      });
    },
  });

  return (
    <>
      <div
        ref={chartsRef}
        style={{ width: "100%", height: `${height}px` }}
      ></div>
    </>
  );
}
