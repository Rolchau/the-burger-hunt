import React, { Component } from 'react'
import { instance as axios, endpoints} from '../../axios';
import UserShort from '../../components/User/UserShort';

class UserHallOfFame extends Component {

  state = {
    users: []
  };

  componentDidMount() {
    axios.get(endpoints.users + '?_sort=reviewCount&_order=desc&_limit=3')
      .then(response => {
        this.setState({users: response.data});
        console.log(this.state.users);
      })
  }

  handleOnClick = (user) => {
    
  }

  render() {
    const users = this.state.users.map(user => <UserShort key={user.id} user={user} handleClick={() => this.handleOnClick(user.id)}/>);
    console.log(users);
    return (
      <div>
        {users}
      </div>
    )
  }
}

export default UserHallOfFame
