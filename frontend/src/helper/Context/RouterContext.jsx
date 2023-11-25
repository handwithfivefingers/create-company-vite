import { createContext, useReducer, useContext, useMemo } from 'react'

const iniRouterState = {
  to: '',
  from: '',
  listHistory: [],
}

const RouterContext = createContext(iniRouterState)
const RouterAPIContext = createContext({})

const listExclude = ['', '/', 'login', 'register', 'forgot-password']

const routerReducer = (state, action) => {
  // console.log(action)
  const { data } = action
  switch (action.type) {
    case 'updateHistory':
      return { ...state, from: data.from, to: data.to, listHistory: data.listHistory }
    default:
      return { ...state }
  }
}

const RouterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(routerReducer, iniRouterState)

  const api = useMemo(() => {
    const onRouterChange = ({ from, to }, curentRoute) => {
      const nextState = JSON.parse(JSON.stringify(curentRoute))
      nextState.from = from
      nextState.to = to
      if (!listExclude.includes(from)) {
        nextState.from = from
        nextState.listHistory = [...nextState?.listHistory, { from, to }]
      }
      dispatch({ type: 'updateHistory', data: nextState })
    }
    return {
      onRouterChange,
    }
  }, [])

  return (
    <RouterAPIContext.Provider value={api}>
      <RouterContext.Provider value={state}>{children}</RouterContext.Provider>
    </RouterAPIContext.Provider>
  )
}

const useRouterData = () => useContext(RouterContext)
const useRouterAPI = () => useContext(RouterAPIContext)

export { RouterProvider, useRouterData, useRouterAPI }
