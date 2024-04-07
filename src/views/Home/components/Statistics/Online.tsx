import { lineOptionsInf, seriesInf } from "@/types/echarts";
import { createEffect, createSignal, on, onMount } from "solid-js";
import Echarts from "@/components/Echarts/Echarts";
import { getOnLineStatistics } from "@/api/home";
import { destructure } from "@solid-primitives/destructure";

interface OnlineProps {
  data: seriesInf[];
}

export default function Online(props: OnlineProps) {
  let { data } = destructure(props);
  let [options, setOption] = createSignal<lineOptionsInf>({
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
