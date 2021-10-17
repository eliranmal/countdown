import {useEffect} from 'react'


const useKeyboard = (listener = () => {}) => {
  useEffect(() => {
    const keyListener = ({keyCode: code}) => listener({code})

    // keydown is best for capturing backspace and such
    document.addEventListener('keydown', keyListener)
    return () => {
      document.removeEventListener('keydown', keyListener)
    }
  })
}


export default useKeyboard
