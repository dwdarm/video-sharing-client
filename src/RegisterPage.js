import React from 'react';
import RegisterForm from './components/RegisterForm';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import authStore from './store/auth.store';
import accountApi from './common/api/account';

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      isError: false,
      error: '',
      isLoading: false
    }

    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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

  onUsernameChange(event) {
    this.setState({username:event.target.value});
  }

  onEmailChange(event) {
    this.setState({email:event.target.value});
  }

  onPasswordChange(event) {
    this.setState({password:event.target.value});
  }

  async onSubmit() {
    try {
      this.props.dispatch((() => ({type:'CLEAR'}))());
      this.setState({isLoading: true});

      // register
      let res = await accountApi.register({
        username: this.state.username,
        email: this.state.email,
        password: this.state.password
      });
      if (res.status >= 400) throw new Error(res.status);
      let json = await res.json();

      // login
      res = await accountApi.login({
        username: this.state.username,
        password: this.state.password
      });
      if (res.status >= 400) throw new Error(res.status);
      json = await res.json();
      this.props.dispatch(authStore.actions.authenticate(json.data.accessToken));
    } catch(err) {
      let error = '';
      if (err.message === '400') {
        error = 'Invalid username/email and password must be minimum 8 characters'
      } else if (err.message === '403') {
        error = 'Username or email is already used'
      } 
      this.setState({
        isLoading: false,
        isError: true,
        error: error
      });
    }
  }

  render() {
    return (
      <div className="section">
        <div className="container"> 
          <div className="form-wrapper">
            <p className="title has-text-centered">Register</p>
            <RegisterForm
              loading={this.state.isLoading}
              showErrorNotification={this.state.isError}
              ErrorNotificationText={this.state.error}
              onUsernameChange={this.onUsernameChange}
              onEmailChange={this.onEmailChange}
              onPasswordChange={this.onPasswordChange}
              onSubmit={this.onSubmit}
            />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  }
}

export default withRouter(connect(mapStateToProps)(RegisterPage));