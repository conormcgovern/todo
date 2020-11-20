import React, { useState } from 'react';
import netlifyIdentity from 'netlify-identity-widget';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import Home from './Home';

function PrivateRoute({ component: Component, ...rest }) {
  const isAuthenticated = !!netlifyIdentity.currentUser();
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}

function Protected({ history, match }) {
  const handleSignout = () => {
    netlifyIdentity.logout();
    netlifyIdentity.on('logout', () => {
      history.push('/login');
    });
  };
  const listId = match.params.listId;
  return <Home listId={listId} history={history} onSignout={handleSignout} />;
}

function Login({ location }) {
  const isAuthenticated = !!netlifyIdentity.currentUser();
  const [redirectToReferrer, setRedirectToRenderer] = useState(isAuthenticated);

  const login = () => {
    netlifyIdentity.open();
    netlifyIdentity.on('login', () => {
      setRedirectToRenderer(true);
    });
  };
  let { from } = location.state || { from: { pathname: '/tasks' } };

  return (
    <div>
      {redirectToReferrer && <Redirect to={from} />}
      {!redirectToReferrer && (
        <div>
          <p>You must log in to view this page.</p>
          <button onClick={login}>Log in</button>
        </div>
      )}
    </div>
  );
}

export default function App() {
  console.log(netlifyIdentity.currentUser());
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/login" component={Login}></Route>
          <PrivateRoute
            path={['/tasks/:listId', '/tasks']}
            component={Protected}
          />
          <Route path="/" exact>
            <Redirect to="/tasks" />
          </Route>
          <Route path="/" render={() => <div>Not found</div>}></Route>
        </Switch>
      </div>
    </Router>
  );
}
