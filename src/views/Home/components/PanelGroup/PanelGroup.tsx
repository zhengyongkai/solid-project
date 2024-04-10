import SvgIcon from "@/components/common/SvgIcon";

import Styles from "../css/parnelGroup.module.scss";
import { Col, CountUp, Row } from "cui-solid";

import locale from "@/locale";
import Loading from "@/components/common/Loading/Loading";

interface PanelGroupProps {
  onClick: Function;
}

export default function PanelGroup(props: PanelGroupProps) {
  const { onClick } = props;
  const chartList = [
    {
      type: locale.t("home.visit"),
      icon: "user",
      num: 102400,
      color: "#40c9c6",
    },
    {
      type: locale.t("home.message"),
      icon: "message",
      num: 81212,
      color: "#36a3f7",
    },
    {
      type: locale.t("home.purchase"),
      icon: "pay-circle",
      num: 9280,
      color: "#f4516c",
    },
    {
      type: locale.t("home.shoppings"),
      icon: "shopping-cart",
      num: 13600,
      color: "#f6ab40",
    },
  ];

  return (
    <>
      <div class={Styles["panel_group_items_wrapper"]}>
        <Row gutter={16}>
          {chartList.map((item) => {
            return (
              <Col xs={{ grid: 1 }} xl={{ grid: 1 / 4 }} md={{ grid: 1 / 2 }}>
                <div
                  class={Styles["panel_group_item_wrapper"]}
                  onClick={() => onClick()}
                >
                  <div>
                    <SvgIcon size={48} name={item.icon} />
                  </div>
                  <div class={Styles["panel_group_item_content"]}>
                    <div>{item.type}</div>
                    <div>
                      <CountUp value={item.num}></CountUp>
                    </div>
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
      </div>
    </>
  );
}
