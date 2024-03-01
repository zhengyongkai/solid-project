import { render } from 'solid-js/web';
import { Router, Route } from '@solidjs/router';

import './index.css';
import { baseRoutes, asyncRoutes } from '@/router/index';
import 'cui-solid/dist/styles/cui.css';
import '@/assets/styles/cui.scss';

import 'virtual:svg-icons-register';

import { TransProvider, Trans } from '@mbarzda/solid-i18next';

// function renderRoute() {
//   return [...baseRoutes, ...asyncRoutes].map((item) => {
//     return item;
//   });
// }

const resources = {
  lt: { hello: '你好' },
  pl: { hello: 'Hello ' },
};

render(
  () => (
    <TransProvider options={{ resources }} lng="lt">
      <Router>{asyncRoutes}</Router>
    </TransProvider>
  ),
  document.getElementById('root')!
);
