import React, { useCallback, useMemo, useRef } from 'react'
import styles from './style.module.css'

interface IProps {
  startNumber?: number
  endNumber?: number
  minWidth?: string
  maxWidth?: string
  onBarClick: (donePercent: number) => void
}

const ProgressBar: React.FC<IProps> = ({
  startNumber = 0,
  endNumber = 0,
  minWidth = '500px',
  maxWidth,
  onBarClick,
}) => {
  const barRef = useRef<HTMLDivElement | null>()
  const dotRef = useRef<HTMLDivElement | null>()

  const GetPercent = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    const box = barRef.current?.getBoundingClientRect()
    const clickX = event.pageX - (box?.x || 0)
    const percent = barRef.current ? clickX / barRef.current.offsetWidth : 0
    return percent
  }, [])

  const width = useMemo(() => {
    return `${(startNumber / endNumber) * 100}%`
  }, [startNumber, endNumber])

  const HandleBarClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const percent = GetPercent(event)
      onBarClick(percent)
    },
    [GetPercent, onBarClick],
  )

  return (
    <div
      className={styles.progressBox}
      onClick={HandleBarClick}
      ref={(ref) => (barRef.current = ref)}
      style={{ minWidth, maxWidth }}
    >
      <div className={styles.progressBar} style={{ width }}>
        <div className={styles.dragDot}></div>
      </div>
    </div>
  )
}

export default ProgressBar
