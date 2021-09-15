import React from 'react'
import { ISonglist } from '../../../../../apis/types/business'

interface IProps {
  data?: ISonglist
}

const PlayListInfoHeader: React.FC<IProps> = ({ data }) => {
  return (
    <div className={'flex items-end px-6 py-4 mb-4'}>
      {data?.coverImgUrl ? (
        <img
          src={data?.coverImgUrl}
          style={{
            height: '232px',
            width: '232px',
            boxShadow: '0 4px 60px rgb(0 0 0 / 80%)',
            borderRadius: '2px',
          }}
          alt=""
        />
      ) : null}

      <div className={'flex-col ml-6'}>
        <div>歌单</div>
        <div className={'text-6xl font-bold mt-4'}>{data?.name}</div>
        <div className={'font-bold mt-5 text-gray-400'}>
          {data?.subscribedCount}个收藏 · {data?.trackCount}首歌曲,
        </div>
      </div>
    </div>
  )
}

export default PlayListInfoHeader
