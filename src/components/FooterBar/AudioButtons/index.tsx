import { inject, observer } from 'mobx-react'
import React, { useEffect } from 'react'
import { IMusicStore } from '../../../store/interface/IMusicStore'
import PauseButton from '../../Buttons/PauseButton'
import PlayButton from '../../Buttons/PlayButton'
import styles from './style.module.css'

interface IProps {
  MusicStore?: IMusicStore
}
const AudioButtons: React.FC<IProps> = ({ MusicStore }) => {
  useEffect(() => {
    console.log(MusicStore?.audioInfo.state?.paused)
  }, [MusicStore])

  const onPauseClick = () => {
    console.log('pause')
    MusicStore?.audioInfo.control?.pause()
  }

  const onPlayClick = () => {
    console.log('play')
    MusicStore?.audioInfo.control?.play()
  }

  return (
    <div className={'flex text-white items-center justify-center'}>
      <svg
        className={styles.svg}
        role="img"
        height="16"
        width="16"
        viewBox="0 0 16 16"
      >
        <path d="M4.5 6.8l.7-.8C4.1 4.7 2.5 4 .9 4v1c1.3 0 2.6.6 3.5 1.6l.1.2zm7.5 4.7c-1.2 0-2.3-.5-3.2-1.3l-.6.8c1 1 2.4 1.5 3.8 1.5V14l3.5-2-3.5-2v1.5zm0-6V7l3.5-2L12 3v1.5c-1.6 0-3.2.7-4.2 2l-3.4 3.9c-.9 1-2.2 1.6-3.5 1.6v1c1.6 0 3.2-.7 4.2-2l3.4-3.9c.9-1 2.2-1.6 3.5-1.6z"></path>
      </svg>

      {/* 上一曲 */}
      <svg
        className={styles.svg}
        role="img"
        height="16"
        width="16"
        viewBox="0 0 16 16"
        onClick={()=>MusicStore?.PLAY_PREV_MUSIC()}
      >
        <path d="M13 2.5L5 7.119V3H3v10h2V8.881l8 4.619z"></path>
      </svg>

      {MusicStore?.audioInfo.state?.paused ? (
        <div onClick={onPlayClick}>
          <PlayButton className={'mr-4'} size={34}></PlayButton>
        </div>
      ) : (
        <div onClick={onPauseClick}>
          <PauseButton className={'mr-4'} size={34}></PauseButton>
        </div>
      )}
      {/* 下一曲 */}
      <svg
        className={styles.svg}
        role="img"
        height="16"
        width="16"
        viewBox="0 0 16 16"
        onClick={()=>MusicStore?.PLAY_NEXT_MUSIC()}
      >
        <path d="M11 3v4.119L3 2.5v11l8-4.619V13h2V3z"></path>
      </svg>

      <svg
        className={styles.svg}
        role="img"
        height="16"
        width="16"
        viewBox="0 0 16 16"
      >
        <path d="M5.5 5H10v1.5l3.5-2-3.5-2V4H5.5C3 4 1 6 1 8.5c0 .6.1 1.2.4 1.8l.9-.5C2.1 9.4 2 9 2 8.5 2 6.6 3.6 5 5.5 5zm9.1 1.7l-.9.5c.2.4.3.8.3 1.3 0 1.9-1.6 3.5-3.5 3.5H6v-1.5l-3.5 2 3.5 2V13h4.5C13 13 15 11 15 8.5c0-.6-.1-1.2-.4-1.8z"></path>
      </svg>
    </div>
  )
}

export default inject('MusicStore')(observer(AudioButtons))
