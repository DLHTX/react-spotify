import { inject, observer } from 'mobx-react'
import React, { useEffect } from 'react'
import { IMusicStore } from '../../../store/interface/IMusicStore'
import searchApi from '../../../apis/search'
import useAsyncFn from '../../../hooks/useAsyncFn'
import {
  IArtist,
  IMyMusic,
  ISonglist,
  TARGET_TYPE,
} from '../../../apis/types/business'
import HotResult from './HotResult'
import SongResult from './SongResult'
import styles from './style.module.css'
import LoadingButton from '../../../components/Buttons/LoadingButton'
import ArtistResult from './ArtistResult'
import SongListResult from './SongListResult'
import Genre from '../Genre'

interface IProps {
  MusicStore?: IMusicStore
}

const Search: React.FC<IProps> = ({ MusicStore }) => {
  const [state, searchFn] = useAsyncFn(searchApi.search)
  const [stateSong, searchSongFn] = useAsyncFn(searchApi.search)
  const [stateSongList, searchSongListFn] = useAsyncFn(searchApi.search)

  useEffect(() => {
    searchFn({
      keywords: MusicStore?.musicSearchValue || '',
      type: TARGET_TYPE.ARTIST,
      limit: 10,
      offset: 0,
    })

    searchSongFn({
      keywords: MusicStore?.musicSearchValue || '',
      type: TARGET_TYPE.MUSIC,
      limit: 4,
      offset: 0,
    })

    searchSongListFn({
      keywords: MusicStore?.musicSearchValue || '',
      type: TARGET_TYPE.SONG_LIST,
      limit: 10,
      offset: 0,
    })
  }, [MusicStore?.musicSearchValue])

  return (
    <div className={`px-6 py-4 ${styles.root}`}>
      <div>
        {state.value ? (
          <div>
            <div className="flex ">
              <HotResult data={state.value?.artists as IArtist[]}></HotResult>
              <SongResult
                data={stateSong.value?.songs as IMyMusic[]}
              ></SongResult>
            </div>
            <SongListResult
              data={stateSongList.value?.playlists as ISonglist[]}
            ></SongListResult>
            <ArtistResult
              data={state.value?.artists as IArtist[]}
            ></ArtistResult>
          </div>
        ) : (
          <Genre></Genre>
        )}
      </div>

      {state.value?.loading ? <LoadingButton /> : null}
    </div>
  )
}

export default inject('MusicStore')(observer(Search))
