import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faUser, faSignOutAlt, faSignInAlt, faRegistered } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import authStore from '../store/auth.store';

function DefaultMenu() {
  return (
    <div id="navbarMenu" className="navbar-menu">
      <div className="navbar-end">

        <Link 
          to="/login" 
          className="navbar-item"
        >
          <span className="icon"><FontAwesomeIcon icon={faSignInAlt} /></span>
          <span>Sign in</span>
        </Link>

        <div className="navbar-item">
          <Link 
            to="/register" 
            className="button is-success"
            role="button"
          >
            Register
          </Link>
        </div>

      </div>
    </div>
  );
}

function LoggedMenu(props) {
  return (
    <div id="navbarMenu" className="navbar-menu">

      <div className="navbar-start"> 
        <div className="navbar-item">
          <Link 
            to="/post-video" 
            className="button is-success"
            role="button"
          >
            <span className="icon"><FontAwesomeIcon icon={faPlus} /></span>
            <span>Post</span>
          </Link>
        </div>
      </div>

      <div className="navbar-end">

        <Link 
          to={`/profile/${props.accountId}`} 
          className="navbar-item"
        >
          <span className="icon"><FontAwesomeIcon icon={faUser} /></span>
          <span>{props.username}</span>
        </Link>

        <a 
          role="button" 
          className="navbar-item" 
          onClick={() => { 
            props.dispatch(authStore.actions.unauthenticate()); 
            props.dispatch((() => ({type:'CLEAR'}))());
          }}
        >
          <span className="icon"><FontAwesomeIcon icon={faSignOutAlt} /></span>
          <span>Sign out</span>
        </a>

      </div>
      
    </div>
  );
}

function NavBar(props) {
  return (
    <nav className="navbar is-black" role="navigation" aria-label="main navigation">
      <div className="container">

        { /* Navbar brand */ }
        <div className="navbar-brand">

          { /* Navbar title */ }
          <Link to="/" className="navbar-item"><strong>Video Sharing</strong></Link>

          { /* Navbar trigger button */ }
          <a 
            role="button" 
            className="navbar-burger" 
            aria-label="menu" 
            aria-expanded="false" 
            data-target="navbarMenu"
            onClick={() => {
              const el = document.querySelector('.navbar-burger');
              const target = document.getElementById(el.dataset.target);
              target.classList.toggle('is-active');
            }}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>

        </div>

        { /* Navbar menu */ }
        { props.isAuthenticated ? <LoggedMenu {...props} /> : <DefaultMenu /> }

      </div>
    </nav>
  );
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    accountId: state.auth.accountId,
    username: state.auth.username
  }
}

export default connect(mapStateToProps)(NavBar);