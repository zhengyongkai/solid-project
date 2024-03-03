import { render } from 'solid-js/web';
import { Navigate, Route, Router } from '@solidjs/router';

import './index.css';
import { asyncRoutes } from '@/router/index';
import 'cui-solid/dist/styles/cui.css';
import '@/assets/styles/cui.scss';

import 'virtual:svg-icons-register';

import { I18nProvider } from 'solid-i18n';
import i18n from './locale';
import useCommonStore from './stores/common/Index';

const [language] = useCommonStore().lang;

const lang = i18n.getInstance(language());

render(
  () => (
    <I18nProvider i18n={lang}>
      <Router>{asyncRoutes}</Router>
    </I18nProvider>
  ),
  document.getElementById('root')!
);
