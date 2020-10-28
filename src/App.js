import React, { useState } from 'react';
import netlifyIdentity from 'netlify-identity-widget';

import Home from './Home';

export default function App() {
  const [user, setUser] = useState(netlifyIdentity.currentUser);

  const login = () => {
    netlifyIdentity.open();
    netlifyIdentity.on('login', (user) => {
      setUser(user);
    });
  };

  const signout = () => {
    netlifyIdentity.logout();
    netlifyIdentity.on('logout', () => {
      setUser(null);
    });
  };

  return (
    <div>
      {!user && <button onClick={login}>Log in</button>}
      {user && <Home user={user} onSignout={signout} />}
    </div>
  );
}
