import {useState, useEffect} from 'react'

const useWindowWidth = () => {
    const [value,setValue] = useState(window.innerWidth)
    useEffect(()=>{
        const getWidth = () =>{
          setValue(window.innerWidth)
        }
        window.addEventListener('resize', getWidth)
        return () => window.removeEventListener('resize', getWidth)
      },[value])
    return [value,setValue]
}

export default useWindowWidth
