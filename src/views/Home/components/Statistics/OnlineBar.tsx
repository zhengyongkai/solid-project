import { BarSeries, LineOptionsInf } from "@/types/echarts";
import { createEffect, createSignal, on, onMount } from "solid-js";
import Echarts from "@/components/Echarts/Echarts";
import { destructure } from "@solid-primitives/destructure";
import { defaultTooltipOptions } from "@/components/Echarts/options/default";

interface OnlineProps {
  data: BarSeries[];
}

export default function Online(props: OnlineProps) {
  let { data } = destructure(props);
  let [options, setOption] = createSignal<LineOptionsInf<BarSeries[]>>({
    xAxis: {
      type: "category",
      data: ["新用戶", "新消息", "余额", "商品"],
    },
    series: [],
  });

  createEffect(
    on(data, () => {
      setOption({
        ...options(),
        series: data(),
      });
    })
  );

  return <Echarts options={options()} height={300}></Echarts>;
}
