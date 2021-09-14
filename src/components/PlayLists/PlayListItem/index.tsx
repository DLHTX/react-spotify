import React, { useEffect } from 'react'
import useAsyncFn from '../../../hooks/useAsyncFn'
import songListApi from '../../../apis/songlist'
import { useHistory } from 'react-router'
import styles from './style.module.css'
import { IArtist } from '../../../apis/types/business'
import { formatTime } from '../../../helpers/time'
import albumApis from '../../../apis/album'
import { inject, observer } from 'mobx-react'

interface IProps {
  id: number
  name: string
  al: {
    id: number
    name: string
    picUrl: string
  }
  ar: IArtist[]
  index: number
  dt: number
  MusicStore?: any
}

const PlayListItem: React.FC<IProps> = ({
  id,
  name,
  al,
  ar,
  index,
  dt,
  MusicStore,
}) => {
  const handleClick = async () => {
    console.log({ id, name, al, ar, index, dt })
    MusicStore.SET_PLAYLIST({
      musicId: id,
      musicUrl: al.picUrl,
      // music:{
      //   id,
      //   name,
      // }
    })
  }

  return (
    <div className={styles.root} onClick={handleClick}>
      <div className={'mr-4'}>{index + 1}</div>
      <div className={'mr-4'}>
        {al.picUrl ? (
          <img src={al.picUrl} style={{ height: '40px', width: '40px' }} />
        ) : null}
      </div>
      <div className={'flex-col mr-4'} style={{ minWidth: '400px' }}>
        <div className={'font-bold'}>{name}</div>
        <div className={'text-gray-400'}>{ar[0].name}</div>
      </div>
      <div className={'mr-4'}>{al.name}</div>
      <div className={'ml-auto'}>{formatTime(dt / 1000)}</div>
    </div>
  )
}

export default inject('MusicStore')(observer(PlayListItem))
