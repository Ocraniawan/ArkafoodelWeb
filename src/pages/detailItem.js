import React from 'react'
import {connect} from 'react-redux'
import {getDetailItem} from '../redux/action/menu'
import {getCommentById } from '../redux/action/review'
import {addToCart} from '../redux/action/cart'
import {APP_URL} from '../resources/config'
import {Container, Col, Card, Row, Button, CardHeader, CardDeck, Table, Nav, Input} from 'reactstrap'
import {Link} from 'react-router-dom'
import Cookie from 'js-cookie'
import Jwt from 'jwt-decode'
import NumberFormat from 'react-number-format'
import StartRatings from 'react-star-ratings'

const token = Cookie.get('token')
let decode =''
if (token) {
  decode = Jwt(token)
}

class DetailItem extends React.Component{
constructor(props){
    super(props)

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
        data: null,
        suggess : null,
        reviewItem : null,
        quantity : 1,
        isLoading : true,
        isFetchedDetailItem : false,
        paramsId_Item : null,
    }
}
/** ADD TO CARTS */
async onSubmit(event){
    event.preventDefault();
    const user_id = await decode.id_user
    const {id} = await this.props.match.params
    const item_id = id
    const quantity = this.state.quantity
    console.log(user_id, item_id, quantity);
    await this.props.dispatch(addToCart(item_id,user_id,quantity))
    if (this.props.carts.isError) {
        console.log(this.props.carts.isError);
    } else{
        alert('Item Has been add to Cart!!')
    }
  }

  async componentDidMount(){
      const {id} = this.props.match.params
      await this.props.dispatch(getDetailItem(id))
      await this.props.dispatch(getCommentById(id))
      this.setState({isLoading:this.props.items.isLoading})
    }

buttonMin = ()=>{
    this.setState({quantity: this.state.quantity - 1})
  }
buttonPlus = ()=>{
    this.setState({quantity: this.state.quantity + 1})
  }





    render(){ 
        const user_id = decode.id
        return(
            <Container >
                <div className='shadow mt-2' style={{display:'flex', justifyContent:'center', alignItems:'justify',flexDirection:'column', borderRadius:'15px', marginBottom:'20PX'}}>
                {!this.state.isLoading &&
                this.props.items.data.map(v=>(
                        <Row>
                            <Col xs="6" sm="4">
                                <img src={APP_URL.concat(`src/images/${v.image}`)} alt={v.name} style={{width:"100%", height:'100%', borderTopLeftRadius:'15px'}}/>
                            </Col>
                            <Col xs="6" sm="4" style={{width:'120%'}}>
                            <CardHeader>
                                <div style = {{textAlign:'center'}}><b> {v.item_name} </b></div>
                            </CardHeader>
                                    <Table>
                                    <tbody>
                                        <tr>
                                        <th scope="row" style={{color:'#B8B9BB'}}>Price</th>
                                        <td>
                                        <NumberFormat value={v.price} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} renderText={value=> <div style={{color:'#F95A37', fontWeight:'bold'}}>{value}</div>} />
                                        </td>
                                        </tr>
                                        <tr>
                                        <th scope="row" style={{color:'#B8B9BB'}}>Rating</th>
                                        <td>
                                        <StartRatings rating = {v.rating} starRatedColor="#F95A37" numberOfStars={5} starDimension = "15px" starSpacing = "1px"/>
                                        </td>
                                        </tr>
                                        <tr>
                                        <th scope="row" style={{color:'#B8B9BB'}}>Restaurant</th>
                                        <td style={{fontWeight:'bold'}}>{v.restaurant_name}</td>
                                        </tr>
                                        <tr>
                                        <th scope="row" style={{color:'#B8B9BB'}}>Description</th>
                                        <td>{v.description}</td>
                                        </tr>
                                    </tbody>
                                    </Table>
                            </Col>
                            <Col  xs="6" sm="4" style={{alignSelf:'center', alignItems:"center", justifyContent: 'center'}}>
                            <Nav style={{width: '100%', alignItems:"center", justifyContent: 'center' }}>
                            <div className="cold-md-5">
                            <Button
                                color = 'success' onClick={this.buttonMin}
                                disabled={v.quantity<=1?true:false}> <b>-</b>
                            </Button>
                            </div>
                            <div key={v.item_id} className="cold-md-2">
                            <Input style={{width: '80px',textAlign: 'center'}} value={this.state.quantity}></Input>
                            </div>
                            <div className="cold-md-5">
                            <Button color = 'success' onClick={this.buttonPlus}><b>+</b></Button>
                            </div>
                            <div className="cold-md-5">
                            </div> &nbsp;
                            </Nav>
                            <div className='mt-3' style={{width: '100%', alignItems:"center", justifyContent: 'center' }}>
                            <NumberFormat value={v.price * this.state.quantity} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} renderText={value=> <div style={{width: '100%', alignItems:"center", justifyContent: 'center', textAlign: 'center', color:"#F95A37", fontSize: 18, fontWeight:"bold" }}>{value}</div>} />
                            </div>
                            <Nav style={{alignItems:"center", justifyContent: 'center' }}>
                            <div className='mt-3' >
                            <Link to = {`/store/${user_id}`} className = 'text-light'>
                                <Button style={{width: '150px', alignItems:"center", textAlign: 'center' }} onClick = {this.onSubmit} type='submit' color="success" className="fa fa-cart-plus text-white">
                                
                                </Button>
                            </Link>
                            </div> 
                            </Nav>
                            </Col>
                        </Row>
                ))}
                </div>
                <div className='shadow mt-2' style={{display:'flex', justifyContent:'center', alignItems:'justify',flexDirection:'column', borderRadius:'15px', marginBottom:'15'}}>
                    <Col>
                    <CardHeader style={{height:'50px'}}>
                        <div style={{textAlign:'center', fontSize:'20px', fontWeight:'bold'}}>Costumer Reviews</div>
                    </CardHeader>
                    {!this.props.reviews.isLoading && this.props.reviews.data.data.map((v, i) => { 
                        return (
                    <Col>
                        <Col md key= {v.id_item}>
                    <div className='mt-2'style={{fontSize:'18px', color:'green'}} >
                    <b>{v.name}</b>
                    </div> 
                <div className='mt-2' style={{color:'#FA591D'}}>
                    <b>
                    <StartRatings rating = {v.rating} starRatedColor="#F95A37" numberOfStars={5} starDimension = "15px" starSpacing = "1px"/>
                    </b>
                </div>
                <div className='mt-2' style={{marginBottom:'10px'}} >
                    <i>{v.review}</i>
                    </div>
                    <hr />
                        </Col>
                    </Col>
                    )}
                    )}
                    </Col>
                    </div>

        <Row>
        {!this.props.items.isLoading && this.props.items.suggess.map((v, i) => { 
          return (
            <CardDeck style={{justifyContent:"center"}}>
            <Col md key= {v.id_item} className='mt-3' xs="6" sm="4" >
            <Card className='shadow' style = {{backgroundColor: 'dark', height:"385px", width:"255px", borderRadius:'15px', marginBottom:'20px'}}>
                <div className='text-center'>
                    <img src= {APP_URL.concat(`src/images/${v.image}`)} alt={v.name} style={{height:"200px", width:"254px", borderRadius:'14px'}}/>   
                </div>
                <CardHeader>
                <div className='text-center mt-2' >
                    <b><i>{v.item_name}</i></b>
                </div> 
                </CardHeader>

                <div className='text-center mt-2' style={{color:'#FA591D'}}>
                    <b>
                    <NumberFormat value={v.price} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} renderText={value=> <div>{value}</div>} />
                    <StartRatings rating = {v.rating} starRatedColor="#F95A37" numberOfStars={5} starDimension = "15px" starSpacing = "1px"/>
                    </b>
                </div>
            <Container className='mt-3'>
                <Link to={`/item/${v.id_item}`} style = {{fontSize:'12'}}>
            <Button outline className="fa fa-info-circle text-success" color="success" style = {{float:'left'}}>
            </Button>
                </Link>
            <Button onClick = {this.onSubmit} type='submit' color="success" style = {{float:'right', fontSize:'12'}} className="fa fa-cart-plus text-white">
            </Button>                        
            </Container>
            </Card> 
        </Col>
        </CardDeck> 
                )}
                )}
            </Row>

            </Container>
        )
        
    }
    
}
const mapStateToProps = state =>{
    return{
        items: state.items,
        reviews: state.reviews,
        carts: state.carts
    }
  }
  
  export default connect(mapStateToProps)(DetailItem)