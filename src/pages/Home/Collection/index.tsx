import { useEffect } from 'react'
import { inject, observer } from 'mobx-react'
import useAsyncFn from '../../../hooks/useAsyncFn'
import songlistsApi from '../../../apis/songlist'
import LinkTitle from '../../../components/LinkTitle'
import LoadingButton from '../../../components/Buttons/LoadingButton'
import SongListItem from '../../../components/SongList/SongListItem'
import styles from './style.module.css'
import { useHistory, useParams } from 'react-router-dom'
import ROUTES from '../../../router'

const Collection = () => {
  const [state, getSonglistsFn] = useAsyncFn(songlistsApi.getUserSonglist)

  const history = useHistory()

  useEffect(() => {
    if (!localStorage.getItem('userInfo')) {
      history.push(ROUTES.LOGIN)
    } else {
      getSonglistsFn(
        JSON.parse(localStorage.getItem('userInfo') || '{}').account.id,
      )
    }
  }, [])

  return (
    <div className={`px-6 py-4 ${styles.root}`}>
      <LinkTitle title={'我创建的歌单'} route={'/songlist'}></LinkTitle>
      {state.loading ? (
        <LoadingButton></LoadingButton>
      ) : (
        <div className="flex flex-wrap">
          {state.value?.create?.map((item, index) => {
            return (
              <SongListItem
                className="mt-4 mr-4"
                style={{ height: '286px', width: '200px' }}
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

      <LinkTitle
        className="mt-6"
        title={'我收藏的歌单'}
        route={'/songlist'}
      ></LinkTitle>
      {state.loading ? (
        <LoadingButton></LoadingButton>
      ) : (
        <div className="flex flex-wrap">
          {state.value?.collect?.map((item, index) => {
            return (
              <SongListItem
                className="mt-4 mr-4"
                style={{ height: '286px', width: '200px' }}
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

export default inject('templateStore')(observer(Collection))
