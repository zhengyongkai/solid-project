import type { LineOptionsInf, LineSeries } from "@/types/echarts";
import { createSignal } from "solid-js";
import Echarts from "@/components/Echarts/Echarts";

export default function OnLineLine() {
  let [options, _setOption] = createSignal<LineOptionsInf<LineSeries[]>>({
    xAxis: {
      type: "category",
      data: ["第一季度", "第二季度", "第一季度", "第一季度"],
    },

    series: [
      {
        name: "BiliBili",
        type: "line",
        data: [100, 150, 300, 400],
      },
      {
        name: "Youtube",
        type: "line",
        data: [100, 120, 161, 134],
      },
    ],
  });

  return <Echarts options={options()} height={300}></Echarts>;
}
