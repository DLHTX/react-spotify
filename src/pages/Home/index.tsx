import React, { Suspense } from 'react'
import { inject, observer } from 'mobx-react'
import { Button, Layout } from 'antd'
import { ITemplateStore } from '../../store/interface/ITemplateStore'
import { Redirect, Route, Switch } from 'react-router-dom'
import ROUTES from '../../router'
import Login from '../Login'
import Discovery from './Discovery'
import { Content } from 'antd/es/layout/layout'
import SiderBar from '../../components/Sider'
import HeaderBar from '../../components/Header'
import Search from './Search'
import FooterBar from '../../components/FooterBar'
import PlayList from './Discovery/PlayList'
import useAudio from '../../hooks/useAudio'
import { IMusicStore } from '../../store/interface/IMusicStore'

const Home = (props: { MusicStore: IMusicStore }) => {
  const [audio, audioState, audioControls, audioRef] = useAudio({
    src: props.MusicStore.state.musicUrl,
    autoPlay: true,
    // onEnded: () => playNextMusic(),
    // onError: () => {
    //   if (playMode === MODE.SINGLE_CYCLE) {
    //     return
    //   }
    //   playNextMusic()
    // },
  })

  return (
    <Layout className={'h-full ant-layout-has-sider'}>
      {audio}
      <SiderBar></SiderBar>
      <Layout>
        <HeaderBar></HeaderBar>
        <Content
          style={{
            marginTop: '64px',
            background: '#121212',
            color: 'white',
          }}
        >
          <Suspense fallback={null}>
            <Switch>
              <Route path={ROUTES.HOME_DISCOVERY} component={Discovery} />
              <Route path={ROUTES.HOME_SEARCH} component={Search} />
              <Route path={ROUTES.PLAYLIST_ID} component={PlayList} />
              <Redirect path="/" to={{ pathname: ROUTES.HOME_DISCOVERY }} />
            </Switch>
          </Suspense>
        </Content>
      </Layout>
      <FooterBar></FooterBar>
    </Layout>
  )
}

export default inject('MusicStore')(observer(Home))
