import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducer'
import { composeWithDevTools } from '@redux-devtools/extension'
const middlewareEnhancer = applyMiddleware(thunkMiddleware)
// const composedEnhancers = composeWithDevTools(middlewareEnhancer )
const configStore = createStore(rootReducer, composeWithDevTools(middlewareEnhancer))

export default configStore
