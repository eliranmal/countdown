import {useState, useEffect} from 'react'


const useKeyboard = () => {
  const [key, setKey] = useState()

  useEffect(() => {
    const keyListener = ({keyCode: code}) => setKey({code})
    document.addEventListener('keydown', keyListener)
    return () => {
      document.removeEventListener('keydown', keyListener)
    }
  })

  return key
}

export default useKeyboard
