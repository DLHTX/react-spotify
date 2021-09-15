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

const Discovery = () => {
  const [state, personalizedSonglistFn] = useAsyncFn(
    personalizedSongApi.getPersonalizedSonglist,
  )
  const { value: songlist = [], loading: isGettingSonglist } = state || {}

  const [songlistStateHY, getSonglistsFnHY] = useAsyncFn(
    songlistsApi.getSonglists,
  )
  const [songlistStateLX, getSonglistsFnLX] = useAsyncFn(
    songlistsApi.getSonglists,
  )

  const [songlistStateYG, getSonglistsFnYG] = useAsyncFn(
    songlistsApi.getSonglists,
  )

  useEffect(() => {
    personalizedSonglistFn({ limit: 10 })
    getSonglistsFnHY({ limit: 10, cat: '华语' })
    getSonglistsFnLX({ limit: 10, cat: '流行' })
    getSonglistsFnYG({ limit: 10, cat: '摇滚' })
  }, [])

  const CAT_FN_LIST = [
    {
      id: 0,
      title: '华语音乐歌单',
      subTitle: '本年度最受欢迎华语音乐',
      source: songlistStateHY,
    },
    {
      id: 1,
      title: '流行音乐歌单',
      subTitle: '就在这梦幻般的韵律中沉醉吧',
      source: songlistStateLX,
    },
    {
      id: 2,
      title: '国摇金属:梦与花火怒放的桀骜篇章',
      subTitle: '一代人青春里无法抹掉的记忆',
      source: songlistStateYG,
    },
  ]

  return (
    <div className={`px-6 py-4 ${styles.root}`}>
      <LinkTitle
        title={'推荐的热门歌单'}
        subTitle={'本年度最受欢迎的新节目'}
        route={'/songlist'}
      ></LinkTitle>
      {isGettingSonglist ? (
        <LoadingButton></LoadingButton>
      ) : (
        <SongList data={songlist}></SongList>
      )}

      {CAT_FN_LIST.map((cat) => {
        return (
          <div>
            <LinkTitle
              title={cat.title}
              subTitle={cat.subTitle}
              route={'/songlist'}
              className={'mt-10'}
            ></LinkTitle>
            <div className={'flex mt-4 overflow-hidden'}>
              {cat.source.value?.playlists.map((item, index) => {
                return (
                  <SongListItem
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    playCount={item.playCount}
                    picUrl={item.coverImgUrl}
                  ></SongListItem>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default inject('templateStore')(observer(Discovery))
