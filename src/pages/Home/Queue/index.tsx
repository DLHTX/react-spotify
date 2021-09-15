import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { inject, observer } from 'mobx-react'
import LinkTitle from '../../../components/LinkTitle'
import { IMusicState, IMusicStore } from '../../../store/interface/IMusicStore'
import PlayLists from '../../../components/PlayLists'
import PlayListItem from '../../../components/PlayLists/PlayListItem'
import { IAlbum, IArtist } from '../../../apis/types/business'

interface IProps {
  MusicStore: IMusicStore
}
const Queue: React.FC<IProps> = ({ MusicStore }) => {
  const playAll = () => {}
  const curMusic = MusicStore.state

  return (
    <div className={'px-6 py-4'}>
      <LinkTitle title={'队列'} route={'/songlist'}></LinkTitle>

      {MusicStore.playList.length > 0 ? (
        <h2
          className={'font-bold mt-4'}
          style={{ color: 'rgb(179, 179, 179)' }}
        >
          当前播放
        </h2>
      ) : null}

      <PlayListItem
        key={curMusic.musicId}
        id={curMusic.musicId}
        name={curMusic.music?.name as string}
        al={curMusic.music?.album as IAlbum}
        ar={curMusic.music?.artists as IArtist[]}
        index={1}
        dt={(curMusic.music?.duration as number) * 1000}
        fee={curMusic.music?.fee as number}
        playAll={playAll}
      ></PlayListItem>

      {MusicStore.playList.length > 0 ? (
        <h2
          className={'font-bold mt-4'}
          style={{ color: 'rgb(179, 179, 179)' }}
        >
          下一首歌来自：
          {MusicStore.playList[0].music?.artists[0].name}
        </h2>
      ) : null}

      {MusicStore.playList &&
        MusicStore.playList?.map((item, index) => {
          if (item.musicId != curMusic.musicId) {
            return (
              <PlayListItem
                key={item.musicId}
                id={item.musicId}
                name={item.music?.name as string}
                al={item.music?.album as IAlbum}
                ar={item.music?.artists as IArtist[]}
                index={index + 1}
                dt={(item.music?.duration as number) * 1000}
                fee={item.music?.fee as number}
                playAll={playAll}
              ></PlayListItem>
            )
          }
        })}
    </div>
  )
}

export default inject('MusicStore')(observer(Queue))
