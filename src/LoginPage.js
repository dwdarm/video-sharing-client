import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import authStore from './store/auth.store';
import accountApi from './common/api/account';
import LoginForm from './components/LoginForm';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      isLoading: false,
      isError: false
    };

    this.onUsernameChange = this.onUsernameChange.bind(this);
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

  onPasswordChange(event) {
    this.setState({password:event.target.value});
  }

  async onSubmit() {
    try {
      this.props.dispatch((() => ({type:'CLEAR'}))());
      this.setState({isLoading: true});
      const res = await accountApi.login({
        username: this.state.username,
        password: this.state.password
      });
      if (res.status >= 400) throw new Error(res.status);
      const json = await res.json();
      this.props.dispatch(authStore.actions.authenticate(json.data.accessToken));
    } catch(err) {
      this.setState({
        isLoading: false,
        isError: true
      });
    }
  }

  render() {
    return (
      <section className="section">
        <div className="container"> 
          <p className="title has-text-centered">Login</p>
          <LoginForm
            loading={this.state.isLoading}
            onUsernameChange={this.onUsernameChange}
            onPasswordChange={this.onPasswordChange}
            onSubmit={this.onSubmit}
            showErrorNotification={this.state.isError}
          />
        </div>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  }
}

export default withRouter(connect(mapStateToProps)(LoginPage));