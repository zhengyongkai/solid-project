import SvgIcon from '@/components/common/SvgIcon';

import Styles from '../css/parnelGroup.module.scss';
import { Col, CountUp, Row } from 'cui-solid-better';

export default function PanelGroup() {
  const chartList = [
    {
      type: 'New Visits',
      icon: 'user',
      num: 102400,
      color: '#40c9c6',
    },
    {
      type: 'Messages',
      icon: 'message',
      num: 81212,
      color: '#36a3f7',
    },
    {
      type: 'Purchases',
      icon: 'pay-circle',
      num: 9280,
      color: '#f4516c',
    },
    {
      type: 'Shoppings',
      icon: 'shopping-cart',
      num: 13600,
      color: '#f6ab40',
    },
  ];

  return (
    <>
      <div class={Styles['panel_group_items_wrapper']}>
        <Row gutter={16}>
          {chartList.map((item) => {
            return (
              <Col grid={1 / 4}>
                <div class={Styles['panel_group_item_wrapper']}>
                  <div>
                    <SvgIcon size={48} name={item.icon} />
                  </div>
                  <div class={Styles['panel_group_item_content']}>
                    <div>{item.type}</div>
                    <div>
                      <CountUp value={item.num}></CountUp>
                    </div>
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
      </div>
    </>
  );
}
