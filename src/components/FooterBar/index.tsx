import { Footer } from 'antd/lib/layout/layout'
import { inject, observer } from 'mobx-react'
import React from 'react'
import { IMusicStore } from '../../store/interface/IMusicStore'
import AudioButtons from './AudioButtons'
import AudioProgressBar from './AudioProgressBar'
import AudioVoiceBar from './AudioVoiceBar'
import styles from './style.module.css'

interface IProps {
  MusicStore?: IMusicStore
}
const FooterBar: React.FC<IProps> = ({ MusicStore }) => {
  return (
    <Footer className={styles.root} style={{ padding: '15px 20px' }}>
      <div className={'flex mr-auto'}>
        <img
          alt={""}
          src={MusicStore?.state.music?.picUrl + '?param=56y56'}
          style={{ height: '56px', width: '56px' }}
        />
        <div className={'flex-col ml-4'} style={{width: '260px'}}>
          <div>{MusicStore?.state.music?.name}</div>
          <div>{MusicStore?.state.music?.artists[0].name}</div>
        </div>
      </div>

      <div className={'flex-col justify-center items-center'}>
        <AudioButtons></AudioButtons>
        <AudioProgressBar></AudioProgressBar>
      </div>

      <div className={'ml-auto mr-4 flex justify-center items-center'}>
        <AudioVoiceBar></AudioVoiceBar>
      </div>
    </Footer>
  )
}

export default inject('MusicStore')(observer(FooterBar))
