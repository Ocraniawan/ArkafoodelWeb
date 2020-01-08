import React from 'react'
import axios from 'axios'
import {APP_URL} from '../resources/config'
import {Container, Col, Card, Row, Button, CardHeader, CardDeck, CardText, CardBody, CardTitle} from 'reactstrap'
import {Link} from 'react-router-dom'


class DetailItem extends React.Component{
constructor(props){
    super(props)
    this.state = {
        data: null,
        suggess : null,
        reviewItem : null,
        isFetchedDetailItem : false,
        paramsId_Item : null,
    }
}

  async componentDidMount(){
    const {id_item} = this.props.match.params

    const url = APP_URL.concat(`item/${id_item}`)
    const item = await axios.get(url)
    const {suggess, data} = item

    const review = APP_URL.concat(`valuation/${id_item}`)
    const reviews = await axios.get(review)
    const reviewItem = reviews.data

    this.setState({data, reviewItem, isFetchedDetailItem:true, paramsId_Item:id_item})
}

    render(){
        const {isFetchedDetailItem, data, reviewItem, suggess, paramsId_Item} = this.state
        if (paramsId_Item!=this.props.match.params&&paramsId_Item!=null){
         this.componentDidMount()  
        }
        return(
            <Container >
                <Row>
                    <Col>
                    {isFetchedDetailItem &&
                        <div className='shadow mt-2' style={{display:'flex',justifyContent:'center', alignItems:'center',flexDirection:'column', borderRadius:'15px'}}>
                        <div className='row'>
                            <div className='col-md-6'>
                                <img src={APP_URL.concat(`src/images/${data.data[0].image}`)} alt={data.name} style={{height:"278px", width:"280px", borderRadius:'15px'}}/>
                            </div>
                            <div className='col-md-6'>
                                <CardHeader>
                                <div style = {{textAlign:'center'}}><b> {data.data[0].item_name} </b></div>
                                </CardHeader>
                                <div className='mt-2' style={{fontSize:'18px'}}><b> Price : </b><b style={{color:'#FA591D'}}>Rp.{data.data[0].price},00</b></div>
                                <div><b>Rating     : </b>{data.data[0].rating}</div>
                                <div><b>Restaurant : </b>{data.data[0].restaurant_name}</div>
                                <div><b>Categories : </b>{data.data[0].categories_name}</div>
                                <div style = {{textAlign:'center'}}><b><i>{data.data[0].description}</i></b></div>
                                    <Container className='mt-3' style={{textAlign:'center'}}>
                                    <Button outline color='success' >
                                        <Link to={`/menu/`} className="text-success fa fa-backward">
                                        </Link>
                                    </Button> &nbsp;
                                    <Button color='success'>
                                        <Link to={`#`} className="text-white fa fa-cart-plus">
                                        </Link>
                                    </Button>
                                    </Container>
                            </div>
                        </div>
                        </div>
                    }
                    </Col>
                    <Col >
                    <div className='shadow mt-2' style={{display:'flex',justifyContent:'center', height:"278px", alignItems:'center',flexDirection:'column', borderRadius:'15px'}}>
                    <div className='col' style = {{textAlign:'center', fontSize:'20px', backgroundColor:'#F0F1F2', fontFamily:'Arial Rounded MT Bold'}}><b>Review</b></div>
                    {isFetchedDetailItem&&
                    reviewItem.data.map(v=>(
                        <Col md key= {v.id_item}>
                                <div>
                                    <b>Username : {v.username}</b>
                                </div>
                                <div>
                                    <b>Comment :</b>{v.review}
                                </div>
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
                                <img src= {APP_URL.concat(`src/images/${v.image}`)} alt={v.name} style={{height:"200px", width:"254px", borderRadius:'14px'}}/>   
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