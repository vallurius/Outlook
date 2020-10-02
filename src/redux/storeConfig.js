import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducerConfig';

import EmailClientServices from 'services/emailClient';
import StateSync from 'services/stateSync';

async function getStore() {
  const persistedState = await EmailClientServices.getState();
  const store = createStore(
    rootReducer,
    persistedState,
    compose(applyMiddleware(thunk)),
  );

  // All the actions made on redux state should be save.
  // To suffice refresh case with state.
  store.subscribe(() => {
    StateSync.saveState('state', {
      emailClient: store.getState().emailClient,
    });
  });

  return store;
}

export {getStore};
