import React from 'react';
import { BrowserRouter as Router, Route, NavLink, Redirect, Switch } from 'react-router-dom';
import { css, injectGlobal, keyframes } from 'emotion';
import UserList from './containers/UserList/UserList';
import BurgerShopList from './containers/BurgerShopList/BurgerShopList';
import BurgerShop from './containers/BurgerShop/BurgerShop';
import BurgerRating from './containers/BurgerRating/BurgerRating';
import DummySignUp from './containers/Authentication/SignUp/DummySignUp';
import DummySignIn from './containers/Authentication/SignIn/DummySignIn';
import LandingPage from './containers/LandingPage/LandingPage';
import HomePage from './containers/HomePage/HomePage';
import AuthContext from './containers/Authentication/AuthContext'

const fadeIn = keyframes` 
  0%  { opacity: 0; }
  100% { opacity: 1; }
`;

injectGlobal`
  :root {
    background-color: #e2e8f0;
  }
  .fade-in {
    animation: ${fadeIn} 0.2s ease-in-out forwards;
  }
`;

const AppWrapper = css`

`;

export const ThemeContext = React.createContext('light');

class App extends React.Component {
  state = {
    loggedInUser: null, 
    authenticated: false,
  }

  setUser = user => {
    this.setState({
      loggedInUser: user,
      authenticated: true
    });
  }

  logout = () => {
    this.setState({
      authenticated: false,
      loggedInUser: null
    });
  }

  render () {
    return (
      <Router>
        <AuthContext.Provider value={{authenticated: this.state.authenticated, loggedInUser: this.state.loggedInUser, setUser: this.setUser}}>
        <div className={AppWrapper}>
          <header className="flex bg-white border-b border-gray-200 fixed top-0 inset-x-0 h-16 items-center justify-center bg-gray-100">
            <NavLink to='/home' exact className="mx-10" activeClassName="text-red-600">Home</NavLink>
            <NavLink to='/shoplist' className="mx-10" activeClassName="text-red-600">See all shops</NavLink>
            <NavLink to='/users' className="mx-10" activeClassName="text-red-600">See the hunters</NavLink>
          </header>

          <main className="mt-24">
            <Switch>
              <Route path="/landing" exact component={LandingPage}></Route>
              <Route path="/signup" exact component={DummySignUp} />
              <Route path="/signin" exact component={DummySignIn} />
              {this.state.authenticated && 
                <>
                  <Route path="/home" exact component={HomePage} />
                  <Route path="/users" exact component={UserList} />
                  <Route path="/shoplist" exact component={BurgerShopList} />
                  <Route path="/shop-detail/:id" exact component={BurgerShop} />
                  <Route path="/rate/:id" exact component={BurgerRating} />
                </>
              }
              <Redirect from="/" to="/landing" />
              <Redirect from="*" to="/" />
            </Switch>
          </main>
        </div>
        </AuthContext.Provider>
      </Router>
    );
  }
}

export default App;
