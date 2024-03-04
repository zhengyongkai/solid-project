import { comBineCss } from "@/utils/css";
import { useContext } from "solid-js";
import { CounterContext } from "./provider/provide";

export interface propsInf {
  span?: number;
  offset?: number;
  pull?: number;
  push?: number;
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  children: any;
}

export default function Col(props: propsInf) {
  const { span = 24, offset, pull, push, xs, sm, md, lg, xl } = props;

  const { gutter } = useContext(CounterContext);

  let classList: string[] = [];
  let style = {
    "padding-left": "1px0",
    "padding-right": "0",
  };

  if (gutter) {
    style["padding-left"] = gutter / 2 + "px";
    style["padding-right"] = style["padding-left"];
  }

  Object.entries({ span, offset, pull, push }).forEach((prop) => {
    if (prop[1] || prop[1] === 0) {
      if (prop[0] === "span") {
        classList.push(`sui-col-${prop[1]}`);
      } else {
        classList.push(`sui-col-${prop[0]}-${prop[1]}`);
      }
    }
  });

  Object.entries({ xs, sm, md, lg, xl }).forEach((prop) => {
    if (prop[1] || prop[1] === 0) {
      classList.push(`sui-col-${prop[0]}-${prop[1]}`);
    }
  });

  return (
    <div style={{ ...style }} class={comBineCss([...classList, "sui-col"])}>
      {style} {props.children}
    </div>
  );
}
