import React, { useEffect, useState } from 'react'
import useAsyncFn from '../../../hooks/useAsyncFn'
import songListApi from '../../../apis/songlist'
import { useHistory } from 'react-router'
import styles from './style.module.css'
import { IArtist } from '../../../apis/types/business'
import { formatTime } from '../../../helpers/time'
import albumApis from '../../../apis/album'
import { inject, observer } from 'mobx-react'
import { IMusicStore } from '../../../store/interface/IMusicStore'

interface IProps {
  id: number
  name: string
  al?: {
    id: number
    name: string
    picUrl: string
  }
  ar: IArtist[]
  index: number
  dt: number
  MusicStore?: IMusicStore
  fee?: number
  playAll(): void
}

const PlayListItem: React.FC<IProps> = ({
  id,
  name,
  al,
  ar,
  index,
  dt,
  fee,
  MusicStore,
  playAll
}) => {
  const [curIdx, setCurIdx] = useState(-1)

  const handleClick = async () => {
    MusicStore?.PLAY({
      musicId: id,
      musicUrl: al?.picUrl,
      music: {
        id,
        name: name,
        artists: ar,
        duration: dt / 1000,
        picUrl: al?.picUrl,
        album: al,
        fee,
      },
    })
    playAll()
  }

  const handlePlayOrHover = () => {
    if (MusicStore?.state.musicId === id) {
      return (
        <div className={'mr-4  w-3'}>
          <img
            width="14"
            height="14"
            alt=""
            src="https://open.scdn.co/cdn/images/equaliser-animated-green.f93a2ef4.gif"
          ></img>
        </div>
      )
    } else {
      if (curIdx === index) {
        return (
          <div className={'mr-4 w-3'}>
            <svg
              height="12"
              role="img"
              width="12"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <polygon
                points="21.57 12 5.98 3 5.98 21 21.57 12"
                fill="currentColor"
              ></polygon>
            </svg>
          </div>
        )
      } else {
        return <div className={'mr-4 w-3'}>{index + 1}</div>
      }
    }
  }

  return (
    <div
      className={styles.root}
      onDoubleClick={handleClick}
      onMouseOver={() => setCurIdx(index)}
      onMouseLeave={() => setCurIdx(-1)}
    >
      {handlePlayOrHover()}
      <div className={'mr-4'}>
        {al?.picUrl ? (
          <img src={al?.picUrl} style={{ height: '40px', width: '40px' }} />
        ) : null}
      </div>
      <div className={'flex-col mr-4'} style={{ minWidth: '400px' }}>
        <div
          className={'font-bold'}
          style={{ color: MusicStore?.state.musicId === id ? '#1db954' : '' }}
        >
          {name}
          {fee == 1 ? <span className={styles.vipTag}>vip</span> : null}
        </div>
        <div className={'text-gray-400'}>{ar[0].name}</div>
      </div>
      <div className={'mr-4'}>{al?.name}</div>
      <div className={'ml-auto'}>{formatTime(dt / 1000)}</div>
    </div>
  )
}

export default inject('MusicStore')(observer(PlayListItem))
