import React from 'react'
import Axios from 'axios'
import {connect} from 'react-redux'
import {getCart} from '../redux/action/cart'
import {APP_URL} from '../resources/config'
import {Link} from 'react-router-dom'
import Cookie from 'js-cookie'
import Jwt from 'jwt-decode'
import {Container, Row, Col, Card, CardTitle, CardText, CardHeader, Nav, Button, Input, Table} from 'reactstrap'
import NumberFormat from 'react-number-format'

const token = Cookie.get('token')
let decode =''
if (token) {
  decode = Jwt(token)
}

class Stores extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            // data : {},
            // item : null,
            // isFetched: false
        }
    }


async componentDidMount(){
    const {id} = this.props.match.params
    this.props.dispatch(getCart(id))
}

buttonPlus = async(i)=>{
    const data = this.props.carts.data
    console.log(data)
    const item = data.filter(v=>{
      if(v.item_id === i){
        v.quantity += 1
      }
      return v
    })
  this.setState({item})
  var subtotal = 0
  data.filter(v=>{
      var total1 = v.price * v.quantity
      subtotal += total1;
  })
  this.setState({subtotal: subtotal})
  console.log(subtotal)
}
buttonMin = (i)=>{
  const data = this.props.carts.data
    const item = data.filter(v=>{
      if(v.item_id === i){
        v.quantity -= 1
      }
      return v
    })
  this.setState({item})
  var subtotal = 0
  data.filter(v=>{
      var total1 = v.price * v.quantity
      subtotal += total1;
  })
  this.setState({subtotal: subtotal})
}
deleteCart = async (id) =>{
    // const {id} = 
    const url = APP_URL.concat(`cart/${id}`)
    console.log(id)
    await Axios.delete(url)
    this.setState({isFetchedDataItem: false})
    console.log(this.state.isFetchedDataItem)
    this.componentDidMount();
    alert('Yahh Padahal Enak Loh!!')
  }

handleChange = (event,i)=>{
    this.setState({quantity: event.target.quantity[i]})
  }



render(){
  const id_user = decode.id_user
    // const {isFetched, data} = this.state
    return(
        <Container>
                <Row >
            {!this.props.carts.isLoading && this.props.carts.data.map(v=>(
                  <div className='shadow mt-2 col-sm-8' style={{display:'flex', justifyContent:'center', alignItems:'justify',flexDirection:'column', borderRadius:'15px'}}>
                  <Row>
                  <Col style={{height:'300px'}}>
                    <img src={APP_URL.concat(`src/images/${v.image}`)} alt={ImageData.name} style={{width:"290px", borderRadius:'15px'}}/>
                  </Col>
                    <Col>
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
                                  <th scope="row">Total</th>
                                  <td>
                                      <NumberFormat value={v.price * v.quantity} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} renderText={value=> <div>{value}</div>} />
                                  </td>
                                  </tr>
                              </tbody>
                              </Table>
                          <Nav style={{width: '100%'}}>
                          {/* <div style = {{textAlign:'center'}}><b>Quantity</b></div> */}
                            <div className="cold-md-5">
                            <Button
                                color = 'primary' onClick={()=>this.buttonMin(v.item_id)}
                                disabled={v.quantity<=1?true:false}> <b>-</b>
                            </Button>
                            </div>
                            <div key={v.item_id} className="cold-md-2">
                            <Input style={{width: '80px',textAlign: 'center'}} onChange={this.handleChange[v.item_id]} value={v.quantity}></Input>
                            </div>
                            <div className="cold-md-5">
                            <Button color = 'primary' onClick={()=>this.buttonPlus(v.item_id)}><b>+</b></Button>
                            </div>
                            <div className="cold-md-5">
                            </div> &nbsp;
                            <Link to = '#' onClick = {()=>this.deleteCart(v.id_carts)}>
                            <Button color="danger">
                              DELETE
                            </Button>
                              
                            </Link>
                            </Nav>                            
                      </Col>
                      </Row>
                </div>
                ))
              }
              <Row>
                    <div className='shadow mt-2 col-sm-4'>
                <Col>
                        <Card body style = {{borderRadius : "15px", width:'300px'}} className = "shadow">
                            <CardTitle className = "text-center" style={{fontSize: '25px'}}><b> Total</b></CardTitle>
                            <hr />
                            <CardText>
                              Price : <NumberFormat value={this.state.subtotal} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} renderText={value => <div>{value}</div>} />
                            </CardText>
                            <Link to ={`/review/${id_user}`} className = "text-light text-center"><Button color = "primary" >Check Out</Button></Link>
                            {/* <Route path = '/checkout' exact>
                            </Route> */}
                        </Card>
                    </Col>
                    </div>
                  </Row>
              </Row> 
        </Container>
    )
}
}

const mapStateToProps = state => {
    return {
      carts: state.carts
    }
  }
  
  export default connect(mapStateToProps)(Stores)