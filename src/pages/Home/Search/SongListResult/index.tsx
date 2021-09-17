import React from 'react'
import { useHistory } from 'react-router-dom'
import { ISonglist } from '../../../../apis/types/business'
import LinkTitle from '../../../../components/LinkTitle'
import ROUTES from '../../../../router'
import styles from './style.module.css'

interface IProps {
  data?: ISonglist[]
}
const SongListResult: React.FC<IProps> = ({ data }) => {
  const history = useHistory()

  const goPlayList = (id: number) => {
    history.push(`${ROUTES.PLAYLIST}/${id}`)
  }

  return (
    <div>
      <LinkTitle title={'歌单'} className="mt-6"></LinkTitle>
      <div className="flex mt-2 overflow-hidden">
        {data?.map((item, index) => {
          return (
            <div
              className={`${styles.root} mt-2`}
              onClick={() => {
                goPlayList(item.id)
              }}
            >
              <img
                className={'mx-auto'}
                src={item.coverImgUrl + '?param=140y140'}
              />
              <div className="text-md font-bold mt-6 ml-2 truncate">
                {item.name}
              </div>
              <div className="mt-2 ml-2 text-gray-400">
                {item.creator.nickname}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SongListResult
