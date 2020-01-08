import React from 'react'
import Axios from 'axios'
import Cookie from 'js-cookie'
import {APP_URL} from '../resources/config'
import { Container, Row, Col, Button, Label, Input, Form, FormGroup } from 'reactstrap';

class Login extends React.Component{
    constructor (props){
        super(props)

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {

            username : "",
            password : "",


        }
    }


    async onSubmit(event){
      event.preventDefault();
      const data = await Axios.post(  APP_URL.concat('user/login'),this.state)
      console.log(data);
      Cookie.set('token', data.data.auth)
      window.location = '/'
    }


    render(){
        return(
            <Container>
    <Row>
      <Col sm="12" md={{ size: 6, offset: 3 }}>
        <Form>
        <FormGroup>
        <h3 className="h5 text-center mb-4">Log In</h3>
        </FormGroup>
        <FormGroup>
          <Label className="grey-text">User Name </Label>
            <Input
              type="text"
              value={this.state.username} onChange={(e)=>this.setState({username:e.target.value})}
            />
        </FormGroup>
        <FormGroup>
          <Label className="grey-text">Password </Label>
            <Input
              type="password"
              value={this.state.password} onChange={(e)=>this.setState({password:e.target.value})}
            />  
        </FormGroup>

        <FormGroup>
        <Button onClick = {this.onSubmit} type='submit' color = 'primary' value = 'submit'>Submit</Button>
        </FormGroup>

        </Form>
      </Col>
    </Row>
    {this.state.show}
  </Container>
        
    )}
    


}
export default Login


