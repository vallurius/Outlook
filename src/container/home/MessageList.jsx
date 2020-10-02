import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory, useParams} from 'react-router-dom';

import {emailClientActions} from 'redux/email-client/';

function MessageItem({item: {subject = '', content = '', mId}}) {
  const history = useHistory();
  let {pageType} = useParams();
  return (
    <div className="col-4" onClick={() => history.push(`/${pageType}/${mId}`)}>
      <p className="subject">{subject}</p>
      <div className="content">{content}</div>
    </div>
  );
}

function MessageList() {
  const dispatch = useDispatch();
  let {pageType} = useParams();

  async function getItems(pageType) {
    if (pageType === 'inbox') {
      await dispatch(emailClientActions.getInboxItems());
    } else if (pageType === 'deleted') {
      await dispatch(emailClientActions.getDeleteItems());
    } else if (pageType === 'custom') {
      await dispatch(emailClientActions.getCustomItems());
    }
    dispatch(emailClientActions.hasSeenPage(pageType));
  }

  React.useEffect(() => {
    getItems(pageType);
  }, [pageType]);
  const items = useSelector(
    (state) =>
      state.emailClient[
        pageType === 'inbox'
          ? 'inbox'
          : pageType === 'deleted'
          ? 'deleteItems'
          : 'custom'
      ] || [],
  );
  return (
    <React.Fragment>
      {items.map((item) => (
        <MessageItem key={item.mId} item={item} />
      ))}
    </React.Fragment>
  );
}

export default MessageList;
