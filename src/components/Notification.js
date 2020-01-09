import React from 'react';

function Notification(props) {
  let type = 'is-primary';

  switch (props.type) {
    case 'error':
      type = 'is-danger';
      break;
    default:
      type = 'is-primary';
  }

  return (
    <div className={`notification has-text-centered ${type}`}>
      <strong>{props.text}</strong>
    </div>
  );
}

export default Notification;
