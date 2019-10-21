import React from 'react';
import { BrowserRouter as Router, Route, NavLink, Redirect, Switch } from 'react-router-dom';
import { css, injectGlobal, keyframes } from 'emotion';
import UserList from './containers/UserList/UserList';
import BurgerShopList from './containers/BurgerShopList/BurgerShopList';
import BurgerRating from './containers/BurgerRating/BurgerRating';
import DummySignUp from './containers/Authentication/SignUp/DummySignUp';
import DummySignIn from './containers/Authentication/SignIn/DummySignIn';
import LandingPage from './containers/LandingPage/LandingPage';
import HomePage from './containers/HomePage/HomePage';
import AuthContext from './containers/Authentication/AuthContext'
import UserDetail from './containers/UserDetail/UserDetail';
import BurgerShopDetail from './containers/BurgerShopDetail/BurgerShopDetail';

const fadeIn = keyframes` 
  0%  { opacity: 0; }
  100% { opacity: 1; }
`;

injectGlobal`
  :root {
    background-color: #c3c8cf;
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
    loggedInUser: {username: "Rolchau", email: "rolchau@gmail.com", password: "123", id: 15}, 
    authenticated: true,
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
          {this.state.authenticated && 
            <header className="flex bg-white border-b border-gray-200 fixed top-0 z-10 inset-x-0 h-16 items-center justify-center bg-gray-100">
              <NavLink to='/home' exact className="mx-10" activeClassName="text-red-600">Home</NavLink>
              <NavLink to='/shoplist' className="mx-10" activeClassName="text-red-600">See all shops</NavLink>
              <NavLink to='/users' className="mx-10" activeClassName="text-red-600">See the hunters</NavLink>
            </header>
          }

          <main className="mt-24">
            <Switch>
              <Route path="/" exact component={LandingPage}></Route>
              <Route path="/signup" component={DummySignUp} />
              <Route path="/signin" component={DummySignIn} />
              {this.state.authenticated && 
                <>
                  <Route path="/home" exact component={HomePage} />
                  <Route path="/users" exact component={UserList} />
                  <Route path="/user-detail/:id" component={UserDetail} />
                  <Route path="/shoplist" component={BurgerShopList} />
                  <Route path="/shop-detail/:id" component={BurgerShopDetail} />
                  <Route path="/rate/:id" component={BurgerRating} />
                </>
              }
              {/* <Redirect from="/" to="/landing" /> */}
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
