import React from 'react';
import { css } from 'emotion';
import './App.css';
import UserList from './containers/UserList/UserList';
import BurgerShopDetail from './containers/BurgerShopDetail/BurgerShopDetail';

const AppWrapper = css`
  color: red;
  background-color: pink;
  margin-top: 100px;
`

function App() {
  return (
    <div className={AppWrapper}>
      <UserList />
      <BurgerShopDetail></BurgerShopDetail>
    </div>
  );
}

export default App;
