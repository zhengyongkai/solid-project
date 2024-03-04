import { render } from 'solid-js/web';
import { HashRouter } from '@solidjs/router';

import './index.css';
import { asyncRoutes } from '@/router/index';
import 'cui-solid/dist/styles/cui.css';
import '@/assets/styles/cui.scss';
import '@/assets/styles/index.scss';

import 'virtual:svg-icons-register';

import { I18nProvider } from 'solid-i18n';
import i18n from './locale';
import useCommonStore from '@/stores/common/index';

const [language] = useCommonStore().lang;

const lang = i18n.getInstance(language());

render(
  () => (
    <I18nProvider i18n={lang}>
      <HashRouter>{asyncRoutes}</HashRouter>
    </I18nProvider>
  ),
  document.getElementById('root')!
);
