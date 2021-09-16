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
  className?: string
  style?: any
}

const SongListItem: React.FC<IProps> = ({
  id,
  name,
  playCount,
  picUrl,
  className,
  style,
}) => {
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
      style={style}
      className={`${styles.root} ${className}`}
      onMouseOver={handleShowPlayIcon}
      onMouseLeave={handleHiddenPlayIcon}
      onClick={goPlayList}
    >
      <div className={'relative'}>
        <img src={picUrl + '?param=175y175'} alt="" />
        {/* {showPlayIcon ? (
         
        ) : null} */}
        <PlayButton
          className={`absolute bottom-2 right-2 shadow ${styles.playButton}  ${
            showPlayIcon ? styles.playButtonAnimation : ''
          }`}
        ></PlayButton>
      </div>
      <div className={'mt-4 font-bold cursor-pointer'}>{name}</div>
    </div>
  )
}

export default SongListItem
