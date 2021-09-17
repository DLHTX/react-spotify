import  { Suspense, useEffect, useMemo } from 'react'
import { inject, observer } from 'mobx-react'
import {  Layout } from 'antd'
import { Redirect, Route, Switch } from 'react-router-dom'
import ROUTES from '../../router'
import Discovery from './Discovery'
import { Content } from 'antd/es/layout/layout'
import SiderBar from '../../components/Sider'
import HeaderBar from '../../components/Header'
import Search from './Search'
import FooterBar from '../../components/FooterBar'
import PlayList from './Discovery/PlayList'
import useAudio from '../../hooks/useAudio'
import {
  IMusicStore,
  MODE,
} from '../../store/interface/IMusicStore'
import Queue from './Queue'
import Genre from './Genre'
import SearchGenre from './Search/SearchGenre'
import Collection from './Collection'
import Lyric from './Lyric'
import Mv from './Mv'

const Home = (props: { MusicStore: IMusicStore }) => {
  const [audio, audioState, audioControls, audioRef] = useAudio({
    src: props.MusicStore.state.musicUrl,
    autoPlay: true,
    onEnded: () => props.MusicStore.PLAY_NEXT_MUSIC(),
    onError: () => {
      if (props.MusicStore.state.playMode === MODE.SINGLE_CYCLE) {
        return
      }
      console.log('播放错误 可能不是会员')
      props.MusicStore.PLAY_NEXT_MUSIC()
    },
  })
  // const playList = props.MusicStore.playList

  const audioInfo = useMemo(() => {
    return {
      audio,
      state: audioState,
      control: audioControls,
      ref: audioRef,
    }
  }, [audio, audioState, audioControls, audioRef])

  useEffect(() => {
    props.MusicStore.SET_AUDIOINFO(audioInfo)
  }, [audioInfo])

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
              <Route path={ROUTES.QUEUE} component={Queue} />
              <Route path={ROUTES.GENRE} component={Genre} />
              <Route path={ROUTES.SEARCH_GENRE} component={SearchGenre} />
              <Route path={ROUTES.COLLECTION} component={Collection} />
              <Route path={ROUTES.COLLECTION_BASE} component={Collection} />
              <Route path={ROUTES.LYRIC} component={Lyric} />
              <Route path={ROUTES.MV} component={Mv} />
              <Redirect from={ROUTES.HOME} to={ROUTES.HOME_DISCOVERY} />
            </Switch>
          </Suspense>
        </Content>
      </Layout>
      <FooterBar></FooterBar>
    </Layout>
  )
}

export default inject('MusicStore')(observer(Home))
