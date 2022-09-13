import { AuthAction } from '@/store/actions'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ProvinceAction } from '@/store/actions'
import { useQuery } from '@tanstack/react-query'
const useAuth = () => {
  const authReducer = useSelector((state) => state.authReducer)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(AuthAction.AuthUser())
  }, [])

  return authReducer // status:true false, role: admin user
}

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

const useScrollAware = () => {
  const [scrollTop, setScrollTop] = useState(0)
  const ref = useRef()

  const onScroll = (e) =>
    requestAnimationFrame(() => {
      setScrollTop(e.target.scrollTop)
    })

  useEffect(() => {
    const scrollContainer = ref.current
    setScrollTop(scrollContainer?.scrollTop)
    scrollContainer.addEventListener('scroll', onScroll)
    return () => scrollContainer.removeEventListener('scroll', onScroll)
  }, [])

  return [scrollTop, ref]
}

const useFetch = ({ cacheName, fn, path, otherPath, enabled = true, staleTime = 60 * 1000, refetchOnWindowFocus = true, refetchInterval = false }) => {
  const { data, isFetching, isLoading, status, refetch } = useQuery(
    cacheName,
    async () => {
      let res = await fn()
      let result
      result = path ? res.data?.[path] : res.data?.data
      if (otherPath) {
        result = { ...result, ...res.data }
      }
      return result
    },
    {
      staleTime, // 1 minute
      refetchOnWindowFocus,
      enabled,
      refetchInterval,
    },
  )

  return { data, isLoading, status, refetch, isFetching }
}

export { useAuth, useDetectLocation, useScrollAware, useFetch }
