import React, { Component } from 'react'
import { instance, endpoints } from '../../axios';
import axios from 'axios';
import AuthContext from '../Authentication/AuthContext';
import User from '../../components/User/User';

export class UserDetail extends Component {
  
  static contextType = AuthContext;

  state = {
    user: null,
    isLoading: true,
    loggedInUser: this.context.loggedInUser
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    axios
      .all([
        instance.get(endpoints.users + id),
        instance.get(endpoints.reviews + "?userId=" + id),
        instance.get(endpoints.shoplist)
      ])
      .then(
        axios.spread((users, reviews, shops) => {
          const user = users.data;
          const shopArr = shops.data;
          const reviewsArr = reviews.data;
          
          reviewsArr.forEach(review => {
            const shop = shopArr.find(shop => shop.id === review.shopId).name;
            review.shopName = shop;
          });

          user.reviews = reviewsArr;
          this.setState({
            user: user,
            isLoading: false
          });
        })
      );
    }

  render() {
    let isYou = false;
    if (this.state.user !== null && this.state.loggedInUser !== null) {
      isYou = this.state.user.id === this.state.loggedInUser.id;
    }
    return (
      <>
      { this.state.isLoading && 
          <div>
          
          </div>
      }
      { !this.state.isLoading &&
        <div>
          <User user={this.state.user} yourself={isYou}></User>
        </div>
      }
      </>

    )
  }
}

export default UserDetail
