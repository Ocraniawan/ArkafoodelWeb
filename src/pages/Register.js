import React from 'react'

import { Container, Row, Col, Button, Label, Input, Form, FormGroup } from 'reactstrap';

class Register extends React.Component{
    constructor (props){
        super(props)
        this.state = {
            name : "",
            username : "",
            email : "",
            password : "",
            show : "",

        }
    }


    Submit = ()=>{
        this.setState({show : <span> name : {this.state.name}<br/>
                                     name : {this.state.username}<br/>
                                     email: {this.state.email}<br/>
                                     password: {this.state.email}</span>})
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
          <Label className="grey-text">Email Address </Label>
            <Input
              type="text"
              placeholder ="Insert Your Email Address"
              value={this.state.email} onChange={(e)=>this.setState({email:e.target.value})}
            />
        </FormGroup>

        <FormGroup>
          <Label className="grey-text">Confirm Email Address </Label>
            <Input
              type="text"
              placeholder ="Confirm Your Email Address"
              value={this.state.email} onChange={(e)=>this.setState({email:e.target.value})}
            />
        </FormGroup>

        <FormGroup>
          <Label className="grey-text">Password </Label>
            <Input
              type="text"
              placeholder ="Insert Your Password"
              value={this.state.password} onChange={(e)=>this.setState({password:e.target.value})}
            />
        </FormGroup>

        <FormGroup>
        <Button onClick = {this.Submit} color = 'primary' value = 'submit'>Submit</Button>
        </FormGroup>
        </Form>
      </Col>
    </Row>
    {this.state.show}
  </Container>
        
    )}
    


}
export default Register
