import React from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { css, injectGlobal } from 'emotion';
import UserList from './containers/UserList/UserList';
import BurgerShopList from './containers/BurgerShopList/BurgerShopList';
import UserHallOfFame from './containers/UserHallOfFame/UserHallOfFame';
import BurgerShop from './containers/BurgerShop/BurgerShop';

injectGlobal`
  :root {
    background-color: #e2e8f0;
  }
`

const AppWrapper = css`

`;

function App() {
  return (
    <Router>
      <div className={AppWrapper}>
        <header className="flex bg-white border-b border-gray-200 fixed top-0 inset-x-0 h-16 items-center justify-center bg-gray-100">
          <NavLink to='/' exact className="mx-10" activeClassName="text-red-600">Home</NavLink>
          <NavLink to='/' exact className="mx-10" activeClassName="text-red-600">Find shops</NavLink>
          <NavLink to='/shoplist' className="mx-10" activeClassName="text-red-600">See all shops</NavLink>
          <NavLink to='/users' className="mx-10" activeClassName="text-red-600">See the hunters</NavLink>
        </header>

        <main className="mt-24">
          <Route path="/" exact component={UserHallOfFame} />
          <Route path="/users" exact component={UserList} />
          <Route path="/shop-detail/:id" exact component={BurgerShop} />
          <Route path="/shoplist" exact component={BurgerShopList} />
        </main>
      </div>
    </Router>
  );
}

export default App;
