import { inject, observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import songApi from '../../../apis/song'
import useAsyncFn from '../../../hooks/useAsyncFn'
import { IMusicStore } from '../../../store/interface/IMusicStore'
import Player from 'griffith'

interface IProps {
  MusicStore: IMusicStore
}

const Mv: React.FC<IProps> = ({ MusicStore }) => {
  const [state, getMvurlFn] = useAsyncFn(songApi.getMvurl)

  const [musicUrl, setMusicUrl] = useState(state.value?.url)

  useEffect(() => {
    if (MusicStore.state.music?.mv != 0) {
      getMvurlFn(MusicStore.state.music?.mv || 0)
    } else {
      setMusicUrl('')
      MusicStore.audioInfo.control?.play()
    }
  }, [MusicStore.state.music?.mv])

  useEffect(() => {
    if (state.value?.url) {
      MusicStore.audioInfo.control?.pause()
      setMusicUrl(state.value?.url)
    }
  }, [state])

  return (
    <div style={{ height: 'calc(100% - 90px)' }}>
      {musicUrl ? (
        // <video
        //   className="h-full w-full"
        //   src={musicUrl}
        //   controls
        //   autoPlay
        // ></video>
        <Player id={'player'} autoplay sources={{
            hd: {
              play_url: musicUrl,
            },
            sd: {
              play_url: musicUrl,
            },
          }} />
      ) : (
        <div className="text-center text-3xl h-full w-full flex justify-center items-center">该歌曲暂无MV</div>
      )}
    </div>
  )
}

export default inject('MusicStore')(observer(Mv))
