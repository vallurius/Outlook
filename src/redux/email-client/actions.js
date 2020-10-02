import EmailClientServices from 'services/emailClient';

import ACTION_CREATORS from 'redux/actionCreators';

export const getInboxItems = () => async (dispatch, state) => {
  // if contains in state, always prefer that
  if (!state().emailClient.inbox) {
    const response = await EmailClientServices.getInboxData();
    dispatch({
      type: ACTION_CREATORS.SET_INBOX_ITEMS,
      payload: {
        value: response,
      },
    });
  }
};

export const getDeleteItems = () => async (dispatch, state) => {
  // if contains in state, always prefer that
  if (!state().emailClient.deleteItems) {
    const response = await EmailClientServices.getDeletedData();
    dispatch({
      type: ACTION_CREATORS.SET_DELETE_ITEMS,
      payload: {
        value: response,
      },
    });
  }
};

export const getSpamItems = () => async (dispatch, state) => {
  // if contains in state, always prefer that
  if (!state().emailClient.spam) {
    const response = await EmailClientServices.getInboxData();
    dispatch({
      type: ACTION_CREATORS.SET_SPAM_ITEMS,
      payload: {
        value: response,
      },
    });
  }
};

export const getCustomItems = () => async (dispatch, state) => {
  // if contains in state, always prefer that
  if (!state().emailClient.custom) {
    const response = await EmailClientServices.getCustomData();
    dispatch({
      type: ACTION_CREATORS.SET_CUSTOM_ITEMS,
      payload: {
        value: response,
      },
    });
  }
};

export const moveToDeleteSection = (mid, pageType) => async (
  dispatch,
  state,
) => {
  const items =
    state().emailClient[
      pageType === 'inbox'
        ? 'inbox'
        : pageType === 'deleted'
        ? 'deleteItems'
        : 'custom'
    ] || [];
  const [
    newInboxItems,
    newDeleteItems,
  ] = EmailClientServices.moveInboxItemToDelete(
    mid,
    items,
    state().emailClient.deleteItems,
  );
  dispatch({
    type: ACTION_CREATORS.SET_INBOX_ITEMS,
    payload: {
      value: newInboxItems,
    },
  });
  dispatch({
    type: ACTION_CREATORS.SET_DELETE_ITEMS,
    payload: {
      value: newDeleteItems,
    },
  });
};

export const hasSeenPage = (pageType) => (dispatch, state) => {
  if (pageType === 'inbox') {
    const newItems = EmailClientServices.hasSeenItems(
      state().emailClient.inbox,
    );
    dispatch({
      type: ACTION_CREATORS.SET_INBOX_ITEMS,
      payload: {
        value: newItems,
      },
    });
  } else if (pageType === 'deleted') {
    const newItems = EmailClientServices.hasSeenItems(
      state().emailClient.deleteItems,
    );
    dispatch({
      type: ACTION_CREATORS.SET_DELETE_ITEMS,
      payload: {
        value: newItems,
      },
    });
  } else if (pageType === 'custom') {
    const newItems = EmailClientServices.hasSeenItems(
      state().emailClient.custom,
    );
    dispatch({
      type: ACTION_CREATORS.SET_CUSTOM_ITEMS,
      payload: {
        value: newItems,
      },
    });
  }
};
