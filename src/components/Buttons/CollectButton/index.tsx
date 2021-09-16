import React, { useCallback, useEffect, useState } from 'react'
import { Player } from '@lottiefiles/react-lottie-player'

interface IProps {
  style?: any
  onChange?(isChoose: boolean): void
}
const CollectButton: React.FC<IProps> = ({ style, onChange }) => {
  const [lottie, setLottie] = useState<any>(null)
  const [isChoose, setIsChoose] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    if (lottie) {
      //   lottie.setSegment(0)
    }
  }, [lottie])

  //   const handleClick = useCallback(() => {

  //   }, [lottie])

  const handleClick = useCallback(() => {
    setIsPlaying(true)
    if (isPlaying) return
    if (isChoose) {
      lottie.setSpeed(2)
      lottie.setDirection(-1)
      lottie.playSegments([90, 0], true)
      setTimeout(() => {
        lottie.goToAndStop(0, true)
        setIsChoose(false)
        setIsPlaying(false)
        if(onChange) onChange(false)
      }, 1200)
    } else {
      lottie.setSpeed(2)
      lottie.setDirection(1)
      lottie.playSegments([0, 90], true)
      setTimeout(() => {
        lottie.goToAndStop(90, true)
        setIsChoose(true)
        setIsPlaying(false)
        if(onChange) onChange(true)
      }, 1200)
    }
  }, [isChoose, isPlaying, lottie])

  return (
    <div style={style} className="cursor-pointer" onClick={handleClick}>
      <Player
        onEvent={(event) => {
          if (event === 'play') {
            console.log('stop')
          }
        }}
        controls
        lottieRef={(instance: any) => {
          setLottie(instance) // the lottie instance is returned in the argument of this prop. set it to your local state
        }}
        src="https://assets10.lottiefiles.com/packages/lf20_zmf796.json"
        style={{ width: '100px' }}
      ></Player>
    </div>
  )
}

export default CollectButton
