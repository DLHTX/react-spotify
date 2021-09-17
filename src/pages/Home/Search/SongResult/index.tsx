import { inject, observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import { IMyMusic, ISimpleMusic } from '../../../../apis/types/business'
import LinkTitle from '../../../../components/LinkTitle'
import { formatTime } from '../../../../helpers/time'
import {
  IMusicState,
  IMusicStore,
} from '../../../../store/interface/IMusicStore'
import styles from './style.module.css'
import songApi from '../../../../apis/song'

interface IProps {
  data?: IMyMusic[]
  MusicStore?: IMusicStore
}

const SongResult: React.FC<IProps> = ({ data, MusicStore }) => {
  const [newData, setNewData] = useState<ISimpleMusic[]>([])

  useEffect(() => {
    if (data) {
      songApi.getSongDetail(data.map((item) => item.id)).then((res) => {
        setNewData(res)
      })
    }
  }, [data])

  const handleClick = async (item: ISimpleMusic) => {
    let curMusic: IMusicState = {
      musicId: item.id,
      musicUrl: item.al.picUrl || '',
      music: {
        id: item.id,
        name: item.name,
        artists: item.ar,
        duration: item.dt/1000,
        picUrl: item.al.picUrl,
        album: item.al,
        fee: item.fee,
        mv: item.mv
      },
    }
    MusicStore?.PLAY(curMusic)
    MusicStore?.SET_PLAYLIST(curMusic)
  }

  return (
    <div className="ml-4 w-full">
      <LinkTitle title={'歌曲'}></LinkTitle>
      {newData?.map((item) => {
        return (
          <div
            className={`mt-2 ${styles.songItem}`}
            onClick={() => handleClick(item)}
          >
            <img className="mr-4" src={item.al.picUrl + '?param=34y34'} alt="" />

            <div className="flex flex-col">
              <div className="font-bold">{item.name}</div>
              <div className="text-gray-400">
                {item.ar[0].name} {item.al?.name}
              </div>
            </div>

            <div className="ml-auto mr-4">{formatTime(item.dt / 1000)}</div>
          </div>
        )
      })}
    </div>
  )
}

export default inject('MusicStore')(observer(SongResult))
