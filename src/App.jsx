import LoadingScreen from '@/components/LoadingScreen'
import { RouterProvider, useRouterAPI, useRouterData } from '@/helper/Context'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ConfigProvider, message } from 'antd'
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
import { FormProviderContext } from './context/FormProviderContext'

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
message.config({
  duration: 5,
})
moment.defaultFormat = 'DD/MM/YYYY'

moment.locale('vi')

moment().utcOffset('+07:00')

const RouterComponent = (props) => {
  let location = useLocation()

  const elementComp = useRoutes(LAYOUT_ROUTER(props.auth)) // status, role

  const routeDetect = useDetectLocation(location)

  const route = useRouterData()
  const { onRouterChange } = useRouterAPI()

  const dispatch = useDispatch()

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
          <FormProviderContext>
            <RouterProvider>
              <BrowserRouter>
                <RouterComponent auth={auth} />
              </BrowserRouter>
            </RouterProvider>
          </FormProviderContext>
        </ConfigProvider>
      </QueryClientProvider>
    </div>
  )
}

export default App
