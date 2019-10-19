import React, { Component } from 'react'
import {instance as axios, endpoints} from '../../axios';
import UserHallOfFame from '../UserHallOfFame/UserHallOfFame';

class BurgerShopList extends Component {

  state = {
    shops: []
  }

  componentDidMount() {
    axios.get(endpoints.shoplist)
      .then(response => {
        this.setState({
          shops: response.data
        });
      });
  }
  
  render() {
    const shops = this.state.shops.map(shop => <div key={shop.id}>{shop.name}</div>);
    return (
      <div>
        {shops}
        <UserHallOfFame></UserHallOfFame>
      </div>
    )
  }
}

export default BurgerShopList
