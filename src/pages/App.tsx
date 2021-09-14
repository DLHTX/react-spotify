import React, { lazy, Suspense } from 'react'
import ROUTES from '../router/index'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import TemplateStore from '../store/templateStore'
import MusicStore from '../store/musicStore'
import { Provider } from 'mobx-react'
import Login from './Login'

const Home = lazy(() => import('./Home'))

const rootStore = {
  templateStore: new TemplateStore(),
  MusicStore: new MusicStore(),
}

const App: React.FC = (props: any) => {

  return (
    //BrowserRouter使用 HTML5 提供的 history API可以保证你的 UI 界面和 URL 保持同步，
    <Provider {...rootStore}>
      <BrowserRouter>
        <Suspense fallback={null}>
          <Switch>
            <Route path={ROUTES.HOME} component={Home} />
            <Route path={ROUTES.LOGIN} component={Login} />
            <Redirect from={ROUTES.HOME} to={ROUTES.DEFAULT_ROUTE} />
          </Switch>
        </Suspense>
      </BrowserRouter>
    </Provider>
  )
}

export default App
function useAudio(arg0: { src: any; autoPlay: boolean; onEnded: () => any; onError: () => void }): [any, any, any, any] {
  throw new Error('Function not implemented.')
}

