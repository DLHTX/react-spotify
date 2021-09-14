import React, { useEffect } from 'react'
import { inject, observer } from 'mobx-react'
import useAsyncFn from '../../../hooks/useAsyncFn'
import personalizedSongApi from '../../../apis/personalized'
import LinkTitle from '../../../components/LinkTitle'
import SongList from '../../../components/SongList'

const Discovery = () => {
  const [state, personalizedSonglistFn] = useAsyncFn(
    personalizedSongApi.getPersonalizedSonglist
  )
  const { value: songlist = [], loading: isGettingSonglist } = state || {}

  useEffect(() => {
    personalizedSonglistFn({ limit: 10 })
  }, [])

  return (
    <div className={'px-6 py-4'}>
      <LinkTitle
        title={'推荐的热门歌单'}
        subTitle={'本年度最受欢迎的新节目'}
        route={'/songlist'}
      ></LinkTitle>
      <SongList data={songlist}></SongList>
    </div>
  )
}

export default inject('templateStore')(observer(Discovery))
