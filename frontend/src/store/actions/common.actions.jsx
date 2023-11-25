import { SIDEBAR_COLLAPSE, TITLE } from "../type/common.type";

export const sideCollapsed = (type) => {
  return async (dispatch) => {
    if (type) {
      // collapsed = true
      dispatch({
        type: SIDEBAR_COLLAPSE.COLLAPSED,
      });
    } else {
      // collapsed = false
      dispatch({
        type: SIDEBAR_COLLAPSE.EXPANDED,
      });
    }
  };
};

export const titleChange = (name, type = null) => {
  return async (dispatch) => {
    dispatch({
      type: TITLE.TITLE_CHANGE,
      payload: {
        title: name,
      },
    });
  };
};
