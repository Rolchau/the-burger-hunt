import React from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { css, injectGlobal, keyframes } from 'emotion';
import UserList from './containers/UserList/UserList';
import BurgerShopList from './containers/BurgerShopList/BurgerShopList';
import UserHallOfFame from './containers/UserHallOfFame/UserHallOfFame';
import BurgerShop from './containers/BurgerShop/BurgerShop';
import BurgerRating from './containers/BurgerRating/BurgerRating';
import DummySignUp from './containers/Authentication/SignUp/DummySignUp';
import DummySignIn from './containers/Authentication/SignIn/DummySignIn';
import LandingPage from './containers/LandingPage/LandingPage';
import HomePage from './containers/HomePage/HomePage';
import AuthProvider from './containers/Authentication/AuthContext'
import AuthContext from ''

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

function App() {
  return (
    <Router>
      <AuthProvider>
      <div className={AppWrapper}>
        <header className="flex bg-white border-b border-gray-200 fixed top-0 inset-x-0 h-16 items-center justify-center bg-gray-100">
          <NavLink to='/home' exact className="mx-10" activeClassName="text-red-600">Home</NavLink>
          <NavLink to='/shoplist' className="mx-10" activeClassName="text-red-600">See all shops</NavLink>
          <NavLink to='/users' className="mx-10" activeClassName="text-red-600">See the hunters</NavLink>
          <NavLink to='/users' className="mx-10" activeClassName="text-red-600">See the hunters</NavLink>
        </header>

        <main className="mt-24">
          <Route path="/" exact component={LandingPage}></Route>
          <Route path="/home" exact component={HomePage} />
          <Route path="/signup" exact component={DummySignUp} />
          <Route path="/signin" exact component={DummySignIn} />
          <ThemeContext.Provider value="hasselnoed">
            <Route path="/users" exact component={UserList} />
            <Route path="/shop-detail/:id" exact component={BurgerShop} />
            <Route path="/shoplist" exact component={BurgerShopList} />
            <Route path="/rate/:id" exact component={BurgerRating} />
            <Route path="/hall-of-fame" exact component={UserHallOfFame} />
          </ThemeContext.Provider>
        </main>
      </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
