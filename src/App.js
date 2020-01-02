import React from 'react';

import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'

import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Footer from './components/Footer'
import Modals from './pages/Modals'


class App extends React.Component{
  render(){
    return(
      <Router>
        <div>
          <Navbar />
        </div> <br/> <br/> <br/>
        <Switch>
          <Route path='/' exact>
            <Home/>
          </Route>
          <Route path='/login' exact>
            <Login/>
          </Route>
          <Route path='/register' exact>
            <Register/>
          </Route>
          <Route path='/modals' exact>
            <Modals />
          </Route>
        </Switch>
          <div>
            <Footer />
          </div>
      </Router>
    )
  }
}

export default App;
