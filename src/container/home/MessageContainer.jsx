import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Switch, Route, useRouteMatch, useParams} from 'react-router-dom';

import {emailClientActions} from 'redux/email-client/';

function MessageContainer() {
  let {pageType, mId} = useParams();

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

  const dispatch = useDispatch();

  const moveToDeleteSection = () => {
    dispatch(emailClientActions.moveToDeleteSection(mId, pageType));
  };

  const item = items.find((item) => item.mId === mId);
  return (
    <div className="col-4">
      <div className="row">
        {item && (
          <div className="col-4">
            <p>{item.content}</p>
            <p>
              <button onClick={moveToDeleteSection}>Delete</button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function MessageContainerRoutes() {
  let {path} = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/:mId`}>
        <MessageContainer />
      </Route>
    </Switch>
  );
}

export default MessageContainerRoutes;
