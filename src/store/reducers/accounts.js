const defaultState = {
  isLoading: false,
  error: null
}

function makeAccountModel(account) {
  const defaultIds = {
    ids: [],
    page: 1,
    hasMore: true,
    isLoading: false
  }

  return {
    ...account,
    likes: defaultIds,
    videos: defaultIds
  }
}

function transfromAccountArrayToObject(data) {
  return data.reduce((result, item) => {
    result[item.id] = makeAccountModel(item);
    return result;
  }, {});
}

function addAccountArray(state, accounts) {
  return {
    ...state,
    ...transfromAccountArrayToObject(accounts)
  }
}

function addAccountItem(state, account) {
  return {
    ...state,
    [account.id]: makeAccountModel(account)
  }
}

function updateAccountItem(state, id, data) {
  const account = state[id];
  return {
    ...state,
    [id]: {
      ...account,
      ...data
    }
  }
}

function addAccountVideoArrayToAccountItem(state, id, type, videos) {
  const account = state[id];
  const videoIds = videos.map(item => item.id);
  return {
    ...addAccountArray(state, videos.map(item => item.account)),
    [id]: {
      ...account,
      [type]: {
        ids: account[type].ids.concat(videoIds),
        page: account[type].page + 1,
        hasMore: videoIds.length > 0 ? true : false,
        isLoading: false
      }
    }
  }
}

function updateAccountVideoArray(state, id, type, data) {
  const account = state[id];
  return {
    ...state,
    [id]: {
      ...account,
      [type]: {
        ...account[type],
        ...data
      }
    }
  }
}

function accounts(state = defaultState, action) {
  switch(action.type) {

    case 'ADD_ACCOUNT_ITEM':
      return addAccountItem(state, action.account);

    case 'ADD_VIDEO_ARRAY':
      return addAccountArray(state, action.videos.map(item => item.account));

    case 'ADD_ACCOUNT_VIDEOS_ARRAY':
      return addAccountVideoArrayToAccountItem(state, action.id, 'videos', action.videos);

    case 'ADD_ACCOUNT_LIKES_ARRAY':
      return addAccountVideoArrayToAccountItem(state, action.id, 'likes', action.videos);

    case 'REQUEST_ACCOUNT_VIDEOS_ARRAY':
      return updateAccountVideoArray(state, action.id, 'videos', {
        isLoading: true
      });

    case 'REQUEST_ACCOUNT_LIKES_ARRAY':
    return updateAccountVideoArray(state, action.id, 'likes', {
      isLoading: true
    });

    case 'ADD_COMMENT_ARRAY':
      return addAccountArray(state, action.comments.map(item => item.account));

    case 'ADD_COMMENT_ITEM':
      return addAccountItem(state, action.comment.account);s

    case 'SUBSCRIBE_ACCOUNT':
      return updateAccountItem(state, action.id, {
        subscribersTotal: state[action.id].subscribersTotal + 1,
        isSubscribed: true
      });

    case 'UNSUBSCRIBE_ACCOUNT':
      return updateAccountItem(state, action.id, {
        subscribersTotal: state[action.id].subscribersTotal - 1,
        isSubscribed: false
      });

    case 'START_REQUEST_ACCOUNT':
      return {
        ...state,
        isLoading: true
      }

    case 'FINISH_REQUEST_ACCOUNT':
      return {
        ...state,
        isLoading: false
      }

    case 'SET_ERROR_ACCOUNT':
      return {
        ...state,
        error: action.error
      }

    case 'CLEAR_ERROR_ACCOUNT':
      return {
        ...state,
        error: null
      }

    case 'CLEAR':
    case 'CLEAR_ACCOUNT':
      return defaultState;

    default:
      return state;
  }
}

export default accounts;
