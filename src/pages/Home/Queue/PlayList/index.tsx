import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import useAsyncFn from '../../../../hooks/useAsyncFn'
import songListApi from '../../../../apis/songlist'
import { IGetSonglistsDetailRequest } from '../../../../apis/types/songlist'
import PlayLists from '../../../../components/PlayLists'
import PlayListInfoHeader from './PlayListInfoHeader'
import styles from './style.module.css'
import PlayButton from '../../../../components/Buttons/PlayButton'
import LoadingButton from '../../../../components/Buttons/LoadingButton'

const QueuePlayList = () => {
  const [state, getSongListDetailFn] = useAsyncFn(songListApi.getSongListDetail)
  const { id }: any = useParams()

  const { value: songlist = [], loading: isLoading } = state || {}

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
                <PlayButton size={50}></PlayButton>
              </div>
              <PlayLists data={state.value?.playlist.tracks}></PlayLists>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default QueuePlayList
