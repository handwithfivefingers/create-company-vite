import LoadingScreen from '@/components/LoadingScreen'

import {
  RouterProvider,
  RouterContext,
  BreakPointProvider,
  BreakPointContext,
} from '@/helper/Context'

import { ConfigProvider } from 'antd'

import { useContext, useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { BrowserRouter, useLocation, useRoutes } from 'react-router-dom'

import { LAYOUT_ROUTER, UserRouter } from './constant/Route'

import { useAuth, useDetectLocation } from './helper/Hook'

import { CommonAction } from './store/actions'

import moment from 'moment'

import './assets/css/styles.scss'

import 'animate.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import 'moment/locale/vi'

import locale from 'antd/es/date-picker/locale/vi_VN'

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
  locale: locale,
})

moment.defaultFormat = 'DD/MM/YYYY'

moment.locale('vi')

const RouterComponent = (props) => {
  let location = useLocation()

  const Route = useRoutes(LAYOUT_ROUTER(props.auth)) // status, role

  const routeDetect = useDetectLocation(location)

  const { route, setRoute } = useContext(RouterContext)

  const [displayLocation, setDisplayLocation] = useState(location)

  const [transitionStage, setTransistionStage] = useState('fadeIn')

  const dispatch = useDispatch()

  useEffect(() => {
    let { pathname } = location

    if (route !== routeDetect) {
      setRoute(routeDetect)
    }

    if (location !== displayLocation && pathname === '/') {
      setTransistionStage('fadeOut')
    }

    changeTitle(pathname)
  }, [location])

  const changeTitle = (pathname) => {
    let item = UserRouter.find(
      (item) =>
        item.path.includes(pathname) ||
        (pathname.includes('/user/san-pham/') &&
          item.path === '/user/san-pham/'),
    )
    item && dispatch(CommonAction.titleChange(item.title))
  }
  console.log(route)
  return (
    <div
      className={`${transitionStage}`}
      onAnimationEnd={() => {
        if (
          transitionStage ===
          'animate__animated animate__fadeOut animate__faster'
        ) {
          setTransistionStage(
            'animate__animated animate__fadeIn animate__faster',
          )
          setDisplayLocation(location)
        }
      }}
    >
      {Route}
    </div>
  )
}

function App() {
  const auth = useAuth() // custom Hook

  const [route, setRoute] = useState({
    to: '',
    from: '',
    listHistory: [],
  })

  const authReducer = useSelector((state) => state.authReducer)

  const routerHistoryHandler = (val) => {
    setRoute((state) => ({
      ...state,
      ...val,
      listHistory: [...state.listHistory, { ...val }].slice(-20),
    }))
  }

  if (authReducer.authenticating && !authReducer.status) {
    return <LoadingScreen />
  }

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <ConfigProvider>
          <RouterProvider
            value={{ route, setRoute: (val) => routerHistoryHandler(val) }}
          >
            <BrowserRouter>
              <RouterComponent auth={auth} />
            </BrowserRouter>
          </RouterProvider>
        </ConfigProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  )
}

export default App
