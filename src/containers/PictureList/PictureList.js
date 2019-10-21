import React, { Component } from 'react'
import { instance as axios, endpoints } from '../../axios';
import PictureFrame from '../../components/PictureFrame/PictureFrame'

class PictureList extends Component {
  
  state = {
    pictures: [],
    isLoading: true
  }
  
  getRandomImages() {
    axios.get(endpoints.pictures)
      .then(response => {
        const pictures = response.data;
        let randomPictures = [];
        for (let i = 0; i < 3; i++) {
          console.log('Pictures', pictures);
          const randomNo = Math.floor(Math.random() * (pictures.length - randomPictures.length));
          const randomImg = pictures.splice(randomNo, 1)[0];
          console.log('Random: ', randomImg);
          randomPictures.push(randomImg);
        }
        console.log(randomPictures);
        this.setState({
          pictures: randomPictures,
          isLoading: false
        })
      });
  }

  componentDidMount() {
    this.getRandomImages();
  }

  render() {

    const pictureFrames = this.state.pictures.map(picture => <PictureFrame key={picture.id} picture={picture} showShopLink={true}/>)
    return (
      <div className="fade-in container mx-auto mt-6 px-4 text-center">
        <h1 className="sm:text-5xl text-3xl text-orange-900">Shots taken from our users:</h1>
        <p className="pb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus, nesciunt</p>
        { !this.state.isLoading && 
          <div className="text-gray-700 flex flex-wrap justify-center">{pictureFrames}</div>
        }
      </div>
    )
  }
}

export default PictureList
