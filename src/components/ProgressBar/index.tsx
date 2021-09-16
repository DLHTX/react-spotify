import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import styles from './style.module.css'

interface IProps {
  startNumber?: number
  endNumber?: number
  minWidth?: string
  maxWidth?: string
  onBarClick: (donePercent: number) => void
  onBarDrag?: (donePercent: number) => void
}
interface IDraggable {
  x: number
  status: boolean
  percent: number
}

const ProgressBar: React.FC<IProps> = ({
  startNumber = 0,
  endNumber = 0,
  minWidth = '500px',
  maxWidth,
  onBarClick,
  onBarDrag,
}) => {
  const barRef = useRef<HTMLDivElement | null>()
  const dotRef = useRef<HTMLDivElement | null>()
  const [draggable, setDraggable] = useState<IDraggable>({
    x: 0,
    status: false,
    percent: 0,
  })

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

  useEffect(() => {
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  }, [draggable])

  const onMouseMove = (e: any) => {
    if (draggable.status) {
      let offsetProgress =
        (e.clientX - draggable.x) / (barRef.current?.clientWidth || 1)

      if (onBarDrag) {
        onBarDrag(draggable.percent + offsetProgress)
      }
    }
  }

  const onMouseUp = () => {
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp)
    setDraggable({
      ...draggable,
      status: false,
    })
  }

  const onMouseDown = (
    setDraggable: React.Dispatch<React.SetStateAction<IDraggable>>,
    e: any,
  ) => {
    const percent = GetPercent(e)
    setDraggable({
      ...draggable,
      x: e.clientX,
      status: true,
      percent,
    })
  }

  return (
    <div
      className={styles.progressBox}
      onClick={HandleBarClick}
      ref={(ref) => (barRef.current = ref)}
      style={{ minWidth, maxWidth }}
    >
      <div
        className={styles.progressBar}
        style={{
          width,
          backgroundColor: draggable.status ? 'rgb(29, 185, 84)' : '',
        }}
      >
        <div
          style={{ display: draggable.status ? 'block' : '' }}
          className={styles.dragDot}
          onMouseDown={(e) => onMouseDown(setDraggable, e)}
          ref={(ref) => (dotRef.current = ref)}
        ></div>
      </div>
    </div>
  )
}

export default ProgressBar
