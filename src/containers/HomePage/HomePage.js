import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UserHallOfFame from '../UserHallOfFame/UserHallOfFame';
import PictureList from '../PictureList/PictureList';

class HomePage extends Component {
  
  
  render() {
    return (
      <div className="flex flex-row flex-wrap justify-center mt-24 mx-auto max-w-5xl container">
        <div className="mx-3 mb-6 flex-auto">
          <div className="fade-in shadow bg-orange-200 max-w-md mx-auto p-6 rounded-lg mb-6">
            <h1 className="text-orange-900 text-3xl mb-4">On the hunt?</h1>
            <Link to="/shoplist" className="text-center bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline">Find shops near you</Link>
          </div>
          <div className="fade-in shadow bg-orange-200 max-w-md mx-auto p-6 rounded-lg">
            <h1 className="text-orange-900 text-3xl mb-4">All shops right here!</h1>
            <Link to="/shoplist" className="text-center bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline">See them here</Link>
          </div>
        </div>
        <UserHallOfFame></UserHallOfFame>
        <div className=""><PictureList /></div>
      </div>
    )
  }
}

export default HomePage
