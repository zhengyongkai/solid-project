import type { echartsInf } from "@/types/echarts";
import * as echarts from "echarts";
import { destructure } from "@solid-primitives/destructure";

import { createEffect, on, onCleanup, onMount } from "solid-js";

import { gridOptions, tooltipOptions, yAxisOptions } from "./options/default";

export interface linePropsInf extends echartsInf {
  height: number;
}

export default function LineEcharts(props: linePropsInf) {
  const { height, options } = destructure(props);

  let chartsRef: HTMLDivElement | undefined;
  let charts: echarts.ECharts | null = null;

  createEffect(
    on(options, () => {
      setOptions();
    })
  );

  function resize() {
    charts?.resize();
  }

  function setOptions() {
    const {
      xAxis,
      series,
      legend,
      yAxis = yAxisOptions,
      grid = gridOptions,
      tooltip = tooltipOptions,
    } = options();

    charts?.setOption({
      legend: {
        data: legend,
      },
      tooltip,
      grid,
      xAxis,
      yAxis,
      series,
    });
  }

  onMount(() => {
    charts = echarts.init(chartsRef);
    setOptions();
    window.addEventListener("resize", resize);
  });

  onCleanup(() => {
    charts = null;
    window.removeEventListener("resize", resize);
  });

  return (
    <>
      <div
        ref={chartsRef}
        style={{ width: "100%", height: `${height()}px` }}
      ></div>
    </>
  );
}
