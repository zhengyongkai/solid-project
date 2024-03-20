import { RectNode, RectNodeModel, h } from "@logicflow/core";

class UserTaskView extends RectNode {
  getLabelShape() {
    const { model } = this.props;
    const { x, y, width, height } = model;
    const style = model.getNodeStyle();
    return h(
      "svg",
      {
        x: x - width / 2 + 5,
        y: y - height / 2 + 5,
        width: 25,
        height: 25,
        viewBox: "0 0 1274 1024",
      },
      [
        h("path", {
          fill: style.stroke,
          d: "M690.366075 350.568358c0-98.876614-79.937349-179.048571-178.558027-179.048571-98.59935 0-178.515371 80.150629-178.515371 179.048571 0 98.833958 79.916021 178.963259 178.515371 178.963259C610.428726 529.531617 690.366075 449.380988 690.366075 350.568358M376.140632 350.568358c0-75.159877 60.72082-136.072649 135.667416-136.072649 74.989253 0 135.667416 60.912772 135.667416 136.072649 0 75.117221-60.678164 136.029993-135.667416 136.029993C436.861451 486.577022 376.140632 425.664251 376.140632 350.568358M197.284012 762.923936 197.284012 778.472049l15.526785 0 291.255186 0.127968L819.784387 778.472049l15.569441 0 0-15.548113c0-139.783721-136.413897-285.581938-311.026243-273.275681-10.002833 0.703824-24.740482 9.128385-34.658002 9.938849-8.573857 0.74648 13.692577 8.232609 14.396401 16.827793 9.021745-0.789136 6.313088 13.095393 15.505457 13.095393 150.597017 0 263.14488 103.07823 263.14488 224.62651l15.441473-15.590769-285.816546-0.042656-278.991585 1.81288 15.526785 15.612097c0-82.752645 75.095893-152.70849 136.861785-191.824044 7.25152-4.58552 8.659169-17.659585 4.862784-22.906273-6.846288-9.426977-19.877697-8.701825-28.046322-6.014496C285.262018 560.521203 197.284012 667.758394 197.284012 762.923936",
        }),
        h("path", {
          fill: style.stroke,
          d: "M512.31992 1.535616c-282.766642 0-512.021328 228.89211-512.021328 511.210864 0 282.46805 229.254686 511.25352 512.021328 511.25352 117.431975 0 228.828126-39.606098 318.810964-111.204199 10.791969-8.488545 12.540865-24.22861 3.988336-34.99925-8.616513-10.770641-24.356578-12.540865-35.127218-3.94568-81.174373 64.538532-181.586603 100.241606-287.650754 100.241606-255.210864 0-462.028493-206.561693-462.028493-461.367325 0-254.762976 206.817629-461.303341 462.028493-461.303341 255.210864 0 462.092477 206.561693 462.092477 461.303341 0 87.380821-24.33525 171.093227-69.614596 243.651087-7.272848 11.645089-3.668416 27.086562 8.040657 34.35941 11.709073 7.272848 27.10789 3.62576 34.402066-7.976672 50.184787-80.406565 77.143381-173.247355 77.143381-270.055153C1024.383904 230.427726 795.10789 1.535616 512.31992 1.535616z",
        }),
      ]
    );
  }
  getShape() {
    const { model } = this.props;
    const { x, y, width, height, radius, properties } = model;
    const style = model.getNodeStyle();
    console.log(properties);
    return h("g", {}, [
      h("rect", {
        ...style,
        x: x - width / 2,
        y: y - height / 2,
        rx: radius,
        ry: radius,
        width,
        height,
      }),
      this.getLabelShape(),
    ]);
  }
}

class UserTaskModel extends RectNodeModel {
  setAttributes() {
    const size = this.properties.scale || 1;
    this.width = 100 * size;
    this.height = 80 * size;
  }
  getTextStyle() {
    const style = super.getTextStyle();
    style.fontSize = 12;
    const properties = this.properties;
    style.color = properties.disabled ? "red" : "rgb(24, 125, 255)";
    return style;
  }
  getNodeStyle() {
    const style = super.getNodeStyle();
    const properties = this.properties;
    if (properties.disabled) {
      style.stroke = "red";
    } else {
      style.stroke = "rgb(24, 125, 255)";
    }
    return style;
  }
  getAnchorStyle() {
    const style = super.getAnchorStyle(null);
    style.stroke = "rgb(24, 125, 255)";
    style.r = 3;
    style.hover.r = 8;
    style.hover.fill = "rgb(24, 125, 255)";
    style.hover.stroke = "rgb(24, 125, 255)";
    return style;
  }
  getAnchorLineStyle() {
    const style = super.getAnchorLineStyle(null);
    style.stroke = "yellow";
    return style;
  }
  getOutlineStyle() {
    const style = super.getOutlineStyle();
    style.stroke = "red";
    style.hover!.stroke = "red";
    return style;
  }
}

export default {
  type: "custom-rect",
  view: UserTaskView,
  model: UserTaskModel,
};
