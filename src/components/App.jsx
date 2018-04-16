import React, { Component } from 'react';
import Profile from './Profile.jsx';
import Signin from './Signin.jsx';
import {
  isSignInPending,
  isUserSignedIn,
  redirectToSignIn,
  handlePendingSignIn,
  signUserOut
} from 'blockstack';

import { Switch, Route } from 'react-router-dom';

export default class App extends Component {
  handleSignIn (e) {
    e.preventDefault();
    const origin = window.location.origin;
    redirectToSignIn(origin, origin + '/manifest.json', ['store_write', 'publish_data']);
  }

  handleSignOut (e) {
    e.preventDefault();
    signUserOut(window.location.origin);
  }

  render () {
    return (
      <div className='site-wrapper'>
        <div className='site-wrapper-inner'>
          {!isUserSignedIn()
            ? <Signin handleSignIn={this.handleSignIn} />
            : <Switch>
              <Route
                path='/:username'
                render={
                  reouteProps => <Profile handleSignOut={this.handleSignOut} {...reouteProps} />
                }
              />
            </Switch>
          }
        </div>
      </div>
    );
  }

  componentWillMount () {
    if (isSignInPending()) {
      handlePendingSignIn().then((userData) => {
        window.location = window.location.origin;
      });
    }
  }
}
