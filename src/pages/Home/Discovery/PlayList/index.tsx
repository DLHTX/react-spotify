import React, {  useEffect } from 'react'
import { useParams } from 'react-router'
import useAsyncFn from '../../../../hooks/useAsyncFn'
import songListApi from '../../../../apis/songlist'
import {
  COLLECT,

} from '../../../../apis/types/songlist'
import PlayLists from '../../../../components/PlayLists'
import PlayListInfoHeader from './PlayListInfoHeader'
import styles from './style.module.css'
import PlayButton from '../../../../components/Buttons/PlayButton'
import LoadingButton from '../../../../components/Buttons/LoadingButton'
import { inject, observer } from 'mobx-react'
import { IMusicStore } from '../../../../store/interface/IMusicStore'
import PauseButton from '../../../../components/Buttons/PauseButton'
import CollectButton from '../../../../components/Buttons/CollectButton'
import { message } from 'antd'

interface IProps {
  MusicStore?: IMusicStore
}
const PlayList: React.FC<IProps> = ({ MusicStore }) => {
  const [state, getSongListDetailFn] = useAsyncFn(songListApi.getSongListDetail)
  const { value: playList = [], loading: isLoading } = state || {}
  const { id }: any = useParams()

  const subscribeSongList = async (t: boolean) => {
    let isCollect: COLLECT = t ? COLLECT.COLLECT : COLLECT.UNCOLLECT
    try {
      let res = await songListApi.subscribeSongList({
        t: isCollect,
        id,
      })
      message.success('操作成功')
    } catch (error) {
      message.error('收藏失败')
    }
  }

  useEffect(() => {
    getSongListDetailFn({ id })
  }, [id])

  return (
    <div className={styles.root}>
      {isLoading ? (
        <LoadingButton></LoadingButton>
      ) : (
        <div>
          <div
            className={styles.filterBg}
            style={{
              backgroundImage: `url(${state.value?.playlist.coverImgUrl})`,
            }}
          ></div>

          <div className={styles.filterBox}>
            <PlayListInfoHeader
              data={state.value?.playlist}
            ></PlayListInfoHeader>
            <div style={{ background: '#00000026' }}>
              <div className={'px-6 py-5 flex relative'}>
                {MusicStore?.audioInfo.state?.paused ? (
                  <PlayButton
                    size={50}
                    onClick={() => {
                      MusicStore?.audioInfo.control?.play()
                    }}
                  ></PlayButton>
                ) : (
                  <PauseButton
                    size={50}
                    onClick={() => {
                      MusicStore?.audioInfo.control?.pause()
                    }}
                  ></PauseButton>
                )}
                <CollectButton
                  style={{ position: 'absolute', left: '80px', top: '-3px' }}
                  onChange={subscribeSongList}
                ></CollectButton>
              </div>
              <PlayLists
                data={state.value?.playlist.tracks}
                trackIds={state.value?.playlist.trackIds}
              ></PlayLists>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default inject('MusicStore')(observer(PlayList))
