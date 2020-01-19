import React from 'react'
import Axios from 'axios'
import {reviewRating} from '../redux/action/review'
import {getCart} from '../redux/action/cart'
import {connect} from 'react-redux'
import {APP_URL} from '../resources/config'
import {Container, Col, Card, Row, Button, FormGroup, CardDeck, CardImg, Label, Input, CardTitle, CardText, CardHeader} from 'reactstrap'
import {Link} from 'react-router-dom'
import Cookie from 'js-cookie'
import Jwt from 'jwt-decode'


class Review extends React.Component{
    constructor(props){
        super(props)
    
        this.onSubmit = this.onSubmit.bind(this);
    
        this.state = {
            review : '',
            rating : '',
            isFetched : false,
        }
}

    async componentDidMount(){
        const {id} = this.props.match.params
        this.props.dispatch(getCart(id))
    }

    async onSubmit(event){
        event.preventDefault();
        let item_arr = []
        const item = this.props.carts.data
        item.map((v,i) => {
          item_arr.push(v.item_id)
          return true
        })
        const {id} = this.props.match.params
        const review = await this.state.review
        const rating = await this.state.rating
        await this.props.dispatch(reviewRating(review, rating, id, item_arr))
        // const data = await Axios.post(  APP_URL.concat('user/login'),this.state)
        window.location = '/'
    }


  render(){
      return(
  <Container>
      <Row>
      {!this.props.carts.isLoading && this.props.carts.data.map(v=>
        //   <CardDeck>
        <Col  sm="12" md={{ size: 6, offset: 3 }} className='shadow mt-2' style = {{borderRadius:'15px', height:'500px'}}>
        <CardHeader className='text-center' style = {{borderTopLeftRadius:'15px', borderTopRightRadius:'15px', borderColor:'#28A745'}}>
         <b>{v.item_name}</b>
        </CardHeader>
        <CardImg top style={{borderRadius:'15px', backgroundColor:'#F8F9FA'}} width="250px" height="250px" border='dimgray' src={APP_URL.concat(`src/images/${v.image}`)} alt={v.name} />
        <Col>
        <Label for="exampleSelect">Rating</Label>
        <Input type="select" name="select" value={this.state.rating} onChange={(e)=>this.setState({rating:e.target.value})}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </Input>
        <Label for="exampleText">Input Review</Label>
        <Input type="textarea" name="text"
        value={this.state.review} onChange={(e)=>this.setState({review:e.target.value})} />
        </Col>        
        </Col>
        //   </CardDeck>
  )}
  <br/><br/>
  </Row>
<br/><br/>
      <FormGroup>
      <Button onClick = {this.onSubmit} className="btn btn-primary btn-block" type='submit' color = 'primary' value = 'submit'>Submit</Button>
      </FormGroup>
      <br/>
  </Container>
      )}
}

const mapStateToProps = state => {
    return {
      review: state.review,
      carts: state.carts
    }
  }
  
  export default connect(mapStateToProps)(Review)


// export default Review