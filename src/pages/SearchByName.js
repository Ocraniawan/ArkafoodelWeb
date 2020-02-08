/* eslint-disable no-unused-vars */
import React from 'react'
import axios from 'axios'
import { Link} from 'react-router-dom'
import {Row, Col, Container, Button, Card, CardDeck, CardHeader, Alert, Input} from 'reactstrap'
import {APP_URL} from '../resources/config'
import {searchByName} from '../redux/action/search'
import { connect } from 'react-redux'
import NumberFormat from 'react-number-format'
import StartRatings from 'react-star-ratings'
import Jwt from 'jwt-decode'
import Cookie from 'js-cookie'
import {addToCart} from '../redux/action/cart'

const token = Cookie.get('token')
let decode =''
if (token) {
  decode = Jwt(token)
}

class SearchByName extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            data : {},
            name : '',
            quantity : 1,
            isFetched : false,
            params: '',
            isLoading: false,
        }
    }
    
/** ADD TO CARTS */
async onSubmit(id_item){
    const user_id = await decode.id_user
    const item_id = id_item
    const quantity = this.state.quantity
    console.log(user_id, item_id, quantity);
    await this.props.dispatch(addToCart(item_id,user_id,quantity))
    if (this.props.carts.isError) {
        console.log(this.props.carts.isError);
    } else{
        alert('Item Has been add to Cart!!')
    }
  }

    getItem = async () => {
        const params = this.state.params
        // await this.props.dispatch(searchByName(params))
        console.log(params)
        const url = APP_URL.concat(`item/search?name=${params}`)
        const {data} = await axios.get(url)
        this.setState({data, isFetched:!this.state.isFetched, isLoading: false})
    }

    render(){
        const {isFetched, data, params} = this.state
        return(
            <div>
            <Container>
                <Row>            
                <Col>
                <Card color = 'light' style = {{borderRadius : "20px", flexDirection:"row", padding:20, marginBottom:20,}} className = "shadow">
                <Input type="text" value={params} onChange = {(e) => this.setState ({ params : e.target.value })} className = "m-2" placeholder="Find Here" />
                <Button color = "success" onClick={this.getItem} style = {{alignSelf:"center"}}>Search</Button>
                </Card>
                </Col>
                </Row>
                <Row style={{textAlign:'center'}}>
                {
                    // !this.props.search.isLoading&&
                    // this.props.search.data.map
                    isFetched && data.data.map
                    (v=>(
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
                                    <StartRatings rating = {v.rating} starRatedColor="orange" numberOfStars={5} starDimension = "15px" starSpacing = "1px"/>
                                    </b>
                                </div>
                                {/* <div className='text-center' >
                                    <i>{ v.description}</i>
                                </div> */}
                            <Container className='mt-3'>
                                <Link to={`/item/${v.id_item}`} style = {{fontSize:'12'}}>
                            <Button outline className="fa fa-info-circle text-success" color="success" style = {{float:'left'}}>
                            </Button>
                                </Link>
                            <Button onClick = {()=>this.onSubmit(v.id_item)} type='submit' color="success" style = {{float:'right', fontSize:'12'}} className="fa fa-cart-plus text-white">
                            </Button>                        
                            </Container>
                            </Card> 
                        </Col>
                        </CardDeck>                        
                        )
                    )
                }
                
                </Row>
            </Container>
            </div>
        )
    }
}

const mapStateToProps = state =>{
    return{
      search: state.search,
      carts: state.carts
    }
  }

export default connect (mapStateToProps) (SearchByName)