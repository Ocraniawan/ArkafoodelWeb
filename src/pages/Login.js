import React from 'react'
import Axios from 'axios'
import {logIn} from '../redux/action/login'
import {connect} from 'react-redux'
import Cookie from 'js-cookie'
import {APP_URL} from '../resources/config'
import { Container, Row, Col, Button, Label, Input, Form, FormGroup, Card } from 'reactstrap';

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
      const username = await this.state.username
      const password = await this.state.password
      await this.props.dispatch(logIn({username, password}))
      // const data = await Axios.post(  APP_URL.concat('user/login'),this.state)
      // console.log(this.props);
      Cookie.set('token', this.props.login.data )
      window.location = '/'
    }


    render(){
        return(
    <Container>
    <Row>
    <Card className='mt-3 col-md-6 offset-md-3 shadow'  style = {{backgroundColor: 'dark', height:"400px", width:"200px", borderRadius:'15px' }}>      <Col>
        <Form>
        <FormGroup>
        <h3 className="h5 text-center mt-3"><b>Sign In</b></h3>
        </FormGroup>
        <FormGroup>
          <Label className="grey-text mt-2">Username </Label>
            <Input
              placeholder="Enter Username"
              type="text"
              value={this.state.username} onChange={(e)=>this.setState({username:e.target.value})}
            />
        </FormGroup>
        <FormGroup>
          <Label className="grey-text">Password </Label>
            <Input
              placeholder="Enter password"
              type="password"
              value={this.state.password} onChange={(e)=>this.setState({password:e.target.value})}
            />  
        </FormGroup>

        <FormGroup className="mt-3">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
        </FormGroup>

        <FormGroup>
        <Button onClick = {this.onSubmit} className="btn btn-success btn-block" type='submit' color = 'success' value = 'submit'>Submit</Button>
        </FormGroup>

        </Form>
      </Col>
      </Card>
    </Row>
    <br/><br/>
    {this.state.show}
  </Container>
        
    )}
    


}
const mapStateToProps = state => {
  return {
    login: state.login
  }
}

export default connect(mapStateToProps)(Login)
// export default Login

