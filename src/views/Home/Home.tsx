import { Col, Row } from "cui-solid";

import { createSignal, onMount } from "solid-js";
import LineEcharts from "@/components/Echarts/Echarts";
import type { lineOptionsInf } from "@/types/echarts";
import PanelGroup from "./components/PanelGroup/PanelGroup";

import Styles from "./css/home.module.scss";
import Card from "@/components/layout/Card/Card";

export default function Administrator() {
  // let [echart, setOptions] = useCharts();

  let [options, setOption] = createSignal<lineOptionsInf>({
    xAxis: {
      type: "category",
      data: ["xx", "dd", "ee", "ll"],
    },

    series: [
      {
        name: "Email",
        type: "bar",
        data: [1, 3, 4, 5],
      },
    ],
  });

  onMount(() => {
    setTimeout(() => {
      setOption({
        ...options(),
        series: [
          {
            name: "Email",
            type: "bar",
            data: [30, 0, 40, 40],
          },
          {
            name: "xvdieo",
            type: "bar",
            data: [344, 0, 40, 40],
          },
        ],
      });
    }, 3000);
  });
  return (
    <div>
      <div class={Styles["home_panel_wrapper"]}>
        <PanelGroup></PanelGroup>
      </div>
      <Card>
        <Row>
          <Col grid={1}>
            <LineEcharts options={options()} height={300}></LineEcharts>
          </Col>
        </Row>
      </Card>
    </div>
  );
}
