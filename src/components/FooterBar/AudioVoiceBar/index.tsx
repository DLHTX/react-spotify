import { inject, observer } from 'mobx-react'
import React, { useMemo } from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'
import ROUTES from '../../../router'
import { IMusicStore } from '../../../store/interface/IMusicStore'
import ProgressBar from '../../ProgressBar'
import styles from './style.module.css'

interface IProps {
  MusicStore?: IMusicStore
}

const AudioVoiceBar: React.FC<IProps> = ({ MusicStore }) => {
  const onBarClick = (percent: number) => {
    MusicStore?.audioInfo.control?.volume(percent)
  }
  const history = useHistory()

  const setVolumn = () => {
    if (MusicStore?.audioInfo.state?.volume === 0) {
      MusicStore?.audioInfo.control?.volume(1)
    } else {
      MusicStore?.audioInfo.control?.volume(0)
    }
  }

  const voiceIcon = useMemo(() => {
    let volume = MusicStore?.audioInfo.state?.volume || 100
    if (volume >= 0 && volume < 0.05) {
      return (
        <svg
          className={styles.svg}
          role="presentation"
          height="16"
          width="16"
          aria-label="Volume off"
          id="volume-icon"
          viewBox="0 0 16 16"
        >
          <path d="M0 5v6h2.804L8 14V2L2.804 5H0zm7-1.268v8.536L3.072 10H1V6h2.072L7 3.732zm8.623 2.121l-.707-.707-2.147 2.147-2.146-2.147-.707.707L12.062 8l-2.146 2.146.707.707 2.146-2.147 2.147 2.147.707-.707L13.477 8l2.146-2.147z"></path>
        </svg>
      )
    } else if (volume >= 0.05 && volume < 0.3) {
      return (
        <svg
          className={styles.svg}
          role="presentation"
          height="16"
          width="16"
          aria-label="Volume low"
          id="volume-icon"
          viewBox="0 0 16 16"
        >
          <path d="M10.04 5.984l.658-.77q.548.548.858 1.278.31.73.31 1.54 0 .54-.144 1.055-.143.516-.4.957-.259.44-.624.805l-.658-.77q.825-.865.825-2.047 0-1.183-.825-2.048zM0 11.032v-6h2.802l5.198-3v12l-5.198-3H0zm7 1.27v-8.54l-3.929 2.27H1v4h2.071L7 12.302z"></path>
        </svg>
      )
    } else if (volume >= 0.3 && volume < 0.6) {
      return (
        <svg
          className={styles.svg}
          role="presentation"
          height="16"
          width="16"
          aria-label="Volume medium"
          id="volume-icon"
          viewBox="0 0 16 16"
        >
          <path d="M0 11.032v-6h2.802l5.198-3v12l-5.198-3H0zm7 1.27v-8.54l-3.929 2.27H1v4h2.071L7 12.302zm4.464-2.314q.401-.925.401-1.956 0-1.032-.4-1.957-.402-.924-1.124-1.623L11 3.69q.873.834 1.369 1.957.496 1.123.496 2.385 0 1.262-.496 2.385-.496 1.123-1.369 1.956l-.659-.762q.722-.698 1.123-1.623z"></path>
        </svg>
      )
    } else if (volume >= 0.6) {
      return (
        <svg
          className={styles.svg}
          role="presentation"
          height="16"
          width="16"
          aria-label="Volume high"
          id="volume-icon"
          viewBox="0 0 16 16"
        >
          <path d="M12.945 1.379l-.652.763c1.577 1.462 2.57 3.544 2.57 5.858s-.994 4.396-2.57 5.858l.651.763a8.966 8.966 0 00.001-13.242zm-2.272 2.66l-.651.763a4.484 4.484 0 01-.001 6.397l.651.763c1.04-1 1.691-2.404 1.691-3.961s-.65-2.962-1.69-3.962zM0 5v6h2.804L8 14V2L2.804 5H0zm7-1.268v8.536L3.072 10H1V6h2.072L7 3.732z"></path>
        </svg>
      )
    }
  }, [MusicStore?.audioInfo.state?.volume])

  const handleGoQueue = () => {
    history.push('/queue')
  }

  return (
    <div className={'flex text-white items-center mt-1'}>
      <div
        className="relative"
        onClick={() => history.push(ROUTES.MV)}
        style={{ display: MusicStore?.state.music?.mv === 0 ? 'none' : '' }}
      >
        <svg
          className={`${styles.svg} mr-4 cursor-pointer`}
          style={{
            fill: useRouteMatch(ROUTES.MV) ? 'rgb(29, 185, 84)' : '',
          }}
          viewBox="64 64 896 896"
          focusable="false"
          data-icon="youtube"
          width="1em"
          height="1em"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M960 509.2c0-2.2 0-4.7-.1-7.6-.1-8.1-.3-17.2-.5-26.9-.8-27.9-2.2-55.7-4.4-81.9-3-36.1-7.4-66.2-13.4-88.8a139.52 139.52 0 00-98.3-98.5c-28.3-7.6-83.7-12.3-161.7-15.2-37.1-1.4-76.8-2.3-116.5-2.8-13.9-.2-26.8-.3-38.4-.4h-29.4c-11.6.1-24.5.2-38.4.4-39.7.5-79.4 1.4-116.5 2.8-78 3-133.5 7.7-161.7 15.2A139.35 139.35 0 0082.4 304C76.3 326.6 72 356.7 69 392.8c-2.2 26.2-3.6 54-4.4 81.9-.3 9.7-.4 18.8-.5 26.9 0 2.9-.1 5.4-.1 7.6v5.6c0 2.2 0 4.7.1 7.6.1 8.1.3 17.2.5 26.9.8 27.9 2.2 55.7 4.4 81.9 3 36.1 7.4 66.2 13.4 88.8 12.8 47.9 50.4 85.7 98.3 98.5 28.2 7.6 83.7 12.3 161.7 15.2 37.1 1.4 76.8 2.3 116.5 2.8 13.9.2 26.8.3 38.4.4h29.4c11.6-.1 24.5-.2 38.4-.4 39.7-.5 79.4-1.4 116.5-2.8 78-3 133.5-7.7 161.7-15.2 47.9-12.8 85.5-50.5 98.3-98.5 6.1-22.6 10.4-52.7 13.4-88.8 2.2-26.2 3.6-54 4.4-81.9.3-9.7.4-18.8.5-26.9 0-2.9.1-5.4.1-7.6v-5.6zm-72 5.2c0 2.1 0 4.4-.1 7.1-.1 7.8-.3 16.4-.5 25.7-.7 26.6-2.1 53.2-4.2 77.9-2.7 32.2-6.5 58.6-11.2 76.3-6.2 23.1-24.4 41.4-47.4 47.5-21 5.6-73.9 10.1-145.8 12.8-36.4 1.4-75.6 2.3-114.7 2.8-13.7.2-26.4.3-37.8.3h-28.6l-37.8-.3c-39.1-.5-78.2-1.4-114.7-2.8-71.9-2.8-124.9-7.2-145.8-12.8-23-6.2-41.2-24.4-47.4-47.5-4.7-17.7-8.5-44.1-11.2-76.3-2.1-24.7-3.4-51.3-4.2-77.9-.3-9.3-.4-18-.5-25.7 0-2.7-.1-5.1-.1-7.1v-4.8c0-2.1 0-4.4.1-7.1.1-7.8.3-16.4.5-25.7.7-26.6 2.1-53.2 4.2-77.9 2.7-32.2 6.5-58.6 11.2-76.3 6.2-23.1 24.4-41.4 47.4-47.5 21-5.6 73.9-10.1 145.8-12.8 36.4-1.4 75.6-2.3 114.7-2.8 13.7-.2 26.4-.3 37.8-.3h28.6l37.8.3c39.1.5 78.2 1.4 114.7 2.8 71.9 2.8 124.9 7.2 145.8 12.8 23 6.2 41.2 24.4 47.4 47.5 4.7 17.7 8.5 44.1 11.2 76.3 2.1 24.7 3.4 51.3 4.2 77.9.3 9.3.4 18 .5 25.7 0 2.7.1 5.1.1 7.1v4.8zM423 646l232-135-232-133z"></path>
        </svg>
        {useRouteMatch(ROUTES.MV) ? <div className={styles.dot}></div> : null}
      </div>

      <div className="relative" onClick={() => history.push(ROUTES.LYRIC)}>
        <svg
          className={`${styles.svg} mr-4 cursor-pointer`}
          style={{
            fill: useRouteMatch(ROUTES.LYRIC) ? 'rgb(29, 185, 84)' : '',
          }}
          role="img"
          height="16"
          width="16"
          viewBox="0 0 16 16"
        >
          <path d="M8.5 1A4.505 4.505 0 004 5.5c0 .731.191 1.411.502 2.022L1.99 13.163a1.307 1.307 0 00.541 1.666l.605.349a1.307 1.307 0 001.649-.283L9.009 9.95C11.248 9.692 13 7.807 13 5.5 13 3.019 10.981 1 8.5 1zM4.023 14.245a.307.307 0 01-.388.066l-.605-.349a.309.309 0 01-.128-.393l2.26-5.078A4.476 4.476 0 007.715 9.92l-3.692 4.325zM8.5 9C6.57 9 5 7.43 5 5.5S6.57 2 8.5 2 12 3.57 12 5.5 10.429 9 8.5 9z"></path>
        </svg>
        {useRouteMatch(ROUTES.LYRIC) ? (
          <div className={styles.dot}></div>
        ) : null}
      </div>

      <div className="relative">
        <svg
          className={`mr-4 ${styles.svg}`}
          style={{
            fill: useRouteMatch(ROUTES.QUEUE) ? 'rgb(29, 185, 84)' : '',
          }}
          onClick={handleGoQueue}
          viewBox="64 64 896 896"
          focusable="false"
          data-icon="menu-unfold"
          width="1em"
          height="1em"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM142.4 642.1L298.7 519a8.84 8.84 0 000-13.9L142.4 381.9c-5.8-4.6-14.4-.5-14.4 6.9v246.3a8.9 8.9 0 0014.4 7z"></path>
        </svg>
        {useRouteMatch(ROUTES.QUEUE) ? (
          <div className={styles.dot}></div>
        ) : null}
      </div>

      <div className="mr-4" onClick={setVolumn}>
        {voiceIcon}
      </div>

      <ProgressBar
        minWidth={'93px'}
        maxWidth={'93px'}
        startNumber={MusicStore?.audioInfo.state?.volume}
        endNumber={1}
        onBarClick={onBarClick}
        onBarDrag={onBarClick}
      ></ProgressBar>
    </div>
  )
}

export default inject('MusicStore')(observer(AudioVoiceBar))
