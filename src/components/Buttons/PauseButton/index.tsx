import React from 'react'
import styles from './style.module.css'

interface IProps {
  className?: string
  size?: number
  onClick?: any
}

const PauseButton: React.FC<IProps> = ({ className, size = 40, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`${className} ${styles.root}`}
      style={{ height: size, width: size }}
    >
      <svg role="img" height="16" width="16" viewBox="0 0 16 16">
        <path fill="none" d="M0 0h16v16H0z"></path>
        <path d="M3 2h3v12H3zm7 0h3v12h-3z"></path>
      </svg>
    </div>
  )
}

export default PauseButton
