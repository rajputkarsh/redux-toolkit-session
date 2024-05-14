import { Action, ACTIONS } from "./actions";

const initalState = {
  count: 0,
};

const countReducer = (state = initalState, action: { type: Action }) => {
  switch (action.type) {
    case ACTIONS.INCREMENT:
      console.log(`here`);
      return {
        ...state,
        count: state.count + 1,
      };
    case ACTIONS.DECREMENT:
      return {
        ...state,
        count: state.count - 1,
      };
    case ACTIONS.RESET:
      return {
        ...state,
        count: 0,
      };

    default:
      return state;
  }
};

export default countReducer;
