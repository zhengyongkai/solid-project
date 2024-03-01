import { createSignal, onMount } from 'solid-js';
import { Chart, Title, Tooltip, Legend, Colors } from 'chart.js';

export default function useCharts<T>(params: T) {
  onMount(() => {
    Chart.register(Title, Tooltip, Legend, Colors);
  });
  const [chartData, setChartData] = createSignal<T>(params);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return { chartData, setChartData, chartOptions };
}
