import { Button, Form, Input, Space, Spin } from 'antd'
import clsx from 'clsx'
import React, { forwardRef, useRef } from 'react'
import { useEffect } from 'react'
import { FcGoogle, FcUnlock } from 'react-icons/fc'
import styles from './Login.module.scss'

const LoginForm = forwardRef((props, ref) => {
  const ggRef = useRef()
  var auth2
  useEffect(() => {
    let ready = false
    let ggScript = document.createElement('script')
    ggScript.src = `https://apis.google.com/js/platform.js`
    document.body.appendChild(ggScript)
    ggScript.onload = ggScript.onreadystatechange = function () {
      if (!ready && (!this.readyState || this.readyState == 'complete')) {
        ready = true
        start()
      }
    }
  }, [])

  const start = () => {
    console.log('run')
    gapi.load('auth2', function () {
      const CLIENT_ID = '216335889679-9d8fesnrk3nh8gp2sktnepq4d63mfgi9'
      auth2 = gapi.auth2.init({
        client_id: `${CLIENT_ID}.apps.googleusercontent.com`,
      })
      // console.log(auth2)
      attachSignin(ggRef.current)
    })
  }

  const attachSignin = (element) => {
    // var profile = googleUser.getBasicProfile()
    // console.log('ID: ' + profile.getId()) // Do not send to your backend! Use an ID token instead.
    // console.log('Name: ' + profile.getName())
    // console.log('Image URL: ' + profile.getImageUrl())
    // console.log('Email: ' + profile.getEmail()) // This is null if the 'email' scope is not present.
    // auth2.grantOfflineAccess().then(signInCallback)
    // auth2.signIn(signInCallback)

    // .then()
    // console.log(auth2)
    auth2.attachClickHandler(
      element,
      {},
      (googleUser) => {
        console.log('success signin', googleUser)
      },
      (error) => {
        console.log('error signin', error)
      },
    )
  }

  const signInCallback = (authResult) => {
    console.log('signInCallback')
    console.log(authResult)
    if (authResult['code']) {
      ggRef.current.style.display = 'none'
      console.log(authResult['code'])
    } else {
      // There was an error.
    }
  }
  const onSignIn = (googleUser) => {
    console.log(googleUser)
  }
  return (
    <div className={clsx([styles.loginWrap, 'container'])}>
      <h1>Đăng nhập</h1>
      <Spin spinning={props.loading}>
        <Form ref={ref} onFinish={props.onFinish} layout="vertical">
          <Form.Item name="phone" label="Số điện thoại">
            <Input />
          </Form.Item>
          <Form.Item name="password" label="Mật khẩu">
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
              <Button type="primary" htmlType="submit">
                Đăng nhập
              </Button>
              <Button
                type="ghost"
                icon={<FcGoogle style={{ fontSize: 24 }} />}
                // onClick={props?.loginWithGoogle}
                // onClick={signinGG}
                ref={ggRef}
                // className="g-signin2"
                data-onsuccess="onSignIn"
                data-onfailure="onSignInFailure"
              />
            </div>
            <Button type="text" onClick={props?.forgotPassword}>
              Quên mật khẩu
            </Button>

            {/* <div className="g-signin2" data-onsuccess="onSignIn"></div> */}
          </Form.Item>
        </Form>
      </Spin>
    </div>
  )
})

export default LoginForm
