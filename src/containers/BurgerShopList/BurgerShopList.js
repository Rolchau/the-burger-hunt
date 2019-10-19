import React, { Component } from "react";
import { instance as axios, endpoints } from "../../axios";
import BurgerShopShort from "../../components/BurgerShopDetails/BurgerShopShort";

class BurgerShopList extends Component {
  state = {
    shops: []
  };

  componentDidMount() {
    axios.get(endpoints.shoplist).then(response => {
      this.setState({
        shops: response.data
      });
    });
  }

  handleOnClick = shopId => {
    this.props.history.push( '/shop-detail/' + shopId );
  };

  render() {
    const shops = this.state.shops.map(shop => (
      <BurgerShopShort
        key={shop.id}
        shop={shop}
        handleClick={() => this.handleOnClick(shop.id)}
      />
    ));
    return (
      <div className="max-w-sm mx-auto m-4 p-6 bg-white rounded-lg shadow-xl">
        {shops}
      </div>
    );
  }
}

export default BurgerShopList;
