import React from 'react'
import axios from 'axios'
import {APP_URL} from '../resources/config'
import {Link} from 'react-router-dom'

import {Row, Container, Card, Col, CardImg, CardText,
     CardBody, CardDeck, CardHeader, Button} from 'reactstrap'

class Search extends React.Component{
constructor(props){
    super(props)
    this.state = {
        data: {},
        isFetched: false
    }
}

  async componentDidMount(){
    const {data} = await axios.get(APP_URL.concat('item/search?'))
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
                        <CardHeader className='text-center' style = {{borderTopLeftRadius:'15px', borderTopRightRadius:'15px', borderColor:'#28A745'}} ><b>{v.restaurant_name}</b></CardHeader>
                    <CardImg top style={{borderRadius:'15px', backgroundColor:'#F8F9FA'}} width="250px" height="250px" border='dimgray' src={APP_URL.concat(`src/images/${v.image}`)} alt={v.name} />
                        <CardBody> 
                        <CardText>{v.description}.</CardText>
                        </CardBody>
                    <Link to={`/menurestaurant/${v.id_restaurant}`} className="text-success" style = {{fontSize:'12'}}>
                        <Button className='mt-4' outline color="success" style = {{borderRadius:'10px', width:"300px"}}>
                            <b>See Menu</b>
                        </Button>
                    </Link>
                    </Card>                        
                    </Col>
                </CardDeck>
                ))}
            </Row>
            </Container>
        )
    }
}
export default Search