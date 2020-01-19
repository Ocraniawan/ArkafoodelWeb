// import React from 'react'
// import Axios from 'axios'
// import {connect} from 'react-redux'
// import {getCart} from '../redux/action/cart'
// import {APP_URL} from '../resources/config'
// import {Link} from 'react-router-dom'
// import Cookie from 'js-cookie'
// import Jwt from 'jwt-decode'
// import {Container, Row, Col, Card, CardHeader} from 'reactstrap'


// const token = Cookie.get('token')
// let decode =''
// if (token) {
//   decode = Jwt(token)
// }

// class Carts extends React.Component{
//     constructor(props){
//         super(props)
//         this.state = {

//         }
//     }


// async componentDidMount(){
//     const {id} = this.props.match.params
//     this.props.dispatch(getCart(id))
//     // console.log(id)
//     // const {data} = await Axios.get(APP_URL.concat(`cart/${id}`))
//     // console.log(data)
//     // this.setState({data, isFetched:true})

// }

// render(){
//     // const {isFetched, data} = this.state
//     return(
//         <Container>
//             { !this.props.carts.isLoading && this.props.carts.data.map(v=>(
//                 // isFetched && data.data&&
//                 // data.data.map(v=>(
//                 <Row>
//                     <Col key= {v.id_carts}>
//                         <Card>
//                             <div>
//                             <img src= {APP_URL.concat(`src/images/${v.image}`)} alt={v.name} style={{height:"200px", width:"254px", borderRadius:'14px'}}/>   
//                             </div>
//                             <div>
//                                 {v.username}
//                             </div>
//                             <div>
//                                 {v.item_name}
//                             </div>
//                         </Card>
//                     </Col>
//                 </Row>   
//                 ))
//             }
//         </Container>
//     )
// }

// }

// const mapStateToProps = state => {
//     return {
//       carts: state.carts
//     }
//   }
  
//   export default connect(mapStateToProps)(Carts)