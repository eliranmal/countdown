
import {useEffect} from 'react'

const useAnimationFrame = (tickCallback = () => {}, stopPredicate = () => 1, dependencies) => {
  useEffect(() => {
    let reqId = window.requestAnimationFrame(function step() {
      tickCallback()
      if (!stopPredicate()) {
        reqId = window.requestAnimationFrame(step)
      }
    })
    return () => {
      window.cancelAnimationFrame(reqId)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies)
}

export default useAnimationFrame
