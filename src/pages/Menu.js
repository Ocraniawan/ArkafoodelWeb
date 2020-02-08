import React from 'react'
import {connect} from 'react-redux'
import {getItems, getButton} from '../redux/action/menu'
import {APP_URL} from '../resources/config'
import {Link} from 'react-router-dom'
import Cookie from 'js-cookie'
import Axios from 'axios'
import NumberFormat from 'react-number-format'
import StartRatings from 'react-star-ratings'

import {Row, Col, Container, Button, Card, CardHeader, CardDeck} from 'reactstrap'
import Jwt from 'jwt-decode'

const token = Cookie.get('token')
let decode =''
if (token) {
  decode = Jwt(token)
}

class Menu extends React.Component{
constructor(props){
    super(props)
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
        isLoading : true,
    }
}

/** ADD TO CARTS */
async onSubmit(event){
    // event.preventDefault();
    const user_id = decode.id_user
    const {id} = this.props.match.params
    const data = await Axios.post(APP_URL.concat('cart/'), {
        user_id : user_id,
        item_id : id
    })
    alert('Item Has been add to Cart!!')
    console.log(data);
  }

  
  async componentDidMount(){
    await this.props.dispatch(getItems())
    this.setState({isLoading:this.props.items.isLoading})
    // const {data} = await Axios.get(APP_URL.concat('item'))
    // this.setState({data,isFetched:!this.state.isFetched})
}

prevButton = async()=>{
    this.setState({
        isLoading: true
    })
    const url = this.props.items.info.previous
    if (url){
        await this.props.dispatch(getButton(url))
        this.setState({
            isLoading: this.props.items.isLoading
        })
    }
}

nextButton = async()=>{
    this.setState({
        isLoading: true
    })
    const url = this.props.items.info.next
    console.log(url)
    if (url){
        await this.props.dispatch(getButton(url))
        this.setState({
            isLoading: this.props.items.isLoading
        })
    }
}


// prevButton = async()=>{
//     const url = this.state.data.info.previous
//     if (url){
//         const {data} = await Axios.get(url)
//         this.setState({data})
//     }
// }

// nextButton = async()=>{
//     const url = this.state.data.info.next
//     if (url){
//         const {data} = await Axios.get(url)
//         this.setState({data})
//     }
// }


    render(){
        // const {isFetched,data} = this.state
        return(
            <Container>
            <Row >
                {!this.state.isLoading && this.props.items.data.map(v=>(
                // isFetched&& data.data&&
                // data.data.map(v=>(
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
                    <Button onClick = {this.onSubmit} type='submit' color="success" style = {{float:'right', fontSize:'12'}} className="fa fa-cart-plus text-white">
                    </Button>                        
                    </Container>
                    </Card> 
                </Col>
                </CardDeck>
                ))}
                
            </Row>
            <Row className='mt-5 mb-5'>
                <Col md={6} className='text-center'>
                    <Button onClick = {this.prevButton} color='success'>Previos</Button>
                </Col>
                <Col md={6} className='text-center'>
                    <Button onClick = {this.nextButton} color='success'>Next</Button>
                </Col>
            </Row>
            </Container>
        )
    }
}


const mapStateToProps = state => {
    return {
      items: state.items
    }
  }
  
  export default connect(mapStateToProps)(Menu)