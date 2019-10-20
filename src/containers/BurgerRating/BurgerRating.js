import React, { Component } from "react";
import BurgerRate from "../../components/BurgerRate/BurgerRate";
import { instance as axios, endpoints } from "../../axios";
import AuthContext from '../Authentication/AuthContext';

class BurgerRating extends Component {
  static contextType = AuthContext;
  
  state = {
    name: '',
    shopId: '',
    userId: this.context.loggedInUser.id,
    tasteScore: 0,
    textureScore: 0,
    visualScore: 0,
    disabledBtn: true,
  };

  componentDidMount() {
    console.log(this.context);
    const id = this.props.match.params.id;
    axios.get(endpoints.shopdetail + id).then(response => {
      this.setState({
        name: response.data.name,
        shopId: response.data.id
      });
    });
  }

  onVoteClick = () => {
    const data = {
      shopId: this.state.shopId,
      userId: this.state.userId,
      tasteScore: this.state.tasteScore,
      textureScore: this.state.textureScore,
      visualScore: this.state.visualScore
    };
    axios.post(endpoints.reviews, data).then(response => {
      console.log(response);
    });
  };

  getRating = (type, no) => {
    this.setState({
      [type]: no,
    });
  };

  render() {
    const isBtnEnabled = this.state.visualScore && this.state.textureScore && this.state.tasteScore;
    return (
      <div>
        <p>Did you catch a burger on:</p>
        <h1 className="text-2xl mb-4">{this.state.name}</h1>
        <p>Then give it your rating here:</p>
        <div className="mt-4">
          <label>Taste</label>
          <BurgerRate
            selectedNo={this.state.tasteScore}
            type="tasteScore"
            getRating={this.getRating}
          />
          <label>Texture</label>
          <BurgerRate
            selectedNo={this.state.textureScore}
            type="textureScore"
            getRating={this.getRating}
          />
          <label>Visual</label>
          <BurgerRate
            selectedNo={this.state.visualScore}
            type="visualScore"
            getRating={this.getRating}
          />
        </div>
        <button disabled={!isBtnEnabled}
          className={(!isBtnEnabled ? 'cursor-not-allowed opacity-50 ' : '') + 'bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full'}
          onClick={this.onVoteClick}
        >
          Send review...
        </button>
      </div>
    );
  }
}

export default BurgerRating;
