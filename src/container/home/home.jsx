import React from 'react';
import {Switch, Route, useRouteMatch, Redirect} from 'react-router-dom';

import SiteTemplate from 'container/templates/SiteTemplate';

import MenuOptions from './MenuOptions';
import MessageList from './MessageList';
import MessageContainer from './MessageContainer';

function Home() {
  return (
    <SiteTemplate>
      <div className="row home-container">
        <div className="col-1-2 menu-options--container">
          <div className="col-4 menu-options-search">
            <MailSearch />
          </div>
          <div className="col-4 menu-options">
            <MenuOptions />
          </div>
        </div>
        <div className="col-3 messages-container">
          <div className="col-4 messages-container-options"></div>
          <div className="col-1-2 messages-list-container">
            <MessageList />
          </div>
          <div className="col-2 message-container">
            <MessageContainer />
          </div>
        </div>
      </div>
    </SiteTemplate>
  );
}

function MailSearch() {
  return (
    <input
      type="text"
      className="input-search"
      placeholder="search Mail and people"
    />
  );
}

function HomeNestedRoutes() {
  let {path} = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}:pageType`}>
        <Home />
      </Route>
      <Redirect to={`${path}inbox`} />
    </Switch>
  );
}

export default HomeNestedRoutes;
