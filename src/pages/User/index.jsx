import { Spin, Space } from 'antd'
import React, { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import WithAuth from '@/components/HOC/WithAuth'
import { useEffect } from 'react'
import ProfileService from '../../service/UserService/ProfileService'
import { useFetch } from '../../helper/Hook'
const UserDashboard = () => {
  const {
    data: profileData,
    refetch,
    status,
    isLoading,
  } = useFetch({
    cacheName: ['userProfile'],
    fn: () => fetchProfile(),
  })
  const fetchProfile = () => ProfileService.getProfile()

  useEffect(() => {
    const PUBLIC_KEY = 'dsoujgdd2n9ranu8l3qkkbtrkx3mxgoj'
    
    let ready = false

    let tidioScript = document.createElement('script')
    
    tidioScript.src = `//code.tidio.co/${PUBLIC_KEY}.js`

    document.body.appendChild(tidioScript)
    tidioScript.onload = tidioScript.onreadystatechange = function () {
      if (!ready && (!this.readyState || this.readyState == 'complete')) {
        ready = true
        setTidioIdentify()
      }
    }
  }, [])

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

  return (
    <Suspense
      fallback={
        <div className="container spin-suspense">
          <Space align="center">
            <Spin spinning={true} tip="Loading..." delay={500} />
          </Space>
        </div>
      }
    >
      <Outlet
        context={{
          animateClass: 'animate__animated animate__fadeIn animate__faster',
        }}
      />
      {/* <a href="#" onClick={handleOpenTidio}>
        Open chat!
      </a> */}
    </Suspense>
  )
}

export default WithAuth(UserDashboard, 'user')
