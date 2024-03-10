import { Col, Row } from "cui-solid";

import { createSignal, onMount } from "solid-js";
import LineEcharts from "@/components/Echarts/Echarts";
import type { lineOptionsInf } from "@/types/echarts";
import PanelGroup from "./components/PanelGroup/PanelGroup";

import Styles from "./css/home.module.scss";

export default function Administrator() {
  // let [echart, setOptions] = useCharts();
  let ref: any;

  let [options] = createSignal<lineOptionsInf>({
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
      ref?.increment([
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
      ]);
    }, 200);
  });
  return (
    <>
      <div class={Styles["home_panel_wrapper"]}>
        <PanelGroup></PanelGroup>
      </div>
      <div>
        <Row>
          <Col grid={1}>
            <LineEcharts
              options={options()}
              height={300}
              ref={ref}
            ></LineEcharts>
          </Col>
        </Row>
      </div>
    </>
  );
}
