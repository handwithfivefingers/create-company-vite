import LoadingScreen from '@/components/LoadingScreen'

import { RouterContext, RouterProvider } from '@/helper/Context'

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
// import locale from 'antd/es/locale/vi_VN'
import 'moment/locale/vi'
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
})

moment.defaultFormat = 'DD/MM/YYYY'

moment.locale('vi')
moment().utcOffset('+07:00');

const RouterComponent = (props) => {
  let location = useLocation()

  const elementComp = useRoutes(LAYOUT_ROUTER(props.auth)) // status, role

  const routeDetect = useDetectLocation(location)

  const { route, setRoute } = useContext(RouterContext)

  const dispatch = useDispatch()

  useEffect(() => {
    if (route !== routeDetect) {
      setRoute(routeDetect)
    }
    changeTitle(routeDetect?.to)
  }, [routeDetect])

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

  // return Route
  if (!elementComp) return null

  return elementComp
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
        {/* <ConfigProvider locale={locale}> */}
        <ConfigProvider>
          <RouterProvider value={{ route, setRoute: (val) => routerHistoryHandler(val) }}>
            <BrowserRouter>
              <RouterComponent auth={auth} />
            </BrowserRouter>
          </RouterProvider>
        </ConfigProvider>
        {/* <ReactQueryDevtools /> */}
      </QueryClientProvider>
    </div>
  )
}

export default App
