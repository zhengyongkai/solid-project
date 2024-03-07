import useCharts from '@/hooks/useCharts';
import { Line } from 'solid-chartjs';
import { LineInf } from '@/types/echarts';
import Card from '@/components/layout/Card/Card';
import Row from '@/components/Row/Row';
import Col from '@/components/Row/Col';
import PanelGroup from './components/PanelGroup/PanelGroup';

import Styles from './css/home.module.scss';

export default function Administrator() {
  return (
    <div>
      <div class={Styles['home_panel_wrapper']}>
        <PanelGroup></PanelGroup>
      </div>
      <div>
        {/* <Card title="设备情况" more width="500px" height="200px">
          dasd
        </Card> */}
        dasd
      </div>
    </div>
  );
}
