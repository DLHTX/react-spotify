import React, { useEffect } from 'react'
import { ISimpleMusic } from '../../apis/types/business'
import PlayListItem from './PlayListItem'
import styles from './style.module.css'

interface IProps {
  data?: ISimpleMusic[]
}

const PlayLists: React.FC<IProps> = ({ data }) => {
  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <div
      className={`${styles.root} px-10`}
      style={{
        width: 'calc(100% - 200px)',
      }}
    >
      <div className={`${styles.tableHeader} flex contents-center`} >
        <div className={'mr-4'}>#</div>
        <div className={'mr-4'} style={{ minWidth: '450px' }}>标题</div>
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
      {data?.map(({ id, name, al, ar, dt }, index) => {
        return (
          <PlayListItem
            key={id}
            id={id}
            name={name}
            al={al}
            ar={ar}
            index={index}
            dt={dt}
          ></PlayListItem>
        )
      })}
    </div>
  )
}

export default PlayLists
