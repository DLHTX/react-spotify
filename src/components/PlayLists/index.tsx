import { inject, observer } from 'mobx-react'
import React, { forwardRef, useEffect, useState } from 'react'
import { ISimpleMusic, ITrackIds } from '../../apis/types/business'
import { IMusicState, IMusicStore } from '../../store/interface/IMusicStore'
import PlayListItem from './PlayListItem'
import styles from './style.module.css'
import songApi from '../../apis/song'

interface IProps {
  data?: ISimpleMusic[]
  trackIds?: ITrackIds[]
  MusicStore?: IMusicStore
  setFn?:any
}

const PlayLists: React.FC<IProps> = ({
  data,
  MusicStore,
  trackIds,
}) => {
  useEffect(() => {
    // console.log(data)
  }, [data])
  const [newData, setNewData] = useState<ISimpleMusic[]>(data || [])

  useEffect(() => {
    if (trackIds) {
      songApi.getSongDetail(trackIds.map((item) => item.id)).then((res) => {
        setNewData(res)
      })
    }
  }, [trackIds])


  const playAll = () => {
    const handledMusicList: IMusicState[] = []
    newData?.forEach((item) => {
      let music: IMusicState = {
        musicId: item.id,
        musicUrl: item.al.picUrl,
        music: {
          id: item.id,
          name: item.name,
          artists: item.ar,
          duration: item.dt / 1000,
          picUrl: item.al.picUrl,
          album: item.al,
          fee: item.fee,
          mv: item.mv
        },
      }
      handledMusicList.push(music)
    })
    MusicStore?.SET_PLAYLIST(handledMusicList)
  }

  // useEffect(() => {
  //   setFn(playAll)
  // }, []);

  return (
    <div
      className={`${styles.root} px-10`}
    >
      <div className={`${styles.tableHeader} flex contents-center`}>
        <div className={'mr-4  w-3'}>#</div>
        <div className={'mr-4'} style={{ minWidth: '450px' }}>
          标题
        </div>
        <div className={'mr-4'}>专辑</div>
        <div className={'mr-4 ml-auto'}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M7.999 3H6.999V7V8H7.999H9.999V7H7.999V3ZM7.5 0C3.358 0 0 3.358 0 7.5C0 11.642 3.358 15 7.5 15C11.642 15 15 11.642 15 7.5C15 3.358 11.642 0 7.5 0ZM7.5 14C3.916 14 1 11.084 1 7.5C1 3.916 3.916 1 7.5 1C11.084 1 14 3.916 14 7.5C14 11.084 11.084 14 7.5 14Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
      </div>
      {newData?.map(({ id, name, al, ar, dt, fee }, index) => {
        return (
          <PlayListItem
            key={id}
            id={id}
            name={name}
            al={al}
            ar={ar}
            index={index}
            dt={dt}
            fee={fee}
            playAll={playAll}
          ></PlayListItem>
        )
      })}
    </div>
  )
}

export default inject('MusicStore')(observer(PlayLists))
