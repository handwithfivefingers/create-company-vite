import { useReducer, useMemo, createContext, useContext } from 'react'

const initStepDataContext = {
  currentStep: 0,
  steps: [],
}

const StepProgressContext = createContext(initStepDataContext)

const reducer = (state, action) => {
  console.log(action.type)

  switch (action.type) {
    case 'createStep':
      return { ...state, steps: action.steps }
    case 'decreaseStep':
      return { ...state, currentStep: state.currentStep - action.step }
    case 'increaseStep':
      return { ...state, currentStep: state.currentStep + action.step }
    case 'updateStep':
      return { ...state, currentStep: action.step }
    default:
      return { ...state }
  }
}

const StepProgressAPI = createContext({})

const StepProgressProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initStepDataContext)
  const api = useMemo(() => {
    const onNextStep = () => {
      dispatch({ type: 'increaseStep', step: 1 })
    }
    const onPrevStep = () => {
      dispatch({ type: 'decreaseStep', step: 1 })
    }
    const onCreateStep = (steps) => {
      dispatch({ type: 'createStep', steps })
    }
    const updateStep = (stepNumber) => {
      dispatch({ type: 'updateStep', step: stepNumber })
    }
    return { onNextStep, onPrevStep, onCreateStep, updateStep }
  }, [])
  return (
    <StepProgressAPI.Provider value={api}>
      <StepProgressContext.Provider value={state}>{children}</StepProgressContext.Provider>
    </StepProgressAPI.Provider>
  )
}
const useStepData = () => useContext(StepProgressContext)
const useStepAPI = () => useContext(StepProgressAPI)

export { useStepData, useStepAPI, StepProgressProvider }
