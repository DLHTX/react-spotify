import React from 'react'
import { useHistory } from 'react-router-dom'
import styles from './style.module.css'

interface IProps {
  title: string
  subTitle?: string
  route: string
  className?: string
}

const LinkTitle: React.FC<IProps> = ({ title, subTitle, route, className }) => {
  const history = useHistory()

  const handleClick = () => {
    history.push(route)
  }

  return (
    <div className={className}>
      <div
        onClick={handleClick}
        className={`font-bold text-2xl ${styles.title}`}
      >
        {title}
      </div>
      {subTitle ? <div className="text-gray-400">{subTitle}</div> : null}
    </div>
  )
}

export default LinkTitle
