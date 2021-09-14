import React from 'react'
import styles from './style.module.css'

interface IProps {
  className?: string
  size?: number
}

const PlayButton: React.FC<IProps> = ({ className, size = 40 }) => {
  return (
    <div
      className={`${className} ${styles.root}`}
      style={{ height: size, width: size }}
    >
      <svg
        height="18"
        role="img"
        width="18"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <polygon
          points="21.57 12 5.98 3 5.98 21 21.57 12"
          fill="currentColor"
        ></polygon>
      </svg>
    </div>
  )
}

export default PlayButton
