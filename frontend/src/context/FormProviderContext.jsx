import { useContext, useMemo, useReducer, createContext } from 'react'
const ACTION_TYPE = {
  CREATE_FORM_PROVIDER: 'CREATE_FORM_PROVIDER',
  CREATE_FORM: 'CREATE_FORM',
  UPDATE_FORM_VALUE: 'UPDATE_FORM_VALUE',
  RESET_DEFAULT: 'RESET_DEFAULT',
}
const initForm = {
  formValue: undefined,
}

const reducer = (state, action) => {
  const { payload } = action
  switch (action.type) {
    case ACTION_TYPE.CREATE_FORM:
      return {
        ...state,
        [payload.formProvider]: {
          ...state[payload.formProvider],
          [payload.formName]: payload.form,
        },
      }
    case ACTION_TYPE.CREATE_FORM_PROVIDER:
      return {
        ...state,
        [payload.formName]: {},
      }
    case ACTION_TYPE.UPDATE_FORM_VALUE:
      return {
        ...state,
        formValue: payload,
      }
    case ACTION_TYPE.RESET_DEFAULT:
      return initForm
    default:
      return { ...state }
  }
}

const FormContext = createContext(initForm)

const FormAPIContext = createContext({})

const FormProviderContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initForm)

  const api = useMemo(() => {
    const createFormProvider = ({ formName }) => {
      dispatch({ type: ACTION_TYPE.CREATE_FORM_PROVIDER, payload: { formName } })
    }
    const createForm = ({ formProvider, formName, form }) => {
      dispatch({ type: ACTION_TYPE.CREATE_FORM, payload: { formProvider, formName, form } })
    }
    const updateFormValue = (formValue) => {
      dispatch({ type: ACTION_TYPE.UPDATE_FORM_VALUE, payload: formValue })
    }
    const resetDefault = () => {
      dispatch({ type: ACTION_TYPE.RESET_DEFAULT })
    }
    return {
      createFormProvider,
      createForm,
      updateFormValue,
      resetDefault,
    }
  }, [])

  // console.log('formContext', state)
  return (
    <FormAPIContext.Provider value={api}>
      <FormContext.Provider value={state}>{children}</FormContext.Provider>
    </FormAPIContext.Provider>
  )
}

const useFormData = () => useContext(FormContext)
const useFormAPI = () => useContext(FormAPIContext)

export { FormProviderContext, useFormAPI, useFormData }
