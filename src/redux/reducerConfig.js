import {combineReducers} from 'redux';

import {emailClientReducer} from './email-client';

const rootReducer = combineReducers({
  emailClient: emailClientReducer,
});

export default rootReducer;
