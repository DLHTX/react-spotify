import React from 'react'
import cn from 'classnames'

import songApis from '../../../apis/song'
import styles from './style.module.css'
import { formatLyric } from '../../../helpers/lyric'
import useAsyncFn from '../../../hooks/useAsyncFn'
import { inject, observer } from 'mobx-react'
import LoadingButton from '../../../components/Buttons/LoadingButton'
import { IMusicStore } from '../../../store/interface/IMusicStore'

interface IProps {
  MusicStore: IMusicStore
}

const { useEffect, useRef, useState, useMemo } = React

const HIGHLIGHT_LYRIC_TOP = 160
const LYRIC_LINE_HEIGHT = 55

const Lyric: React.FC<IProps> = ({ MusicStore }) => {
  const lyricRef = useRef<HTMLDivElement | null>()
  const [line, setLine] = useState(0)

  const audioInfo = MusicStore.audioInfo
  const state = MusicStore.state
  const { musicId, showLyric } = state

  const [lyricState, getLyricFn] = useAsyncFn(songApis.getLyric)
  const lines = useMemo(() => formatLyric(lyricState.value?.lyric), [
    lyricState.value?.lyric,
  ])

  useEffect(() => {
    if (musicId) {
      getLyricFn(musicId)
    }
  }, [musicId, showLyric])

  useEffect(() => {
    if (!audioInfo.state?.paused) {
      window.requestAnimationFrame(() => {
        const audioTime = audioInfo.state?.time || 0

        const lineIndex = lines.findIndex(([time], index) => {
          const prevTime = index - 1 >= 0 ? lines[index - 1][0] : time
          const nextTime = index + 1 < lines.length ? lines[index + 1][0] : time
          if (prevTime <= audioTime && nextTime >= audioTime) {
            return true
          }
        })

        if (lineIndex > -1) {
          const scrollHeight =
            LYRIC_LINE_HEIGHT * lineIndex - HIGHLIGHT_LYRIC_TOP
          lyricRef.current?.scrollTo({
            top: scrollHeight < 0 ? 0 : scrollHeight,
            behavior: 'smooth',
          })
          setLine(lineIndex)
        }
      })
    }
  }, [audioInfo.state, lines])

  const handleLyricClick = (time:number)=>{
    audioInfo.control?.seek(time)
  }

  return (
    <div
      className={styles.root}
    >
      <div  style={{
        backgroundImage: `url(${state.music?.picUrl})`,
        filter: 'blur(150px)',
        height:'75vh',
        width:'60vw'
      }}></div>
      {lyricState.loading ? (
        <LoadingButton />
      ) : (
        <div  ref={(ref) => (lyricRef.current = ref)} className={'absolute overflow-y-scroll w-full'} style={{height: 'calc(100% - 230px)',top:'100px',}}>
          {lines.map(([time, lyric], index) => {
            if (lyric.length > 0) {
              return (
                <div
                  onClick={()=>handleLyricClick(time)}
                  key={time}
                  className={cn(styles.line, line === index && styles.active,'cursor-pointer')}
                >
                  {lyric}
                </div>
              )
            }
          })}
        </div>
      )}
    </div>
  )
}

export default inject('MusicStore')(observer(Lyric))
