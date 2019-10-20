import React, { Component } from 'react';
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
          console.log('Users', users);
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

  handleOnClick = (user) => {
    console.log('Hall of fame user clicked...');
    //this.props.history.push({pathname: '/users/' + user});
  }

  render() {
    const users = this.state.users.map(user => <UserShort key={user.id} user={user} handleClick={() => this.handleOnClick(user.id)}/>);
    console.log(users);
    return (
      <div className="fade-in shadow-lg leading-normal bg-white max-w-md mx-auto p-6 rounded-lg">
        <h1 className="text-gray-600 text-2xl mb-4">Top 5 Burger Hunters</h1>
      {users}
      </div>
    )
  }
}

export default UserHallOfFame
