import { Col, Row } from "cui-solid";

import { createSignal, onMount } from "solid-js";

import type { lineOptionsInf, seriesInf } from "@/types/echarts";
import PanelGroup from "./components/PanelGroup/PanelGroup";

import Styles from "./css/home.module.scss";
import Card from "@/components/layout/Card/Card";
import Online from "./components/Statistics/Online";
import { getOnLineStatistics } from "@/api/home";

export default function Administrator() {
  const [onLineData, setOnLineData] = createSignal<seriesInf[]>([]);

  async function loadOnlineData() {
    console.log("ddd");
    let {
      data: { list },
    } = await getOnLineStatistics();
    setOnLineData(list);
  }

  onMount(() => {
    loadOnlineData();
  });

  return (
    <div>
      <div class={Styles["home_panel_wrapper"]}>
        <PanelGroup onClick={() => loadOnlineData()}></PanelGroup>
      </div>
      <Card>
        <Row>
          <Col grid={1}>
            <Online data={onLineData()}></Online>
          </Col>
        </Row>
      </Card>
    </div>
  );
}
