import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {getCategoryById} from '../redux/action/categories'
import {APP_URL} from '../resources/config'
import {Link} from 'react-router-dom'

import {Row, Col, Container, Button, Card, CardHeader, CardDeck} from 'reactstrap'

class DetailCategories extends React.Component{
constructor(props){
    super(props)
    this.state = {

    }
}


  async componentDidMount(){
      console.log(this.props)
      const {id} = this.props.match.params
      this.props.dispatch(getCategoryById(id))
    //   const url = await axios.get(APP_URL.concat(`categories/detail/${id}`))
    //   const {data} = url
    //   this.setState({data,isFetched:!this.state.isFetched})
}

    render(){
        // const {isFetched,data} = this.state
        return(
            <Container>
                <Row>
                {!this.props.categories.isLoading && this.props.categories.data.map(v=>(
                //     isFetched&&
                // data.data.map(v=>(
                    <CardDeck>
                    <Col sm="12" md={{ size: 6, offset: 3 }} key= {v.id_item} className='mt-3' >
                        <Card className='shadow' style = {{backgroundColor: 'dark', height:"430px", width:"300px", borderRadius:'15px' }}>
                            <div className='text-center'>
                                <img src= {APP_URL.concat(`src/images/${v.image}`)} alt={v.name} style={{height:"250px", width:"298px", borderRadius:'14px'}}/>   
                            </div>
                            <CardHeader>
                            <div className='text-center mt-2' >
                                <b><i>{v.item_name}</i></b>
                            </div> 
                            </CardHeader>

                            <div className='text-center mt-2' style={{color:'#FA591D'}}>
                                <b>Price: Rp.{v.price},00</b>
                            </div>
                            <div className='text-center' >
                                <i>{ v.description}</i>
                            </div>
                        <Container className='mt-3'>
                        <Button outline color="success" style = {{float:'left'}}>
                            <Link to={`/item/${v.id_item}`} className="fa fa-th-list text-success" style = {{fontSize:'12'}}>
                            </Link>
                        </Button>
                        <Button color="success" style = {{float:'right'}}>
                            <Link to={`/item/${v.id_item}`} className="fa fa-cart-plus text-white" style = {{fontSize:'12'}}>
                            </Link>
                        </Button>
                        </Container>
                        </Card> 
                    </Col>
                    </CardDeck>
                ))}
            </Row>
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
      categories: state.categories
    }
  }
  
  export default connect(mapStateToProps)(DetailCategories)