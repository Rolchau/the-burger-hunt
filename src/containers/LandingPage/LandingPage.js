import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom';
import AuthContext from '../Authentication/AuthContext';

class LandingPage extends Component {
  render() {
    return (
      <AuthContext.Consumer>
        {(context) => {
          const isAuthenticated = context.authenticated
          return (
            <>
              {isAuthenticated && <Redirect to='/home' />}
              {!isAuthenticated && 
                <div><Link to='/signin'>Log ind</Link></div>
              }
            </>
            )
          }
        }
      </AuthContext.Consumer>
    )
  }
}

export default LandingPage
