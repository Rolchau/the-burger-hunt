import React, { Component } from 'react'
import { instance as axios, endpoints } from '../../axios';


export class UserDetail extends Component {
  
  state = {

  }

  componentDidMount() {
    axios.get(endpoints.users + '')
  }

  render() {
    return (
      <div>
        
      </div>
    )
  }
}

export default UserDetail
