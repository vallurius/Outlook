import LocalStorage from 'util/localStorage';

class StateSync {
  static saveState(key = 'state', state) {
    return LocalStorage.saveState(key, state);
  }

  static getState(key = 'state') {
    return LocalStorage.getState(key);
  }

  static saveRouteState(key = 'routeState', state) {
    return LocalStorage.saveState(key, state);
  }

  static getRouteState(key = 'routeState') {
    return LocalStorage.getState(key);
  }
}

export default StateSync;
