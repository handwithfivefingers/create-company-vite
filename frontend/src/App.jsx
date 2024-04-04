import LoadingScreen from '@/components/LoadingScreen'
import { RouterProvider, useRouterAPI, useRouterData } from '@/helper/Context'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import 'animate.css'
import { ConfigProvider, message } from 'antd'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, useLocation, useRoutes } from 'react-router-dom'
import './assets/css/styles.scss'
import ZaloPlugin from './components/Zalo'
import { LAYOUT_ROUTER, UserRouter } from './constant/Route'
import { useAuth, useDetectLocation } from './helper/Hook'
import { CommonAction } from './store/actions'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import 'dayjs/locale/vi'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnWindowFocus: false,
    },
  },
})

ConfigProvider.config({
  theme: {
    primaryColor: '#cd2027',
  },
  locale: 'vi',
})

message.config({
  duration: 5,
})
dayjs.extend(utc)
dayjs.extend(timezone)

// const tz = 'Asia/Bangkok'
dayjs.locale('vi')
// dayjs.tz.setDefault(tz)
const RouterComponent = (props) => {
  let location = useLocation()

  // eslint-disable-next-line react/prop-types
  const elementComp = useRoutes(LAYOUT_ROUTER(props.auth)) // status, role

  const routeDetect = useDetectLocation(location)

  const route = useRouterData()
  const { onRouterChange } = useRouterAPI()

  const dispatch = useDispatch()
  useEffect(() => {
    window.dayjs = dayjs
  }, [])

  useEffect(() => {
    handleDetectRoute(routeDetect)
    changeTitle(routeDetect?.to)
  }, [routeDetect])

  const handleDetectRoute = (routeHistory) => {
    try {
      onRouterChange(routeHistory, route)
    } catch (error) {
      console.log('detected route failed', error)
    }
  }

  const changeTitle = (pathname) => {
    let path = pathname.split('/').reverse()

    let item
    for (let i = 0; i <= path.length; i++) {
      let currentPath = path[i]

      item = UserRouter.find((route) => route.path.includes(currentPath))
      if (item) break
    }
    item && dispatch(CommonAction.titleChange(item.title))
  }

  if (!elementComp) return null

  return elementComp
}

function App() {
  const auth = useAuth() // custom Hook

  const authReducer = useSelector((state) => state.authReducer)

  if (authReducer.authenticating && !authReducer.status) {
    return <LoadingScreen />
  }

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <ConfigProvider>
          <RouterProvider>
            <BrowserRouter>
              <RouterComponent auth={auth} />
            </BrowserRouter>
          </RouterProvider>
        </ConfigProvider>
      </QueryClientProvider>
      <ZaloPlugin />
    </div>
  )
}

export default App
