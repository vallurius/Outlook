import ACTION_CREATORS from '../actionCreators';

function emailClientReducer(state = {}, action) {
  switch (action.type) {
    case ACTION_CREATORS.SET_CUSTOM_ITEMS:
      return {
        ...state,
        custom: action.payload.value,
      };
    case ACTION_CREATORS.SET_DELETE_ITEMS:
      return {
        ...state,
        deleteItems: action.payload.value,
      };
    case ACTION_CREATORS.SET_INBOX_ITEMS:
      return {
        ...state,
        inbox: action.payload.value,
      };
    case ACTION_CREATORS.SET_SPAM_ITEMS:
      return {
        ...state,
        spam: action.payload.value,
      };
    default:
      return state;
  }
}

export default emailClientReducer;
