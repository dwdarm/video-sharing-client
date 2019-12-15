import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import EditProfileForm from'./components/EditProfileForm';
import authStore from './store/auth.store';
import accountApi from './common/api/account';
import uploadApi from './common/api/upload';

class EditProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      account: {},
      isLoading: false,
      setAvatar: 'file',
      file: null,
      url: '',
      about: ''
    }
    this.handleError = this.handleError.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const { auth, history, match } = this.props;
    if ((!auth.isAuthenticated) || (auth.accountId != match.params.id)) {
      return history.replace('/');
    }

    (async () => {
      try {
        this.setState({isLoading: true});
        const res = await accountApi.getOne(match.params.id);
        if (res.status >= 400) throw new Error(res.status);
        const json = await res.json();
        this.setState({
          account: json.data,
          url: json.data.urlToAvatar,
          about: json.data.about,
          isLoading: false
        });
      } catch(err) {

      } 
    })();

  }

  handleError(err) {
    const { history, dispatch } = this.props;
    switch(err.message) {
      case '401':
        dispatch(authStore.actions.unauthenticate());
        return history.replace('/login');
      default:
        return this.setState({isLoading:false});
    }
  }

  async onSubmit() {
    try {
      this.setState({isLoading: true});
      const { auth, match, history, dispatch } = this.props;

      let urlToAvatar = this.state.url;
      if (this.state.setAvatar === 'file') {
        if (this.state.file !== null) {
          let res = await uploadApi.upload(this.state.file, auth.token);
          urlToAvatar = res.url;
        } 
      }

      await accountApi.update(match.params.id, auth.token, {
        urlToAvatar: urlToAvatar,
        about: this.state.about
      });

      dispatch((() => ({type:'CLEAR'}))());
      history.replace(`/profile/${match.params.id}`);

    } catch(err) {
      this.handleError(err);
    }
  }

  render() {
    return (
      <section className="section">
        <div className="container">
          <p className="title has-text-centered">Edit Profile</p>
          <EditProfileForm
            loading={this.state.isLoading}
            onSetAvatarChange={(e) => this.setState({setAvatar:e.target.value})}
            onFileAvatarChange={file => this.setState({file:file})}
            onUrlAvatarChange={(e) => this.setState({url:e.target.value})}
            onAboutChange={(e) => this.setState({about:e.target.value})}
            initialUrlToAvatarValue={this.state.account.urlToAvatar}
            initialAboutValue={this.state.account.about} 
            onSubmit={this.onSubmit}
          />
        </div>
      </section>
    );
  }
}

function mapStatesToProps(state) {
  return {
    auth: state.auth
  }
}

export default withRouter(connect(mapStatesToProps)(EditProfilePage));