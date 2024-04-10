import type { LineOptionsInf, PieSeries } from "@/types/echarts";
import { createSignal } from "solid-js";
import Echarts from "@/components/Echarts/Echarts";
import { defaultTooltipOptions } from "@/components/Echarts/options/default";

export default function OnlinePie() {
  let [options, _setOption] = createSignal<LineOptionsInf<PieSeries[]>>({
    xAxis: {
      type: "category",
      data: ["新用戶", "新消息", "余额", "商品"],
    },
    series: [
      {
        type: "pie",
        roseType: "radius",
        radius: [15, 70],
        center: ["50%", "50%"],
        data: [
          { value: 320, name: "Industries" },
          { value: 240, name: "Technology" },
          { value: 149, name: "Forex" },
          { value: 100, name: "Gold" },
          { value: 59, name: "Forecasts" },
        ],
        animationEasing: "cubicInOut",
        animationDuration: 3000,
      },
    ],
  });

  return <Echarts options={options()} height={300}></Echarts>;
}
