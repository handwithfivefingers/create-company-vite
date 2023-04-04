import LoadingScreen from '@/components/LoadingScreen'
import { RouterContext, RouterProvider } from '@/helper/Context'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import 'animate.css'
import { ConfigProvider } from 'antd'
import moment from 'moment'
import 'moment/locale/vi'
import { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, useLocation, useRoutes } from 'react-router-dom'
import './assets/css/styles.scss'
import { LAYOUT_ROUTER, UserRouter } from './constant/Route'
import { useAuth, useDetectLocation } from './helper/Hook'
import { CommonAction } from './store/actions'

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

moment().utcOffset('+07:00')

const RouterComponent = (props) => {
  let location = useLocation()

  const elementComp = useRoutes(LAYOUT_ROUTER(props.auth)) // status, role

  const routeDetect = useDetectLocation(location)

  const { route, setRoute } = useContext(RouterContext)

  const dispatch = useDispatch()

  useEffect(() => {
    handleDetectRoute(route, routeDetect)
    changeTitle(routeDetect?.to)
  }, [routeDetect])

  const handleDetectRoute = (routeComing, routeHistory) => {
    try {
      if (routeHistory.from && routeHistory.to) {
        const forgotRegex = new RegExp('forgot-password', 'g')
        const loginRegex = new RegExp('login', 'g')
        const registerRegex = new RegExp('register', 'g')

        if (routeHistory.to.match(forgotRegex)) return
        if (routeHistory.to.match(loginRegex)) return
        if (routeHistory.to.match(registerRegex)) return
        if (routeHistory.to === '/') return
        if (routeHistory.to.match) setRoute(routeHistory)
      }
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
