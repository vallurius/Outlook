import React from 'react';
import {useHistory} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {useParams} from 'react-router-dom';

import {emailClientActions} from 'redux/email-client/';

function MenuOptions() {
  const history = useHistory();
  const dispatch = useDispatch();
  const {pageType} = useParams();
  const [menuOptions, setMenuOptions] = React.useState({
    options: [
      {label: 'Inbox', selected: true, count: 0, href: '/inbox'},
      {label: 'Junk Email', selected: false, count: 0, href: '/junk-email'},
      {label: 'Custom', selected: false, count: 0, href: '/custom'},
      {label: 'Sent Items', selected: false, count: 0, href: '/sent'},
      {label: 'Deleted Items', selected: false, count: 0, href: '/deleted'},
      {label: 'Archive', selected: false, count: 0, href: '/archived'},
    ],
  });

  const onMenuItemClick = (route) => {
    history.push(route);
  };

  React.useEffect(() => {
    dispatch(emailClientActions.getInboxItems());
    dispatch(emailClientActions.getDeleteItems());
    dispatch(emailClientActions.getCustomItems());
  }, []);

  const emailClient = useSelector((state) => state.emailClient);

  React.useEffect(() => {
    const {inbox = [], deleteItems = [], custom = []} = emailClient;
    const inboxUnred = inbox.filter((item) => item.unread).length;
    const deletedUnred = deleteItems.filter((item) => item.unread).length;
    const customUnred = custom.filter((item) => item.unread).length;

    setMenuOptions({
      options: [
        {label: 'Inbox', selected: true, count: inboxUnred, href: '/inbox'},
        {label: 'Junk Email', selected: false, count: 0, href: '/junk-email'},
        {label: 'Custom', selected: false, count: customUnred, href: '/custom'},
        {label: 'Sent Items', selected: false, count: 0, href: '/sent'},
        {
          label: 'Deleted Items',
          selected: false,
          count: deletedUnred,
          href: '/deleted',
        },
        {label: 'Archive', selected: false, count: 0, href: '/archived'},
      ],
    });
  }, [emailClient]);

  return (
    <div className="row">
      {menuOptions.options.map((option) => (
        <div
          className={`col-4 menu-option ${
            `/${pageType}` === option.href ? 'highlight' : ''
          } `}
          key={option.label}
          onClick={() => onMenuItemClick(option.href)}>
          {option.label}
          {option.count > 0 && (
            <span className="pull-right count">{option.count}</span>
          )}
        </div>
      ))}
    </div>
  );
}

export default MenuOptions;
