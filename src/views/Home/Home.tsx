import { Col, Row } from "cui-solid-better";

import { createSignal, onMount } from "solid-js";

import type { lineOptionsInf } from "@/types/echarts";
import PanelGroup from "./components/PanelGroup/PanelGroup";

import Styles from "./css/home.module.scss";
import Card from "@/components/layout/Card/Card";
import Online from "./components/Statistics/Online";

export default function Administrator() {
  // let [echart, setOptions] = useCharts();

  let [options, setOption] = createSignal<lineOptionsInf>({
    xAxis: {
      type: "category",
      data: [],
    },
    series: [],
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
            <Online></Online>
          </Col>
        </Row>
      </Card>
    </div>
  );
}
