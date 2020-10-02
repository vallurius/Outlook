import StateSync from './stateSync';

class EmailClient {
  static async getInboxData() {
    let res = await fetch(process.env.REACT_APP_GET_INBOX_DATA);
    return res.json();
  }

  static async getDeletedData() {
    let res = await fetch(process.env.REACT_APP_GET_DELETED_DATA);
    return res.json();
  }

  static async getCustomData() {
    let res = await fetch(process.env.REACT_APP_GET_CUSTOM_DATA);
    return res.json();
  }

  static async getSpamData() {
    let res = await fetch(process.env.REACT_APP_GET_SPAM_DATA);
    return res.json();
  }

  static getState() {
    const state = StateSync.getState();
    if (!state) {
      return Promise.resolve(EmailClient.getInitialState());
    }
    return state;
  }

  static moveInboxItemToDelete(
    inboxItemId = '',
    inboxItems = [],
    deleteItems = [],
  ) {
    const foundItem = inboxItems.find((item) => item.mId === inboxItemId);
    if (foundItem) {
      const newDeleteItems = [...deleteItems, {...foundItem, unread: true}];
      const newInboxItems = inboxItems.filter(
        (item) => item.mId !== inboxItemId,
      );
      return [newInboxItems, newDeleteItems];
    }
    return [inboxItems, deleteItems];
  }

  static hasSeenItems(items = []) {
    return items.map((item) => {
      return {...item, unread: false};
    });
  }

  //////////////////////////////////// PRIVATE METHODS  ////////////////////////////////////

  static getInitialState() {
    return {
      emailClient: {
        inbox: undefined,
        spam: undefined,
        deleteItems: undefined,
        custom: undefined,
      },
    };
  }
}

export default EmailClient;
