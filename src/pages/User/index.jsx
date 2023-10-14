import WithAuth from '@/components/HOC/WithAuth'
import { StepProgressProvider } from '@/context/StepProgressContext'
import { useFetch } from '@/helper/Hook'
import ProfileService from '@/service/UserService/ProfileService'
import { Space, Spin } from 'antd'
import { Suspense, memo, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import GlobalService from '@/service/GlobalService'

const User = () => {
  useFetch({
    cacheName: ['careerData', 'province'],
    fn: () => GlobalService.getProvince(),
  })
  return (
    <>
      <Suspense
        fallback={
          <div className="container spin-suspense">
            <Space align="center">
              <Spin spinning={true} tip="Loading..." delay={500} />
            </Space>
          </div>
        }
      >
        <StepProgressProvider>
          <Outlet
            context={{
              animateClass: 'animate__animated animate__fadeIn animate__faster',
            }}
          />
        </StepProgressProvider>

        {/* <Tidio /> */}
      </Suspense>
    </>
  )
}

const Tidio = memo(() => {
  const [ready, setReady] = useState(false)
  const { data: profileData } = useFetch({
    cacheName: ['userProfile'],
    fn: () => fetchProfile(),
    refetchInterval: false,
    refetchOnWindowFocus: false,
  })

  const fetchProfile = () => ProfileService.getProfile()

  useEffect(() => TidioScript(), [])

  const TidioScript = () => {
    if (!window.tidioChatApi) {
      const PUBLIC_KEY = 'dsoujgdd2n9ranu8l3qkkbtrkx3mxgoj'
      let tidioScript = document.createElement('script')
      tidioScript.src = `//code.tidio.co/${PUBLIC_KEY}.js`
      document.body.appendChild(tidioScript)
      tidioScript.onload = tidioScript.onreadystatechange = function () {
        if (!ready && (!this.readyState || this.readyState == 'complete')) {
          setReady(true)
          setTidioIdentify()
        }
      }
    }
  }
  const setTidioIdentify = () => {
    if (profileData) {
      tidioChatApi.setVisitorData = {
        distinct_id: profileData._id, // Unique visitor ID in your system
        email: profileData.email, // visitor email
        name: profileData.name, // Visitor name
        phone: profileData.phone, //Visitor phone
      }
    }
  }
  return <></>
})

export default WithAuth(User, 'user')
