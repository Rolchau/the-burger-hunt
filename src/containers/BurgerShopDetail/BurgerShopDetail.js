import React, { Component } from 'react';
import {css} from 'emotion';
import {instance as axios, endpoints} from '../../axios';
import BurgerShop from '../../components/BurgerShop/BurgerShop'

const BurgerDetail = css`
  background-color: black;
  color: #FF00FF;
`;

class BurgerShopDetail extends Component {
  
  state = {
    shopDetails: null,
    loadedDetails: false
  }

  componentDidMount() {
    axios.get(endpoints.shopdetail + '/3')
      .then(response => {
        this.setState({
          shopDetails: response.data,
          loadedDetails: true
        });
      });
  }
  
  render() {
    let burgerElm = <div>Loading...</div>
    if (this.state.loadedDetails) {
      burgerElm = <BurgerShop shopDetails={this.state.shopDetails} />;
    }
    return (
      <div className={BurgerDetail}>
        {burgerElm}
      </div>
    )
  }
}

export default BurgerShopDetail;