import React, { forwardRef, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router'
import useAsyncFn, { AsyncState } from '../../../../hooks/useAsyncFn'
import songListApi from '../../../../apis/songlist'
import { IGetSonglistsDetailRequest } from '../../../../apis/types/songlist'
import PlayLists from '../../../../components/PlayLists'
import PlayListInfoHeader from './PlayListInfoHeader'
import styles from './style.module.css'
import PlayButton from '../../../../components/Buttons/PlayButton'
import LoadingButton from '../../../../components/Buttons/LoadingButton'
import {
  IMyMusic,
  ISimpleMusic,
  ISonglist,
  ITrackIds,
} from '../../../../apis/types/business'
import { inject, observer } from 'mobx-react'
import { IMusicStore } from '../../../../store/interface/IMusicStore'
import PauseButton from '../../../../components/Buttons/PauseButton'

interface IProps {
  MusicStore?: IMusicStore
}
const PlayList: React.FC<IProps> = ({ MusicStore }) => {
  const [state, getSongListDetailFn] = useAsyncFn(songListApi.getSongListDetail)
  const { value: playList = [], loading: isLoading } = state || {}
  const { id }: any = useParams()

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
              <div className={'px-6 py-5'}>
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
