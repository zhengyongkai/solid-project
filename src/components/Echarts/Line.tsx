import * as echarts from 'echarts';
import { onCleanup, onMount } from 'solid-js';

export default function LineEcharts() {
  let ref: HTMLDivElement | undefined;
  let charts: echarts.ECharts | null = null;

  function resize() {
    console.log(charts);
    charts.resize();
  }
  onMount(() => {
    charts = echarts.init(ref);
    charts.setOption({
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type: 'line',
        },
      ],
    });

    window.addEventListener('resize', resize);
  });

  onCleanup(() => {
    charts = null;
    window.removeEventListener('resize', resize);
  });

  return (
    <>
      <div ref={ref} style={{ width: '100%', height: '300px' }}></div>
    </>
  );
}
