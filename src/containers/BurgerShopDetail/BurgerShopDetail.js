import React, { Component } from 'react';
import {css} from 'emotion';
import { instance, endpoints } from '../../axios';
import axios from 'axios';
import BurgerShop from '../../components/BurgerShop/BurgerShop';

const BurgerDetail = css`
`;

class BurgerShopDetail extends Component {
  state = {
    shopDetails: null,
    loadedDetails: false,
    reviews: null,
    pictures: null
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    axios
    .all([
      instance.get(endpoints.shopdetail + id),
      instance.get(endpoints.reviews + '?shopId=' + id),
      instance.get(endpoints.pictures + '?shopId=' + id)
    ])
    .then(
      axios.spread((shop, reviews, pictures) => {
        console.log('Pictures', pictures.data);
        this.setState({
          shopDetails: shop.data,
          reviews: this.calculateScores(reviews.data),
          pictures: pictures.data,
          loadedDetails: true
        })
      })
    );
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
      burgerElm = <BurgerShop shopDetails={this.state.shopDetails} reviews={this.state.reviews} pictures={this.state.pictures}/>;
    }
    return (
      <div className={BurgerDetail}>
        {burgerElm}
      </div>
    )
  }
}

export default BurgerShopDetail;