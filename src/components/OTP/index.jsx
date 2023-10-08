import { Form, Input, Space, message } from 'antd'
import React, { useRef, useState } from 'react'
import styles from './styles.module.scss'
import clsx from 'clsx'

const OTPInput = () => {
  const formInstance = Form.useFormInstance()
  const inputRef = useRef([])
  const inputLength = 6

  const handleKeyPress = async (event, pos) => {
    if (event.ctrlKey) return
    if (event.ctrlKey && (event.code === 'KeyV' || event.key === 'v')) return
    const nextInput = inputRef.current[pos + 1]
    const current = inputRef.current[pos]
    const prevInput = inputRef.current[pos - 1]

    if (event.code === 'Backspace') {
      formInstance.setFields([
        {
          name: ['otp', pos],
          value: '',
        },
      ])
      await sleep()
      if (pos !== 0) prevInput.focus()
    } else {
      formInstance.setFields([
        {
          name: ['otp', pos],
          value: event.target.value,
        },
      ])
      await sleep()
      if (pos + 1 < inputLength) nextInput.focus()
    }
  }

  const handlePaste = async (event) => {
    try {
      event.stopPropagation()

      const data = (event.clipboardData || window.clipboardData).getData('text')
      const nextData = data.split('')

      if (data.length > inputLength) throw new Error('Mã xác thực không đúng')
      if (nextData.some((item) => isNaN(Number(item)))) throw new Error('Mã xác thực không đúng')

      // formI
      for (let i = 0; i < nextData.length; i++) {
        formInstance.setFields([
          {
            name: ['otp', i],
            value: nextData[i],
          },
        ])
      }
      await sleep()
      if (inputRef.current.length) {
        inputRef.current[inputRef.current.length - 1].focus()
      }
    } catch (error) {
      console.log('error', error)
      message.error(error.message || 'Something went wrong')
    }
  }

  const sleep = (t = 25) => {
    return new Promise((resolve) => setTimeout(resolve, t))
  }

  return (
    <div className={clsx(styles.otpWrapper)}>
      <Space>
        {Array(inputLength)
          .fill('')
          .map((_, index) => {
            return (
              <Form.Item name={['otp', index]} key={`otp_${index}`}>
                <Input
                  maxLength={1}
                  ref={(ref) => (inputRef.current[index] = ref)}
                  onPaste={(e) => handlePaste(e, index)}
                  onKeyDown={(e) => handleKeyPress(e, index)}
                />
              </Form.Item>
            )
          })}
      </Space>
    </div>
  )
}

export default OTPInput
