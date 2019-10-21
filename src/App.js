import React from 'react';
import { BrowserRouter as Router, Route, Link, NavLink, Redirect, Switch } from 'react-router-dom';
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
import Icon from './components/ui/Icon';

const fadeIn = keyframes` 
  0%  { opacity: 0; }
  100% { opacity: 1; }
`;

const slideDown = keyframes`
  0% { transform: translateY(-100%); }
  100% { transform: translateY(0); }
`

injectGlobal`
  :root {
    background-color: #ffde9d;
  }
  .fade-in {
    animation: ${fadeIn} 0.2s ease-in-out forwards;
    will-change: opacity;
  }
  .slide-down {
    animation: ${slideDown} 0.4s cubic-bezier(0.18, 0.33, 0.85, 0.13) forwards;
    will-change: transform;
  }
`;

const AppWrapper = css`

`;

const logo = css`
  svg {
    width: 3rem;
    height: 3rem;
  }
`;

export const ThemeContext = React.createContext('light');

class App extends React.Component {
  state = {
    loggedInUser: {}, 
    authenticated: true,
  }

  setUser = user => {
    this.setState({
      loggedInUser: user,
      authenticated: false
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
            <header className="slide-down fixed top-0 z-10 inset-x-0 h-16 items-center justify-center text-orange-200 bg-orange-900 shadow-lg">
              <div className="max-w-5xl mx-auto flex content-center justify-between h-16">
                <Link to='/home' className={logo + ' p-4 self-center'}><Icon name="logo" /></Link>
                <NavLink to={'/user-detail/' + this.state.loggedInUser.id} exact className="p-4 self-center ml-auto" activeClassName="underline text-orange-600">Your profile</NavLink>
                <Link to='/landing' className="p-4 self-center" onClick={() => this.logout()}>Log out</Link>
              </div>
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
