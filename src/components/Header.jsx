import React from 'react';

function Header() {
  return (
    <header className="row">
      <div className="col-4">
        <span>Outlook Mail</span>
        <div className="circle">
          <div className="notification-count">
            <span className="text">1</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
