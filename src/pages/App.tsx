import React, {lazy, Suspense} from 'react'
import ROUTES from '../router/index'
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import TemplateStore from "../store/templateStore";
import {Provider} from "mobx-react";
import Login from './Login';

const Home = lazy(() => import('./Home'))

const rootStore = {
    templateStore: new TemplateStore(),
};

const App: React.FC = (props: any) => {
    return (
        //BrowserRouter使用 HTML5 提供的 history API可以保证你的 UI 界面和 URL 保持同步，
        <Provider {...rootStore}>
            <BrowserRouter>
                <Suspense fallback={null}>
                    <Switch>
                        <Route path={ROUTES.HOME} component={Home}/>
                        <Route path={ROUTES.LOGIN} component={Login}/>
                        <Redirect from={ROUTES.ROOT} to={ROUTES.DEFAULT_ROUTE}/>
                    </Switch>
                </Suspense>
            </BrowserRouter>
        </Provider>

    )
}


export default App
