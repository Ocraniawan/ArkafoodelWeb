import React from 'react'
import axios from 'axios'
import {APP_URL} from '../resources/config'
import {Link} from 'react-router-dom'

import {Row, Col, Container, Button, Card, CardHeader, CardDeck} from 'reactstrap'

class Menu extends React.Component{
constructor(props){
    super(props)
    this.state = {
        data: {},
        isFetched: false
    }
}

  async componentDidMount(){
    const {data} = await axios.get(APP_URL.concat('item'))
    this.setState({data,isFetched:!this.state.isFetched})
}

prevButton = async()=>{
    const url = this.state.data.info.previous
    if (url){
        const {data} = await axios.get(url)
        this.setState({data})
    }
}

nextButton = async()=>{
    const url = this.state.data.info.next
    if (url){
        const {data} = await axios.get(url)
        this.setState({data})
    }
}


    render(){
        const {isFetched,data} = this.state
        return(
            <Container>
            <Row >
                {
                isFetched&& data.data&&
                data.data.map(v=>(
                    <Col md key= {v.id_item} className='mt-3' >
                    <CardDeck >
                        <Card className='shadow' style = {{backgroundColor: 'dark', height:"400px", width:"255px", borderRadius:'15px' }}>
                            <div className='text-center'>
                                <img src= {APP_URL.concat(`src/images/${v.image}`)} alt={v.name} style={{height:"200px", width:"254px", borderRadius:'14px'}}/>   
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
                    </CardDeck>
                       
                    </Col>

                ))}
                
            </Row>
            <Row className='mt-5 mb-5'>
                <Col md={6} className='text-center'>
                    <Button onClick = {this.prevButton} color='primary'>Previos</Button>
                </Col>
                <Col md={6} className='text-center'>
                    <Button onClick = {this.nextButton} color='primary'>Next</Button>
                </Col>
            </Row>
            </Container>
        )
    }
}

export default Menu