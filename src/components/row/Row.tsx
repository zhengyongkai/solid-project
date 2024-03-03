import { comBineCss } from '@/utils/css';
import { createMemo } from 'solid-js';

import './css/row.scss';
import { CounterContext } from './provider/provide';

export interface propsInf {
  gutter?: number;
  type?: string;
  justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between';
  align?: 'top' | 'middle' | 'bottom';
  children: any;
}

export default function Row(props: propsInf) {
  const { justify = 'start', gutter = 0 } = props;

  const style = createMemo(() => {
    const ret = {
      'margin-left': '',
      'margin-right': '0',
    };
    if (props.gutter) {
      ret['margin-left'] = `-${props.gutter / 2}px`;
      ret['margin-right'] = ret['margin-left'];
    }
    return ret;
  });

  return (
    <div
      style={style()}
      class={comBineCss([
        'sui-row',
        props.justify !== 'start' ? `is-justify-${justify}` : '',
        props.align ? `is-align-${props.align}` : '',
        props.type === 'flex' ? 'sui-row--flex' : '',
      ])}
    >
      <CounterContext.Provider value={{ gutter }}>
        {props.children}
      </CounterContext.Provider>
    </div>
  );
}
