import React from 'react'
import Axios from 'axios'
import {getCategories} from '../redux/action/categories'
import {connect} from 'react-redux'
import {APP_URL} from '../resources/config'
import {Container, Row, Col, Card, Button, CardDeck, CardImg, CardHeader} from 'reactstrap'
import {Link} from 'react-router-dom'

class Categories extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            data: {},
            isFetched: false
        }
    }

    async componentDidMount(){
    this.props.dispatch(getCategories())

        // const {data} = await Axios.get(APP_URL.concat('categories/'))
        // console.log(data)
        // this.setState({data,isFetched:!this.state.isFetched})
    }

render(){
    // const {isFetched, data} = this.state
    return(
        <Container>
            <Row>
                { !this.props.categories.isLoading&& this.props.categories.data.map(v=>(
                    // isFetched&& data.data.map(v=>(
                        <CardDeck >
                        <Col  sm="12" md={{ size: 6, offset: 3 }} key= {v.id_categories} className='mt-3' >
                        <Card className='shadow' style = {{backgroundColor: 'dark', height:"362px", width:"300px", borderRadius:'10px' }}>
                        <CardHeader  className='text-center' style = {{borderTopLeftRadius:'15px', borderTopRightRadius:'15px', borderColor:'#28A745'}} ><b>{v.categories_name}</b></CardHeader>
                        <CardImg top style={{borderRadius:'15px'}}  width="250px" height="250px" border='dimgray' src={APP_URL.concat(`src/images/${v.image}`)} alt={v.name} />
                        <Link to={`/detailcategories/${v.id_categories}`} className="text-success" style = {{fontSize:'12'}}>
                            <Button className='mt-4' outline color="success" style = {{borderRadius:'10px', width:"300px"}}>
                                <b>See All</b>
                            </Button>
                        </Link>
                        </Card>                        
                        </Col>
                    </CardDeck>
                    ))
                }
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
  
  export default connect(mapStateToProps)(Categories)