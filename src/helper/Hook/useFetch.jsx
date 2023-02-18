import { useQuery } from '@tanstack/react-query'

const useFetch = ({
  cacheName,
  fn,
  path,
  otherPath, // cause BE path doesnt match
  enabled = true,
  staleTime = 60 * 1000,
  refetchOnWindowFocus = true,
  refetchInterval = false,
}) => {
  const { data, isFetching, isLoading, status, refetch } = useQuery(cacheName, async () => await getScreenData(), {
    staleTime, // 1 minute
    refetchOnWindowFocus,
    enabled,
    refetchInterval,
  })

  const getScreenData = async () => {
    try {
      let res = await fn()
      let result
      result = path ? res.data?.[path] : res.data?.data
      if (otherPath) {
        result = { ...res.data }
      }
      return result
    } catch (error) {
      return error
    }
  }

  return { data, isLoading, status, refetch, isFetching }
  
}

export { useFetch }
