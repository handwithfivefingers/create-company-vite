import { ROUTE_DETECT } from "@/store/type/route.type";
const initState = {
  from: "",
  to: "",
};

export default function routeReducer(state = initState, action) {
  switch (action.type) {
    case ROUTE_DETECT.SUCCESS:
      return {
        ...state,
        from: action.payload.from,
        to: action.payload.to,
      };
    default:
      return state;
  }
}
