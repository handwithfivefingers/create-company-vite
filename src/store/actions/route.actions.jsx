import { ROUTE_DETECT } from "../type/route.type";

export const DetectRoute = (props) => {
  return (dispatch) => {
    dispatch({
      type: ROUTE_DETECT.SUCCESS,
      payload: {
        to: props.to,
        from: props.from,
      },
    });
  };
};
