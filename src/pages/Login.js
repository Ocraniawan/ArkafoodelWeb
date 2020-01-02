import React from 'react'

import { Container, Row, Col, Button, Label, Input, Form, FormGroup } from 'reactstrap';

class Login extends React.Component{
    constructor (props){
        super(props)
        this.state = {
            username : "",
            password : "",
        }
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
        <Button size="lg" onClick = {this.Submit} color = 'primary' value = 'submit'>Submit</Button>
        </FormGroup>

        </Form>
      </Col>
    </Row>
    {this.state.show}
  </Container>
        
    )}
    


}
export default Login
