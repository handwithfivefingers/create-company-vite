import LoadingScreen from '@/components/LoadingScreen'
import { RouterContext, RouterProvider } from '@/helper/Context'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ConfigProvider } from 'antd'
import moment from 'moment'
import { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, useLocation, useRoutes } from 'react-router-dom'
import { LAYOUT_ROUTER, UserRouter } from './constant/Route'
import { useAuth, useDetectLocation } from './helper/Hook'
import { CommonAction } from './store/actions'
import 'moment/locale/vi'
import 'animate.css'
import './assets/css/styles.scss'

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
      // console.log('routeComing', routeComing)
      // console.log('routeHistory', routeHistory)
      // if (routeComing.to !== routeHistory.to) {
      //   const forgotRegex = new RegExp('forgot-password', 'g')
      //   const loginRegex = new RegExp('login', 'g')
      //   const registerRegex = new RegExp('register', 'g')

      //   let match =
      //     routeHistory.to.match(forgotRegex) ||
      //     routeHistory.to.match(loginRegex) ||
      //     routeHistory.to.match(registerRegex)

      //   if (routeHistory.to === '/' || routeHistory.to !== '') return
      //   else if (!match) setRoute(routeHistory)

      // }
      setRoute(routeHistory)
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

  const routerHistoryHandler = ({ from, to }) => {
    const nextState = JSON.parse(JSON.stringify(route))
    nextState.from = from
    nextState.to = to
    const listExclude = ['', '/', 'login', 'register', 'forgot-password']
    if (!listExclude.includes(from)) {
      nextState.from = from
      nextState.listHistory = [...nextState.listHistory, { from, to }]
      nextState.listHistory = nextState.listHistory.filter((routeItem) => !listExclude.includes(routeItem.from))
    }
    setRoute(nextState)
  }

  if (authReducer.authenticating && !authReducer.status) {
    return <LoadingScreen />
  }

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <ConfigProvider>
          <RouterProvider value={{ route, setRoute: (val) => routerHistoryHandler(val) }}>
            <BrowserRouter>
              <RouterComponent auth={auth} />
            </BrowserRouter>
          </RouterProvider>
        </ConfigProvider>
      </QueryClientProvider>
    </div>
  )
}

export default App
