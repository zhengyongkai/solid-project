import { lineOptionsInf } from "@/types/echarts";
import { createSignal, onMount } from "solid-js";
import Echarts from "@/components/Echarts/Echarts";
import { getOnLineStatistics } from "@/api/home";

export default function Online() {
  let [options, setOption] = createSignal<lineOptionsInf>({
    xAxis: {
      type: "category",
      data: ["新用戶", "新消息", "余额", "商品"],
    },
    series: [],
  });

  async function loadOnlineData() {
    let {
      data: { list },
    } = await getOnLineStatistics();
    setOption({
      ...options(),
      series: list,
    });
  }

  onMount(() => {
    loadOnlineData();
  });
  return <Echarts options={options()} height={300}></Echarts>;
}
