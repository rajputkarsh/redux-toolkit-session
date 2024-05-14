
export type Action = "INCREMENT" | "DECREMENT" | "RESET";


export const ACTIONS: {[key in Action]: Action} = {
  INCREMENT: "INCREMENT",
  DECREMENT: "DECREMENT",
  RESET: "RESET",
} as const;

export const increment = () => {
  return {
    type: ACTIONS.INCREMENT,
  };
};

export const decrement = () => {
  return {
    type: ACTIONS.DECREMENT,
  };
};

export const reset = () => {
  return {
    type: ACTIONS.RESET,
  };
};
