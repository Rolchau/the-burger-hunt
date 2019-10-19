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
          reviews: this.calculateScores(response.data),
          loadedDetails: true
        })
      })
  }

  calculateScores(reviews) {
    const textureScore = reviews.reduce((prev, curr) => prev + curr.textureScore, 0) / reviews.length;
    const tasteScore = reviews.reduce((prev, curr) => prev + curr.tasteScore, 0) / reviews.length;
    const visualScore = reviews.reduce((prev, curr) => prev + curr.visualScore, 0) / reviews.length;
    const totalScore = (textureScore + visualScore + tasteScore) / 3;
    return {
      textureScore: textureScore.toFixed(1),
      tasteScore: tasteScore.toFixed(1),
      visualScore: visualScore.toFixed(1),
      totalScore: totalScore.toFixed(1),
      reviewNo: reviews.length
    };
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