import React from 'react'
import Axios from 'axios'
import {registerUser} from '../redux/action/register'
import {connect} from 'react-redux'
import {APP_URL} from '../resources/config'
import {Link} from 'react-router-dom'
import { Container, Row, Col, Button, Label, Input, Form, FormGroup, Card } from 'reactstrap';
import '../resources/style.css'

class Register extends React.Component{
    constructor (props){
        super(props)

        this.onSubmit = this.onSubmit.bind(this);

        this.state = { 
            name : "",
            username : "",
            password : "",
        }
    }

 
    async onSubmit (event){
      event.preventDefault();
      const name = await this.state.name
      const username = await this.state.username
      const password = await this.state.password
      await this.props.dispatch(registerUser({name, username, password}))
      alert('Account Success Created!')
      // console.log(this.state)
      // const data = await Axios.post(APP_URL.concat('user/registuser'),this.state)
      console.log(registerUser)
      window.location = '/login'
        }
    
    render(){
        return(
    <Container>
    <Row>
    <Card className='mt-3 col-md-6 offset-md-3 shadow'  style = {{backgroundColor: 'dark', height:"450px", width:"300px", borderRadius:'15px' }}>
      <Col >
        <Form>
            <h3 className="h5 text-center mt-3"><b>REGISTER</b></h3>
        <FormGroup>
          <Label className="grey-text">Name </Label>
            <Input
              type="text"
              placeholder ="Insert Your Name"
              value={this.state.name} onChange={(e)=>this.setState({name:e.target.value})}
            />
        </FormGroup>

        <FormGroup>
          <Label className="grey-text">Username </Label>
            <Input
              type="text"
              placeholder ="Insert Your Username"
              value={this.state.username} onChange={(e)=>this.setState({username:e.target.value})}
            />
        </FormGroup>


        <FormGroup>
          <Label className="grey-text">Password </Label>
            <Input
              type="password"
              placeholder ="Insert Your Password"
              value={this.state.password} onChange={(e)=>this.setState({password:e.target.value})}
            />
        </FormGroup>

        <FormGroup>
        <Button onClick = {this.onSubmit} type='submit' className="btn btn-success btn-block" color = 'success' value = 'submit'>Submit</Button>
        </FormGroup>

        <p className="forgot-password text-right">
            Already registered <Link to="/login" className="text-success">sign in?</Link>
        </p>
        </Form>
      </Col>
    </Card>
    </Row>
    <br/><br/><br/>
    {this.state.show}
  </Container>
        
    )}
    


}
const mapStateToProps = state => {
  return {
    register: state.register
  }
}

export default connect(mapStateToProps)(Register)
