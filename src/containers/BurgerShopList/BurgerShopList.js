import React, { Component } from "react";
import { instance as axios, endpoints } from "../../axios";
import { CancelToken } from 'axios';
import BurgerShopShort from '../../components/BurgerShop/BurgerShopShort';

class BurgerShopList extends Component {
  state = {
    shops: [],
    isLoading: true,
  };

  constructor(props) {
    super(props);
    this.source = CancelToken.source();
  }

  componentDidMount() {
    this.setState({isLoading: true});
    axios.get(endpoints.shoplist, {cancelToken: this.source.token}).then(response => {
      this.setState({
        shops: response.data
      });
      return axios.get(endpoints.reviews);
    }).then(response => {
        const reviews = response.data;
        const updatedShops = [...this.state.shops];
        updatedShops.forEach(shop => {
          let matchingReviews = reviews.filter(review => review.shopId === shop.id);
          let totalScore = 0;
          if (matchingReviews.length) {
            const textureScore = matchingReviews.reduce((prev, curr) => prev + curr.textureScore, 0) / matchingReviews.length;
            const tasteScore = matchingReviews.reduce((prev, curr) => prev + curr.tasteScore, 0) / matchingReviews.length;
            const visualScore = matchingReviews.reduce((prev, curr) => prev + curr.visualScore, 0) / matchingReviews.length;
            totalScore = ((textureScore + visualScore + tasteScore) / 3).toFixed(1);          
          }
          shop['reviews'] = matchingReviews;
          shop['score'] = totalScore;
        });
        this.setState({
          shops: updatedShops,
          isLoading: false,
        })
      }
    );
  }

  componentWillUnmount() {
    this.source.cancel();
  }

  handleOnClick = (event, shopId) => {
    event.preventDefault();
    //TODO TRM - Could just pass ID to BurgerShopShort and use <Link> instead.
    this.props.history.push( '/shop-detail/' + shopId );
  };

  onSortByClick = sortBy => {
    const sortedArr = [...this.state.shops];
    if (sortBy === 'name') {
      sortedArr.sort((x, y) => {
        const shopX = x.name.toUpperCase(); 
        const shopY = y.name.toUpperCase();
        if (shopX < shopY) {
          return -1;
        }
        if (shopX > shopY) {
          return 1;
        }
        return 0;  
      });
    } else if (sortBy === 'score-asc') {
      sortedArr.sort((x, y) => x.score - y.score);
    } else if (sortBy === 'score-desc') {
      sortedArr.sort((x, y) => y.score - x.score);
    }
    this.setState({
      shops: sortedArr
    })
  }

  render() {
    const shops = this.state.shops.map(shop => (
      <BurgerShopShort
        key={shop.id}
        shop={shop}
        score={shop.score}
        handleClick={(event) => this.handleOnClick(event, shop.id)}
      />
    ));
    return (
      <div className="fade-in mt-24 mx-auto max-w-3xl bg-orange-200 text-orange-900 rounded-lg sm:p-8 p-4">
      {this.state.isLoading ? 
        <div>Loading... Imagine a fancy spinner here</div>
        :
        <>
          <div className="mb-4">
            <button className="bg-orange-300 hover:bg-orange-400 text-orange-800 font-bold py-2 px-4 rounded-l" onClick={() => this.onSortByClick('name')}>Sort by name</button>
            <button className="bg-orange-300 hover:bg-orange-400 text-orange-800 font-bold py-2 px-4" onClick={() => this.onSortByClick('score-desc')}>Score desc</button>
            <button className="bg-orange-300 hover:bg-orange-400 text-orange-800 font-bold py-2 px-4 rounded-r" onClick={() => this.onSortByClick('score-asc')}>Score asc</button>          
          </div>
          <div className="fadeIn" id='shops'>
            {shops}
          </div>
        </>
      }
      </div>
    );
  }
}

export default BurgerShopList;
