import { Col, Row } from 'cui-solid';

import PanelGroup from './components/PanelGroup/PanelGroup';

import Styles from './css/home.module.scss';
import { LineInf } from '@/types/echarts';
import useCharts from '@/hooks/useCharts';
import { onMount } from 'solid-js';
import { ECharts, EChartsAutoSize } from 'echarts-solid';
import LineEcharts from '@/components/Echarts/Line';

export default function Administrator() {
  let [echart, setOptions] = useCharts();

  onMount(() => {});
  return (
    <div style={{ width: '100%', height: '500px' }}>
      <LineEcharts></LineEcharts>
    </div>
  );
}
