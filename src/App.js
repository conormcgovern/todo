import React, { useState } from 'react';
import netlifyIdentity from 'netlify-identity-widget';

import Home from './Home';

const netlifyAuth = {
  isAuthenticated: false,
  user: null,
  authenticate(callback) {
    this.isAuthenticated = true;
    netlifyIdentity.open();
    netlifyIdentity.on('login', (user) => {
      this.user = user;
      callback(user);
    });
  },
  signout(callback) {
    this.isAuthenticated = false;
    netlifyIdentity.logout();
    netlifyIdentity.on('logout', () => {
      this.user = null;
      callback();
    });
  },
};

export default function App() {
  console.log('in App component');
  const [user, setUser] = useState(null);

  const login = () => {
    netlifyAuth.authenticate((user) => {
      setUser(user);
    });
  };

  return (
    <div>
      {!user && <button onClick={login}>Log in</button>}
      {user && <Home user={user} />}
    </div>
  );
}
