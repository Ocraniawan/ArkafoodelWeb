import React from 'react'

import { Container } from 'reactstrap';

class Footer extends React.Component{
    constructor (props){
        super(props)
        this.state = {

        }
    }


    render(){
        return(
            <Container style={{backgroundColor:'#F8F9FA'}} className='shadow'>            
            <div className="row text-center d-flex justify-content-center pt-5 mb-3">
        

              <div className="col-md-2 mb-3" >
                <h6 className="text-uppercase font-weight-bold" >
                  <a href="#!" style={{color:'#28A745'}}>About us</a>
                </h6>
              </div>

        

              <div className="col-md-2 mb-3">
                <h6 className="text-uppercase font-weight-bold">
                  <a href="#!" style={{color:'#28A745'}}>Products</a>
                </h6>
              </div>

        

              <div className="col-md-2 mb-3">
                <h6 className="text-uppercase font-weight-bold">
                  <a href="#!" style={{color:'#28A745'}}>Awards</a>
                </h6>
              </div>

        

              <div className="col-md-2 mb-3">
                <h6 className="text-uppercase font-weight-bold">
                  <a href="#!" style={{color:'#28A745'}}>Help</a>
                </h6>
              </div>

              <div className="col-md-2 mb-3">
                <h6 className="text-uppercase font-weight-bold">
                  <a href="#!" style={{color:'#28A745'}}>Contact</a>
                </h6>
              </div>

        
            </div>

            <hr className="rgba-white-light" style={{margin: "0 15%"}} />
        

            <div className="row d-flex text-center justify-content-center mb-md-0 mb-4">
              <div className="col-md-8 col-12 mt-5">
                <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem
                  aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt
                  explicabo.
                  Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur.</p>
              </div>
            </div>
            <hr className="clearfix d-md-none rgba-white-light" style={{margin: "10% 15% 5%"}} />
                
          <div style={{color:'#28A745'}} className="footer-copyright text-center py-3">© 2019 Copyright:
            <a style={{color:'#28A745'}} href="https://arkafoodel.com"> Arkafoodel.com</a>
          </div>

            </Container>

        )

    }
}

export default Footer





