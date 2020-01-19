import React from 'react'
import Slider from 'infinite-react-carousel'
import '../resources/style.css'
import { Container } from 'reactstrap'


class  Home extends React.Component{
    constructor (props){
        super(props)
        this.state = {

        }
    }




  render() {
    const settings =  {
      autoplay: true,
      dots: true,
      // duration: 100,
      initialSlide: false,
      // infinite: true,
    };
    return (
        <Container >
      <div>
        <Slider {...settings} >
            <div><img src={require('../images/Carousal 1.jpg')} alt=""/></div>
            <div><img src={require('../images/Carousal 2.jpg')} alt="Credit to Alisa Anton on Unsplash"/></div>
            <div><img src={require('../images/Carousal 3.jpg')} alt="Credit to Igor Ovsyannykov on Unsplash"/></div>
            <div><img src={require('../images/Carousal 4.jpg')} alt="Credit to Pierre Châtel-Innocenti on Unsplash"/></div>
            <div><img src={require('../images/Carousal 1.jpg')} alt="Credit to Richard Nolan on Unsplash"/></div>
            <div><img src={require('../images/Carousal 3.jpg')} alt="Credit to Cristina Gottardi on Unsplash"/></div>
        </Slider>
      </div>
      <br/><br/>
        </Container>

    )
  }
}

export default Home





