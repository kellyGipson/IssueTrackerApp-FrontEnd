// State machine used for the Login component

export const states: { [key: string]: any } = {
  idle: "idle",
  isLoading: "loading",
  isError: "error",
  isSuccess: "success",
}

const transitions: { [key: string]: any } = {
  [states.idle]: {
    SUBMIT_FORM: states.isLoading,
  },
  [states.isLoading]: {
    SUBMIT_FORM_SUCCESS: states.isSuccess,
    SUBMIT_FORM_ERROR: states.isError,
  },
  [states.isError]: {
    SUBMIT_FORM: states.isLoading,
  },
  [states.isSuccess]: {
    RESET_FORM: states.idle,
  }
}

function transition(currentState:string, action:string) {
  const nextState = transitions[currentState][action];
  return nextState || currentState;
}

export function updateState(currentStateSetter: React.Dispatch<React.SetStateAction<string>>, action:string) {
  currentStateSetter(currentState => transition(currentState, action));
}