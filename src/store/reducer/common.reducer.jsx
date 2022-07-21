import { SIDEBAR_COLLAPSE, TITLE } from "../type/common.type";
const initState = {
  collapsed: false,
  title: "",
};

export default function commonReducer(state = initState, action) {
  switch (action.type) {
    case SIDEBAR_COLLAPSE.COLLAPSED:
      return { ...state, collapsed: true };
    case SIDEBAR_COLLAPSE.EXPANDED:
      return { ...state, collapsed: false };
    case TITLE.TITLE_CHANGE:
      return {
        ...state,
        title: action.payload.title,
      };
    default:
      return state;
  }
}
