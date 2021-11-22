const initialState = {
  style: '',
  message: '',
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW':
      return {
        style: action.style,
        message: action.message,
      };
    case 'HIDE':
      return {
        style: '',
        message: '',
      };
    default:
      return state;
  }
};

let timeoutChecker;

export const showNotification = (notification, t) => {
  return async (dispatch) => {
    dispatch({
      type: 'SHOW',
      ...notification,
    });

    if (timeoutChecker) {
      clearTimeout(timeoutChecker);
    }

    timeoutChecker = setTimeout(
      () =>
        dispatch({
          type: 'HIDE',
        }),
      t * 1000
    );
  };
};

export default notificationReducer;
