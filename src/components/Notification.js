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
    <section className="section">
      <div className="container">
        <div className={`notification has-text-centered ${type}`}>
          <strong>{props.text}</strong>
        </div>
      </div>
    </section>
  );
}

export default Notification;
