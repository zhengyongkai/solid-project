const xAxis = {};

const gridOptions = {
  left: "1%",
  right: "1%",
  bottom: "3%",
  containLabel: true,
};

const tooltipOptions = {
  trigger: "axis",
  axisPointer: {
    type: "cross",
    label: {
      backgroundColor: "#6a7985",
    },
  },
};
export { xAxis, gridOptions, tooltipOptions };
