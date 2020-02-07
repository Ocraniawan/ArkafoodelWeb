import React from 'react'
import {connect} from 'react-redux'
import {getDetailItem} from '../redux/action/menu'
import {getCommentById } from '../redux/action/review'
import {addToCart} from '../redux/action/cart'
import {APP_URL} from '../resources/config'
import {Container, Col, Card, Row, Button, CardHeader, CardDeck, Table} from 'reactstrap'
import {Link} from 'react-router-dom'
import Cookie from 'js-cookie'
import Jwt from 'jwt-decode'
import NumberFormat from 'react-number-format'

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
                {!this.state.isLoading &&
                this.props.items.data.map(v=>(
                    <div className='shadow mt-2' style={{display:'flex', justifyContent:'center', alignItems:'justify',flexDirection:'column', borderRadius:'15px'}}>
                        <Row>
                            <Col className='col-sm-6'>
                                <img src={APP_URL.concat(`src/images/${v.image}`)} alt={v.name} style={{width:"290px", borderRadius:'15px'}}/>
                            </Col>
                            <Col className='col-sm-6'>
                            <CardHeader>
                                <div style = {{textAlign:'center'}}><b> {v.item_name} </b></div>
                            </CardHeader>
                                    <Table>
                                    <tbody>
                                        <tr>
                                        <th scope="row">Price</th>
                                        <td>
                                        <NumberFormat value={v.price} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} renderText={value=> <div>{value}</div>} />
                                        </td>
                                        </tr>
                                        <tr>
                                        <th scope="row">Rating</th>
                                        <td>{v.rating}</td>
                                        </tr>
                                        <tr>
                                        <th scope="row">Restaurant</th>
                                        <td>{v.restaurant_name}</td>
                                        </tr>
                                        <tr>
                                        <th scope="row">Categories</th>
                                        <td>{v.categories_name}</td>
                                        </tr>
                                        <tr>
                                        <th scope="row">Description</th>
                                        <td>{v.description}</td>
                                        </tr>
                                        <tr>
                                        <th scope="row">Quantity</th>
                                        <td>
                                        <Row>
                                        <Col>
                                        <Button style={{backgroundColor: '#42B549'}}
                                            onClick={this.buttonMin}
                                            disabled={this.state.quantity<=1?true:false} className="cold-md-5"><b>-</b>
                                        </Button>
                                        </Col>
                                        <Col>
                                        <input type="text" value={this.state.quantity} className="cold-md-2"/>
                                        </Col>
                                        <Col>
                                        <Button style={{backgroundColor: '#42B549'}}
                                            onClick={this.buttonPlus} className="cold-md-5"><b>+</b>
                                        </Button>
                                        </Col>
                                        </Row>
                                        </td>
                                        </tr>
                                        <tr>
                                        <th scope="row">Total</th>
                                        <td>
                                            <NumberFormat value={v.price * this.state.quantity} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} renderText={value=> <div>{value}</div>} />
                                    <Container className='mt-3' style={{textAlign:'center'}}>
                                    <Link to={`/menu/`} >
                                    <Button outline color='success' className="text-success fa fa-backward">
                                    </Button> 
                                    </Link> &nbsp;
                                    <Link to = {`/store/${user_id}`} className = 'text-light'>
                                    <Button onClick = {this.onSubmit} type='submit' color="success" className="fa fa-cart-plus text-white">
                                    </Button>
                                    </Link>
                                    </Container>
                                        </td>
                                        </tr>
                                        <tr>
                                        <td>                                                
                                            </td>
                                        </tr>
                                    </tbody>
                                    </Table>
                            </Col>
                        </Row>
                    </div>
                ))}
                    <Col>
                    <CardHeader>
                        Review Items
                    </CardHeader>
                    </Col>
                    <Row>
                    <Col >
                    <div className='shadow mt-2' style={{display:'flex',justifyContent:'center', height:"278px", alignItems:'center',flexDirection:'column', borderRadius:'15px'}}>
                    <div className='col' style = {{textAlign:'center', fontSize:'20px', backgroundColor:'#F0F1F2', fontFamily:'Arial Rounded MT Bold'}}><b>Review</b></div>
                    {!this.props.reviews.isLoading && this.props.reviews.data.data.map((v, i) => { 
                    return (
                        <Col md key= {v.id_item}>
                            <theader>
                                <th><b> {v.username}</b></th>
                            </theader>
                            <tbody>
                            <tr>
                                <th scope="row"><b>Username : </b></th>
                                <td><b> {v.username}</b></td>                                
                            </tr>
                            <tr>
                                <th scope="row"><b>Review</b></th>
                                <td> {v.review}</td>                                
                            </tr>
                            </tbody>                                
                        </Col>
                    )}
                    )}
                    </div>
                    </Col>

                    </Row>

                    <div>
                    <CardHeader>
                        Items You Might be Like too..!
                    </CardHeader>
                    </div>
                <Row>
                {!this.props.items.isLoading && this.props.items.suggess.map((v, i) => { 
          return (
                    <Col md key= {v.id_item} >
                    <CardDeck>
                        <Card className='shadow mt-2' style = {{backgroundColor: 'dark', height:"380px", width:"255px", borderRadius:'15px' }}>
                            <div className='text-center'>
                                <img className="img-fluid" src= {APP_URL.concat(`src/images/${v.image}`)} alt={v.name} style={{height:"200px", borderRadius:'14px'}}/>   
                            </div>
                            <CardHeader>
                            <div className='text-center mt-2'>
                                <b>{v.item_name}</b>
                            </div> 
                            </CardHeader>

                            <div className='text-center mt-2' style={{color:'#FA591D'}}>
                                Price: Rp. {v.price},00
                            </div>
                            <div className='text-center' >
                                <i>{ v.description}</i>
                            </div>
                        <Container className='mt-3'>
                        <Button outline color='success' style = {{float:'left'}}>
                            <Link to={`/item/${v.id_item}`} className="fa fa-th-list text-success" style = {{fontSize:'12'}}>
                            </Link>
                        </Button>
                        <Button color='success' style = {{float:'right'}}>
                            <Link to={`/item/${v.id_item}`} className="fa fa-cart-plus text-white" style = {{fontSize:'12'}}>
                            </Link>
                        </Button>
                        </Container>
                        </Card>
                    </CardDeck>
                        
                    </Col>
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