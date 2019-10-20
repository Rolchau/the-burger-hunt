import React, { Component } from 'react';
import { instance as axios, endpoints} from '../../axios';
import UserShort from '../../components/User/UserShort';

class UserHallOfFame extends Component {

  state = {
    users: []
  };

  componentDidMount() {
    axios.get(endpoints.users + '?_sort=reviewCount&_order=desc&_limit=5')
      .then(response => {
        this.setState({users: response.data});
        console.log(this.state.users);
      })
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
