import React from 'react';
import RegisterForm from './components/RegisterForm';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.props.history.replace('/');
    }
  }

  componentDidUpdate() {
    if (this.props.isAuthenticated) {
      this.props.history.replace('/');
    }
  }

  render() {
    return (
      <div className="section">
        <div className="container"> 
          <div className="form-wrapper">
            <p className="title has-text-centered">Register</p>
            <RegisterForm {...this.props} />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    error: state.auth.error
  }
}

export default withRouter(connect(mapStateToProps)(RegisterPage));