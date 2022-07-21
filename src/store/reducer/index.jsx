import { combineReducers } from "redux";

import authReducer from "./auth.reducer";
import commonReducer from "./common.reducer";
import routeReducer from "./route.reducer";

const rootReducer = combineReducers({
  authReducer,
  commonReducer,
  routeReducer,
});
export default rootReducer;
