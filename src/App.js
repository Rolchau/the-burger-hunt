import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { css } from 'emotion';
import UserList from './containers/UserList/UserList';
import BurgerShopDetail from './containers/BurgerShopDetail/BurgerShopDetail';
import BurgerShopList from './containers/BurgerShopList/BurgerShopList';

const AppWrapper = css`
`

function App() {
  return (
    <Router>
      <div className={AppWrapper}>
        <div class="max-w-sm mx-auto flex p-6 bg-white rounded-lg shadow-xl">
          <div class="pt-1">
            <h4 class="text-xl text-gray-900 leading-tight">ChitChat</h4>
            <p class="text-base text-gray-600 leading-normal">You have a new message!</p>
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-4 py-2 px-4 rounded-full">
              Find Burgers near you!
            </button>
          </div>
        </div>

        <Route path="/users" exact component={UserList} />
        <Route path="/shop-detail" exact component={BurgerShopDetail} />
        <Route path="/" exact component={BurgerShopList} />
      </div>
    </Router>
  );
}

export default App;
