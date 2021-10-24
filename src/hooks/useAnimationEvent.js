import {useEffect} from 'react'


const animationHandler = (name, callback) => ({animationName}) => {
  if (animationName === name) {
    callback()
  }
}

const useAnimationEvent = (name, onStart = () => {}, onEnd = () => {}, dependencies) => {
  useEffect(() => {
    const onAnimationStart = animationHandler(name, onStart)
    const onAnimationEnd = animationHandler(name, onEnd)
    document.addEventListener('animationstart', onAnimationStart)
    document.addEventListener('animationend', onAnimationEnd)
    return () => {
      document.removeEventListener('animationstart', onAnimationStart)
      document.removeEventListener('animationend', onAnimationEnd)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies)
}


export default useAnimationEvent
