import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { instance, endpoints} from '../../axios';
import axios from 'axios';
import UserShort from '../../components/User/UserShort';

class UserHallOfFame extends Component {

  state = {
    users: []
  };

  componentDidMount() {
    axios.all([instance.get(endpoints.users),instance.get(endpoints.reviews)])
      .then(axios.spread(
        (users, reviews) => {
          const userArr = users.data;
          const reviewArr = reviews.data;
          userArr.forEach(user => {
            let matchingReviews = reviewArr.filter(review => review.userId === user.id);
            user.reviewCount = matchingReviews.length;
          });
          userArr.sort((x, y) => y.reviewCount - x.reviewCount);
          this.setState({
            users: userArr.splice(0,5)
          })
        }
      ));
    }

  handleOnClick = (userId) => {
    this.props.history.push( '/user-detail/' + userId );
  }

  render() {
    const users = this.state.users.map(user => <UserShort key={user.id} user={user} handleClick={() => this.handleOnClick(user.id)}/>);
    return (
      <div className="fade-in shadow bg-orange-200 max-w-md mx-3 p-6 rounded-lg flex-auto">
        <h1 className="text-orange-900 text-3xl mb-4">Top 5 Burger Hunters</h1>
        {users}
      </div>
    )
  }
}

export default withRouter(UserHallOfFame)
