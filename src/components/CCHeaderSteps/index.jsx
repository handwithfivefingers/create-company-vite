import { Card, Skeleton } from 'antd'
import clsx from 'clsx'
import React from 'react'
import { useSelector } from 'react-redux'
import styles from './styles.module.scss'
import { useStepData, useStepAPI } from '@/context/StepProgressContext'
const CCSteps = (props) => {
  const collapsed = useSelector((state) => state.commonReducer.collapsed)
  const { steps, currentStep } = useStepData()
  const { updateStep } = useStepAPI()
  const offset = steps?.length

  const styleProps = {
    ['--animate-duration']: `0.5s`,
    ['--animate-delay']: `0.3s`,
  }
  return (
    <Card className={clsx([styles.cardHeader, { [styles.collapsed]: collapsed }])}>
      <div className={styles.listStep} style={{ '--offset': offset }}>
        {steps?.map((item, index) => {
          return (
            <div
              className={clsx(styles.stepItem, {
                [styles.sticky]: currentStep == index,
                ['animate__animated animate__fadeIn animate__faster']: props.step == index,
              })}
              style={styleProps}
              onClick={() => updateStep(index)}
              key={['step_progress', index, offset]}
            >
              <div className={clsx([styles.stepContent])}>
                <div className={styles.icon}>
                  <Skeleton.Avatar active />
                </div>
                <div className={styles.content}>
                  <div className={styles.title}>{item.title}</div>
                  <div className={styles.desc}>{item.desc}</div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}

export default CCSteps
