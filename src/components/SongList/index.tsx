import { Col, Row } from 'antd'
import React from 'react'
import { ISonglist } from '../../apis/types/business'
import SongListItem from './SongListItem'
import styles from './style.module.css'

interface IProps {
  data?: ISonglist[]
}

const SongList: React.FC<IProps> = ({ data }) => {
  return (
    <div className={styles.root}>
      {data?.map(({ id, name, playCount, picUrl }, index) => {
        return (
          <SongListItem
            key={id}
            id={id}
            name={name}
            playCount={playCount}
            picUrl={picUrl}
          ></SongListItem>
        )
      })}
    </div>
  )
}

export default SongList
