import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import store from '@/store'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ConfigProvider } from 'antd'
import { FormProviderContext } from '@/context/FormProviderContext'
import { BrowserRouter } from 'react-router-dom'

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

const AllTheProviders = ({ children }) => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ConfigProvider>
          <FormProviderContext>
            <BrowserRouter>{children}</BrowserRouter>
          </FormProviderContext>
        </ConfigProvider>
      </QueryClientProvider>
    </Provider>
  )
}

const customRender = (ui, options) => render(ui, { wrapper: AllTheProviders, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
