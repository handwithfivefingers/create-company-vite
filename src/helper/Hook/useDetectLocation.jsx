import { useState } from 'react'
import { useEffect } from 'react'

const useDetectLocation = (location) => {
  const [route, setRoute] = useState({
    to: '',
    from: '', //--> previous pathname
  })
  //   const dispatch = useDispatch();
  useEffect(() => {
    setRoute((prev) => ({ to: location.pathname, from: prev.to }))
  }, [location])

  return route
}

export { useDetectLocation }
