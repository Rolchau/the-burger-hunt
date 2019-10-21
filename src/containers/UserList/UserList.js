import React from 'react';
import { instance as axios, endpoints } from '../../axios';
import User from '../../components/User/User'

class UserList extends React.Component {
  state = {
    users: []
  }

  componentDidMount() {
    axios.get(endpoints.users)
      .then(response => {
        this.setState({users: response.data})
      });
  }

  handleOnUserClick(userId) {
    axios.get(`${endpoints.users}${userId}/pictures`)
      .then(response => {
        console.log(response);
      })
  }

  render() {
    const users = this.state.users.map(user => <User key={user.id} user={user} handleClick={() => this.handleOnUserClick(user.id)}/>);
    return (
      <ul>
        {users}
      </ul>
    )
  }
}

export default UserList;