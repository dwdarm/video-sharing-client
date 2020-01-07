import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

function Loading() {
  return(
    <section className="section">
      <div className="container">
        <p className="has-text-centered">
          <span className="icon">
            <FontAwesomeIcon icon={faSpinner} size="lg" pulse/>
          </span>
        </p>
      </div>
    </section>
  );
}

export default Loading;
