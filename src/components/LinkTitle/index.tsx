import React from 'react'
import { useHistory } from 'react-router-dom'
import styles from './style.module.css'

interface IProps {
  title: string
  subTitle?: string
  route?: string
  className?: string
  showViewAll?: boolean
  onViewAll?(): any | undefined | null
}

const LinkTitle: React.FC<IProps> = ({
  title,
  subTitle,
  route,
  className,
  showViewAll = false,
  onViewAll,
}) => {
  const history = useHistory()

  const handleClick = () => {
    if (route) {
      history.push(route)
    }
  }

  return (
    <div className={`${className} flex items-end`}>
      <div className="flex flex-col ">
        <div
          onClick={handleClick}
          className={`font-bold text-2xl ${styles.title}`}
        >
          {title}
        </div>
        {subTitle ? <div className="text-gray-400">{subTitle}</div> : null}
      </div>

      {showViewAll ? (
        <div
          className="ml-auto mb-2 text-sm hover:underline cursor-pointer text-gray-400"
          onClick={onViewAll}
        >
          查看全部
        </div>
      ) : null}
    </div>
  )
}

export default LinkTitle
