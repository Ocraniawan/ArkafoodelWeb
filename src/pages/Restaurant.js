import React from 'react'
import axios from 'axios'
import {APP_URL} from '../resources/config'
import {Link} from 'react-router-dom'

import {Row, Container, Card, Col, CardImg, CardText,
     CardBody, CardDeck, CardHeader, Button} from 'reactstrap'

class Restaurant extends React.Component{
constructor(props){
    super(props)
    this.state = {
        data: {},
        isFetched: false
    }
}

  async componentDidMount(){
    const {data} = await axios.get(APP_URL.concat('restaurant/'))
    console.log(data)
    this.setState({data,isFetched:!this.state.isFetched})
}



    render(){
        const {isFetched,data} = this.state
        return(
            <Container>
            <Row style={{textAlign:'center'}}>
                {
                isFetched&&
                data.data.map(v=>(
                <CardDeck >
                    <Col  sm="12" md={{ size: 6, offset: 3 }} key= {v.id_restaurant} className='mt-4' >
                    <Card className='shadow' style = {{backgroundColor: 'dark', height:"420px", width:"300px", borderRadius:'15px' }}>
                    <CardImg top style={{borderRadius:'15px'}} width="250px" height="250px" border='dimgray' src={APP_URL.concat(`src/images/${v.image}`)} alt={v.name} />
                        <CardHeader className='text-center mt-2' ><b>{v.restaurant_name}</b></CardHeader>
                        <CardBody> 
                        <CardText>{ v.description}.</CardText>
                        </CardBody>
                        <Button outline color="success">
                            <Link to={`/menurestaurant/${v.id_restaurant}`} className="fa fa-th-list text-success" style = {{fontSize:'12'}}>
                            </Link>
                        </Button>
                    </Card>                        
                    </Col>
                </CardDeck>
                ))}
            </Row>
            </Container>
        )
    }
}
export default Restaurant