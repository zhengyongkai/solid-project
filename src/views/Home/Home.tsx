import { Col, Row } from 'cui-solid';
import { Line } from 'solid-chartjs';

import PanelGroup from './components/PanelGroup/PanelGroup';

import Styles from './css/home.module.scss';
import { LineInf } from '@/types/echarts';
import useCharts from '@/hooks/useCharts';
import { onMount } from 'solid-js';

export default function Administrator() {
  let { chartData, setChartData, chartOptions } = useCharts<LineInf>({
    labels: [],
    datasets: [],
  });
  onMount(() => {
    setChartData({
      labels: ['January', 'February', 'March', 'April', 'May'],
      datasets: [
        {
          label: 'Sales',
          data: [50, 60, 70, 80, 90],
        },
      ],
    });
  });
  return (
    <div>
      <div class={Styles['home_panel_wrapper']}>
        <PanelGroup></PanelGroup>
      </div>
      <div>
        {/* <Card title="设备情况" more width="500px" height="200px">
          dasd
        </Card> */}
        <Row>
          <Col>
            <Line
              data={chartData()}
              options={{
                responsive: true,
                maintainAspectRatio: false,
              }}
              height={300}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
}
