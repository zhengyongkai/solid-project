import { render } from 'solid-js/web'
import { HashRouter, Navigate, Route, Router } from '@solidjs/router'

import './index.css'
import { asyncRoutes, baseRoutes } from '@/router/index'
import 'cui-solid/dist/styles/cui.css'

import '@/assets/styles/index.scss'
import '@/assets/styles/cui.scss'
import '@/assets/styles/flow.scss'
import '@/assets/styles/svg.scss'

import 'virtual:svg-icons-register'
import 'virtual:uno.css'

import { I18nProvider } from 'solid-i18n'
import i18n from './locale'
import useCommonStore from '@/stores/common/index'
import { routeInf } from './types'
import { lazy } from 'solid-js'

const Home = lazy(() => import('@/components/layout/BaseLayout'))

const [language] = useCommonStore().data.lang

const lang = i18n.getInstance(language())

const renderRouter = (route: routeInf[]) => {
  return route.map((i) => {
    if (i.children?.length) {
      return (
        <Route path={i.path} component={i.component}>
          {renderRouter(i.children)}
        </Route>
      )
    }
    return <Route path={i.path} component={i.component}></Route>
  })
}

render(
  () => (
    <I18nProvider i18n={lang}>
      <Router>
        {renderRouter(baseRoutes)}
        <Route component={Home} path={'/'}>
          <Route path={'*'} component={() => <Navigate href={'/home'}></Navigate>}></Route>
          {renderRouter(asyncRoutes)}
        </Route>
      </Router>
    </I18nProvider>
  ),
  document.getElementById('root')!
)
