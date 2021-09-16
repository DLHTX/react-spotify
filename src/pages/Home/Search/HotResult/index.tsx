import React from 'react'
import { IArtist } from '../../../../apis/types/business'
import LinkTitle from '../../../../components/LinkTitle'
import styles from './style.module.css'

interface IProps {
  data?: IArtist[]
}
const HotResult: React.FC<IProps> = ({ data }) => {
  return (
    <div>
      <LinkTitle  title={'热门结果'} className="mb-4"></LinkTitle>
      {data?.map((item, index) => {
        if (index == 0) {
          return (
            <div className={`${styles.root} mt-2`}>
              <img
                className={'rounded-full'}
                src={item.picUrl + '?param=92y92'}
                alt=""
              />
              <div className="text-3xl font-bold mt-6 ml-2">{item.name}</div>
              <div className="mt-2 ml-2">艺人</div>
            </div>
          )
        }
      })}
    </div>
  )
}

export default HotResult
