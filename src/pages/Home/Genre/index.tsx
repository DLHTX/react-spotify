import React, { useEffect } from 'react'
import { inject, observer } from 'mobx-react'
import useAsyncFn from '../../../hooks/useAsyncFn'
import personalizedSongApi from '../../../apis/personalized'
import songlistsApi from '../../../apis/songlist'
import LinkTitle from '../../../components/LinkTitle'
import SongList from '../../../components/SongList'
import LoadingButton from '../../../components/Buttons/LoadingButton'
import SongListItem from '../../../components/SongList/SongListItem'
import styles from './style.module.css'
import { useParams } from 'react-router-dom'

const Genre = () => {
  const [state, getSonglistsFn] = useAsyncFn(songlistsApi.getSonglists)

  const param: any = useParams()

  useEffect(() => {
    getSonglistsFn({ limit: 100, cat: param.cat })
  }, [])

  return (
    <div className={`px-6 py-4 ${styles.root}`}>
      <LinkTitle
        title={param.cat}
        route={'/songlist'}
      ></LinkTitle>
      {state.loading ? (
        <LoadingButton></LoadingButton>
      ) : (
        <div className="flex flex-wrap">
          {state.value?.playlists?.map((item, index) => {
            return (
              <SongListItem
                className="mt-4 mr-4"
                style={{ height: '286px', width: '200px', flex: '1' }}
                key={item.id}
                id={item.id}
                name={item.name}
                playCount={item.playCount}
                picUrl={item.coverImgUrl}
              ></SongListItem>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default inject('templateStore')(observer(Genre))
