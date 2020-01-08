import React from 'react'
import Axios from 'axios'
import {APP_URL} from '../resources/config'

import { Container, Row, Col, Button, Label, Input, Form, FormGroup } from 'reactstrap';

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
      // console.log(this.state)
      const data = await Axios.post(APP_URL.concat('user/registuser'),this.state)
      console.log(data)
      window.location = '/login'
        }
    
    render(){
        return(
    <Container>
    <Row>
      <Col sm="12" md={{ size: 6, offset: 3 }}>
        <Form>
            <h3 className="h5 text-center mb-4">REGISTER</h3>
        <FormGroup>
          <Label className="grey-text">Name </Label>
            <Input
              type="text"
              placeholder ="Insert Your Name"
              value={this.state.name} onChange={(e)=>this.setState({name:e.target.value})}
            />
        </FormGroup>

        <FormGroup>
          <Label className="grey-text">User Name </Label>
            <Input
              type="text"
              placeholder ="Insert Your UserName"
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
        <Button onClick = {this.onSubmit} type='submit' color = 'primary' value = 'submit'>Submit</Button>
        </FormGroup>
        </Form>
      </Col>
    </Row>
    {this.state.show}
  </Container>
        
    )}
    


}
export default Register
