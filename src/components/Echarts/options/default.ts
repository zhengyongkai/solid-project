const defaultGridOptions = {
  left: "1%",
  right: "1%",
  bottom: "3%",
  containLabel: true,
};

const defaultTooltipOptions: echarts.TooltipComponentOption = {
  trigger: "axis",
  axisPointer: {
    type: "none",
    label: {
      backgroundColor: "#6a7985",
    },
  },
};

const yAxisOptions = { type: "value" };
export { defaultGridOptions, defaultTooltipOptions, yAxisOptions };
