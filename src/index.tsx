import { render } from 'solid-js/web';
import { Router, Route } from '@solidjs/router';

import './index.css';
import { baseRoutes, asyncRoutes } from '@/router/index';
import 'cui-solid/dist/styles/cui.css';

// function renderRoute() {
//   return [...baseRoutes, ...asyncRoutes].map((item) => {
//     return item;
//   });
// }

render(() => <Router>{asyncRoutes}</Router>, document.getElementById('root')!);
