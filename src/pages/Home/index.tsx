import React, {Suspense} from 'react';
import HelloWorld from "../../components/ComponentsTemplate";
import {inject, observer} from "mobx-react";
import {Button, Layout} from "antd"
import {ITemplateStore} from "../../store/interface/ITemplateStore";
import {Redirect, Route, Switch} from "react-router-dom";
import ROUTES from "../../router";
import Login from "../Login";
import Discovery from './Discovery';
import {Header} from 'antd/lib/layout/layout';
import Sider from 'antd/lib/layout/Sider';
import {Content} from "antd/es/layout/layout";
import SiderBar from "../../components/Sider";
import HeaderBar from "../../components/Header";


const Home = (props: { templateStore: ITemplateStore }) => {
    return (
        <Layout className={'h-full ant-layout-has-sider'}>
            <SiderBar></SiderBar>
            <Layout>
                <HeaderBar></HeaderBar>
                <Content>
                    <Suspense fallback={null}>
                        <Switch>
                            <Route path={ROUTES.HOME_DISCOVERY} component={Discovery}/>
                        </Switch>
                    </Suspense>
                </Content>
            </Layout>
        </Layout>
    )
}

export default inject('templateStore')(observer(Home));


