import { PlayCircleFilled } from '@ant-design/icons'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import ROUTES from '../../../router'
import PlayButton from '../../Buttons/PlayButton'
import styles from './style.module.css'

interface IProps {
  id: number
  name: string
  playCount: number
  picUrl?: string
}

const SongListItem: React.FC<IProps> = ({ id, name, playCount, picUrl }) => {
  const [showPlayIcon, setShowPlayIcon] = useState(false)
  const history = useHistory()

  const handleShowPlayIcon = () => setShowPlayIcon(true)
  const handleHiddenPlayIcon = () => setShowPlayIcon(false)

  const goPlayList = () => {
    console.log(`${ROUTES.PLAYLIST}/${id}`)
    history.push(`${ROUTES.PLAYLIST}/${id}`)
  }

  return (
    <div
      className={styles.root}
      onMouseOver={handleShowPlayIcon}
      onMouseLeave={handleHiddenPlayIcon}
      onClick={goPlayList}
    >
      <div className={'relative'}>
        <img src={picUrl} alt="" />
        {showPlayIcon ? (
          <PlayButton className={'absolute bottom-2 right-2 shadow'}></PlayButton>
        ) : null}
      </div>
      <div className={'mt-4 font-bold cursor-pointer'}>{name}</div>
    </div>
  )
}

export default SongListItem
