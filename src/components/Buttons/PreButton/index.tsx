import React from 'react'
import styles from './style.module.css'

interface IProps {
  className?: string
  onClick?: any
}

const PreButton: React.FC<IProps> = ({ className, onClick }) => {
  return (
    <div className={`${className} ${styles.root}`} onClick={onClick}>
      <svg
        role="img"
        focusable="false"
        height="24"
        width="24"
        viewBox="0 0 24 24"
      >
        <polyline
          points="16 4 7 12 16 20"
          fill="none"
          stroke="#ffffff"
        ></polyline>
      </svg>
    </div>
  )
}

export default PreButton
