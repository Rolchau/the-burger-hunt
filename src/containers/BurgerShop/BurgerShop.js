import React, { Component } from 'react';
import {css} from 'emotion';
import {instance as axios, endpoints} from '../../axios';
import BurgerShopDetails from '../../components/BurgerShopDetails/BurgerShopDetails';

const BurgerDetail = css`
`;

class BurgerShop extends Component {
  state = {
    shopDetails: null,
    loadedDetails: false,
    reviews: null
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    
    axios.get(endpoints.shopdetail + id)
      .then(response => {
        this.setState({
          shopDetails: response.data,
        });
        return axios.get(endpoints.reviews + '?shopId=' + id);
      }).then(response => {
        this.setState({
          reviews: response,
          loadedDetails: true
        })
      })
  }
  
  render() {
    let burgerElm = <div>Loading...</div>
    if (this.state.loadedDetails) {
      burgerElm = <BurgerShopDetails shopDetails={this.state.shopDetails} reviews={this.state.reviews} />;
    }
    return (
      <div className={BurgerDetail}>
        {burgerElm}
      </div>
    )
  }
}

export default BurgerShop;