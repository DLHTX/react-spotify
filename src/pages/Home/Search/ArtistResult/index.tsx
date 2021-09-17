import React from 'react'
import { IArtist } from '../../../../apis/types/business'
import LinkTitle from '../../../../components/LinkTitle'
import styles from './style.module.css'

interface IProps {
  data?: IArtist[]
}
const ArtistResult: React.FC<IProps> = ({ data }) => {
  return (
    <div>
      <LinkTitle title={'艺人'} className="mt-6"></LinkTitle>
      <div className="flex mt-2 overflow-hidden">
        {data?.map((item, index) => {
          return (
            <div className={`${styles.root} mt-2`}>
              <img
                alt=""
                className={'rounded-full mx-auto'}
                src={item.picUrl + '?param=120y120'}
              />
              <div className="text-xl font-bold mt-6 ml-2">{item.name}</div>
              <div className="mt-2 ml-2 text-gray-400">艺人</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ArtistResult
