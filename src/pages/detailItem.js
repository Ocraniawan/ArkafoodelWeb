import React from 'react'
import {connect} from 'react-redux'
import {getDetailItem} from '../redux/action/menu'
import Axios from 'axios'
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
        isFetchedDetailItem : false,
        paramsId_Item : null,
    }
}
/** ADD TO CARTS */
async onSubmit(event){
    event.preventDefault();
    const user_id = decode.id_user
    const {id} = this.props.match.params
    console.log(id);
    const data = await Axios.post(APP_URL.concat(`cart/`), {
        user_id : user_id,
        item_id : id,
        quantity : this.state.quantity
    })
    alert('Item Has been add to Cart!!')
    console.log(data)
  }

  async componentDidMount(){
      const {id} = this.props.match.params
    //   await this.props.dispatch(getDetailItem(id))

    const url = APP_URL.concat(`item/${id}`)
    const item = await Axios.get(url)
    const {suggess, data} = item

    const review = APP_URL.concat(`valuation/${id}`)
    const reviews = await Axios.get(review)
    const reviewItem = reviews.data

    this.setState({data, reviewItem, isFetchedDetailItem:true, paramsId_Item:id})
}

buttonMin = ()=>{
    this.setState({quantity: this.state.quantity - 1})
  }
buttonPlus = ()=>{
    this.setState({quantity: this.state.quantity + 1})
  }





    render(){ 
        const user_id = decode.id
        const {isFetchedDetailItem, data, reviewItem, suggess, paramsId_Item} = this.state
        if (paramsId_Item!==this.props.match.params.id &&paramsId_Item!=null){
         this.componentDidMount()  
        }
        return(
            <Container >
                { isFetchedDetailItem &&
                    <div className='shadow mt-2' style={{display:'flex', justifyContent:'center', alignItems:'justify',flexDirection:'column', borderRadius:'15px'}}>
                        <Row>
                            <Col className='col-sm-6'>
                                <img src={APP_URL.concat(`src/images/${data.data[0].image}`)} alt={data.name} style={{width:"290px", borderRadius:'15px'}}/>
                            </Col>
                        
                            <Col className='col-sm-6'>
                            <CardHeader>
                                <div style = {{textAlign:'center'}}><b> {data.data[0].item_name} </b></div>
                            </CardHeader>
                                    <Table>
                                    <tbody>
                                        <tr>
                                        <th scope="row">Price</th>
                                        <td>
                                        <NumberFormat value={data.data[0].price} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} renderText={value=> <div>{value}</div>} />
                                        </td>
                                        </tr>
                                        <tr>
                                        <th scope="row">Rating</th>
                                        <td>{data.data[0].rating}</td>
                                        </tr>
                                        <tr>
                                        <th scope="row">Restaurant</th>
                                        <td>{data.data[0].restaurant_name}</td>
                                        </tr>
                                        <tr>
                                        <th scope="row">Categories</th>
                                        <td>{data.data[0].categories_name}</td>
                                        </tr>
                                        <tr>
                                        <th scope="row">Description</th>
                                        <td>{data.data[0].description}</td>
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
                                            <NumberFormat value={data.data[0].price * this.state.quantity} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} renderText={value=> <div>{value}</div>} />
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
                }
                    <Col>
                    <CardHeader>
                        Review Items
                    </CardHeader>
                    </Col>
                    <Row>
                    <Col >
                    <div className='shadow mt-2' style={{display:'flex',justifyContent:'center', height:"278px", alignItems:'center',flexDirection:'column', borderRadius:'15px'}}>
                    <div className='col' style = {{textAlign:'center', fontSize:'20px', backgroundColor:'#F0F1F2', fontFamily:'Arial Rounded MT Bold'}}><b>Review</b></div>
                    {isFetchedDetailItem&&
                    reviewItem.data.map(v=>(
                        <Col md key= {v.id_item}>
                            <theader>
                                <th><b> {v.username}</b></th>
                            </theader>
                            <tbody>
                            <tr>
                                {/* <th scope="row"><b>Username : </b></th>
                                <td><b> {v.username}</b></td>                                
                            </tr>
                            <tr>
                                <th scope="row"><b>Review</b></th> */}
                                <td> {v.review}</td>                                
                            </tr>
                            </tbody>                                
                        </Col>
                    ))}
                    </div>
                    </Col>

                    </Row>

                    <div>
                    <CardHeader>
                        Items You Might be Like too..!
                    </CardHeader>
                    </div>
                <Row>
                {isFetchedDetailItem&&
                data.suggess.map(v=>(
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
                ))}
            </Row>

            </Container>
        )
        
    }
    
}
export default DetailItem