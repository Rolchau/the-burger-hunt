import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom';
import AuthContext from '../Authentication/AuthContext';
import { css } from 'emotion';
import burger from '../../assets/burger.svg';
import Bite from '../../components/ui/Bite';

const pageWrapper = css`
  margin-top: -6rem;
  display: flex;
  justify-content: center;
  align-items: center; 
  @media (min-width: 38em) {
    height: 100vh;
  }
`;

const heroWrapper = css`
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  flex-wrap: wrap;
  height: 600px;
  width: 100%;
  box-shadow: 0px 28px 80px 27px rgba(0,0,0,0.2), 0px 28px 24px -13px rgba(0,0,0,0.1);
`;

const burgerHero = css`
  width: 50%;
  font-family: 'Shadows Into Light', cursive;
  background-color: #FFBD41;
  color: #5a4215;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1 0 300px;
`;

const signHero = css`
  width: 50%;
  background-color: #EFEEE7;
  height: 100%;
  flex: 1 0 300px;
`;

class LandingPage extends Component {
  state = {
    bites: [],
    shaking: false
  }
  
  biteClick = (evt) => {
    const bounds = evt.target.getBoundingClientRect();
    const newBite = { top: evt.clientY - bounds.top , left: evt.clientX - bounds.left };
    this.setState(prevState => { 
      return { 
        bites: [...prevState.bites, newBite]
      }
    });
  } 

  render() {

    const loginBlocks = (
      <div className={signHero + ' p-8 flex justify-center content-center'}>
        <div className="bg-white self-center max-w-md p-10">
          <h1 className="text-3xl uppercase text-center mb-4">Time to eat!</h1>
          <div className="">
            <Link className="block w-full text-center bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline" to='/signin'>Log in</Link>
          </div>
          <hr className="border-b border-b-2 border-orange-700 border my-10"/>
          <div className="">
            <Link className="block w-full text-center bg-transparent border-2 border-orange-500 hover:bg-orange-700 text-orange-500 hover:text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline" to='/signup'>Create a user</Link>
          </div>
        </div>
      </div>
      );

    const bites = this.state.bites.map((bite, idx) => <Bite key={idx} left={bite.left} top={bite.top} />);

    const burgerBlock = (
      <div className={burgerHero + ' p-8 text-center'}>
        <h1 className="text-5xl underline mb-8">The Burger Hunt</h1>
        <div className="flex justify-center content-center relative" onClick={(evt) => this.biteClick(evt)}>
          {bites}
          <img src={burger} alt="A delicious burger" />
        </div>
      </div>
    );

    return (
      <AuthContext.Consumer>
        {(context) => {
          const isAuthenticated = context.authenticated
          return (
            <>
              {isAuthenticated && <Redirect to='/home' />}
              {!isAuthenticated && 
                <div className={pageWrapper}>
                  <div className={heroWrapper}>
                    {burgerBlock}
                    {loginBlocks}
                  </div>
                </div>
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
