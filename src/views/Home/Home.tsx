import { Col, Row } from "cui-solid";

import { createSignal, onMount } from "solid-js";

import PanelGroup from "./components/PanelGroup/PanelGroup";

import Styles from "./css/home.module.scss";
import Card from "@/components/layout/Card/Card";
import Online from "./components/Statistics/OnlineBar";
import { getOnLineStatistics } from "@/api/home";
import Loading from "@/components/common/Loading/Loading";
import OnlinePie from "./components/Statistics/OnLinePie";

import type { barSeries } from "@/types/echarts";
import OnLineLine from "./components/Statistics/OnLineLine";

export default function Administrator() {
  const [onLineData, setOnLineData] = createSignal<barSeries[]>([]);
  const [loading, setLoading] = createSignal(false);

  async function loadOnlineData() {
    setLoading(true);
    let {
      data: { list },
    } = await getOnLineStatistics();
    setOnLineData(list);
    setLoading(false);
  }

  onMount(() => {
    loadOnlineData();
  });

  return (
    <div>
      <div class={Styles["home_panel_wrapper"]}>
        <PanelGroup onClick={() => loadOnlineData()}></PanelGroup>
      </div>
      <Card class={Styles["home_panel_wrapper"]}>
        <Row>
          <Col grid={1}>
            <div>
              <Loading loading={loading()}>
                <Online data={onLineData()}></Online>
              </Loading>
            </div>
          </Col>
        </Row>
      </Card>

      <Row gutter={20}>
        <Col xs={{ grid: 1 }} xl={{ grid: 1 / 2 }} md={{ grid: 1 / 2 }}>
          <Card>
            <OnlinePie></OnlinePie>
          </Card>
        </Col>

        <Col xs={{ grid: 1 }} xl={{ grid: 1 / 2 }} md={{ grid: 1 / 2 }}>
          <Card>
            <OnLineLine></OnLineLine>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
