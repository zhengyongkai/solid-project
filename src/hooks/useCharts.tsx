import * as echarts from 'echarts';
import { onMount } from 'solid-js';

const useEcharts = function () {
  let myChart;
  const echart = null;
  onMount(() => {
    setTimeout(() => {
      console.log(myChart);
    }, 3000);
    function resize() {
      console.log('dsad', myChart);
      myChart?.resize();
    }
    window.addEventListener('resize', resize);
  });

  function setOptions(options: echarts.EChartsOption) {
    setTimeout(() => {
      myChart?.setOption(options);
    }, 200);
  }

  return [myChart, setOptions];
};

export default useEcharts;
