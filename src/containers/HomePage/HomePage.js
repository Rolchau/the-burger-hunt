import React, { Component } from 'react';
import UserHallOfFame from '../UserHallOfFame/UserHallOfFame';
import PictureList from '../PictureList/PictureList';

class HomePage extends Component {
  
  
  render() {
    return (
      <div>
        <div>Find shops near you placeholder...</div>
        <div>See all shops</div>
        <UserHallOfFame></UserHallOfFame>
        <div className=""><PictureList /></div>
      </div>
    )
  }
}

export default HomePage
