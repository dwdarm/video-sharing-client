function comments(state = { isLoading: false }, action) {
  switch(action.type) {

    case 'ADD_COMMENT_ITEM':
      return {
        ...state,
        [action.comment.id]: {
          ...action.comment,
          account: action.comment.account.id
        }
      }

    case 'ADD_COMMENT_ARRAY':
      return {
        ...state,
        ...action.comments.reduce((result, item) => {
          result[item.id] = {
            ...item,
            account: item.account.id
          }
          return result;
        }, {})
      }

    case 'START_REQUEST_COMMENT':
      return {
        ...state,
        isLoading: true
      }

    case 'FINISH_REQUEST_COMMENT':
      return {
        ...state,
        isLoading: false
      }

    case 'CLEAR':
    case 'CLEAR_COMMENT':
      return { isLoading: false };

    default:
      return state;
  }
}

export default comments;
