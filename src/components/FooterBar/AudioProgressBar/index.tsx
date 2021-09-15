import { inject, observer } from 'mobx-react'
import React, { useCallback } from 'react'
import { formatTime } from '../../../helpers/time'
import { IMusicStore } from '../../../store/interface/IMusicStore'
import ProgressBar from '../../ProgressBar'
import styles from './style.module.css'

interface IProps {
  MusicStore?: IMusicStore
}

const AudioProgressBar: React.FC<IProps> = ({ MusicStore }) => {
  const onBarClick = (percent:number) => {
    MusicStore?.audioInfo.control?.seek((MusicStore?.state.music?.duration || 0) * percent)
  }

  return (
    <div className={'flex text-white items-center mt-1'}>
      <span className={'mr-3 select-none'}>
        {formatTime(MusicStore?.audioInfo?.state?.time)}
      </span>
      {/* <div className={styles.progressBox} onClick={handleClick}>
        <div
          className={styles.progressBar}
          style={{ width: `${getProgressWidth()}%` }}
        >
          <div className={styles.dragDot}></div>
        </div>
      </div> */}
      <ProgressBar
        startNumber={MusicStore?.audioInfo?.state?.time}
        endNumber={MusicStore?.state.music?.duration}
        onBarClick={onBarClick}
      ></ProgressBar>

      <span className={'ml-3 select-none'}>
        {formatTime(MusicStore?.state.music?.duration)}
      </span>
    </div>
  )
}

export default inject('MusicStore')(observer(AudioProgressBar))
