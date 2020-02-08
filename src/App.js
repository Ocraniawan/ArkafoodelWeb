import React from 'react';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Footer from './components/Footer'
import Menu from './pages/Menu'
import Restaurant from './pages/Restaurant'
import DetailItem from './pages/detailItem'
import MenuRestaurant from './pages/MenuRestaurant'
import Stores from './pages/Stores'
import Categories from './pages/Categories'
import DetailCategories from './pages/detailCategories'
import Review from './pages/review'
import SearchByName from './pages/SearchByName'
import SearchByPrice from './pages/SearchByPrice'
import SearchByRating from './pages/SearchByRating'

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
          <Route path='/menu' exact>
            <Menu />
          </Route>
          <Route path='/restaurant' exact>
            <Restaurant />
          </Route>
          <Route path='/categories' exact>
            <Categories />
          </Route>
          <Route path='/review' exact>
            <Review />
            </Route>
          <Route path='/searchbyname' exact>
            <SearchByName />
          </Route>
          <Route path='/searchbyrating' exact>
            <SearchByRating />
          </Route>
          <Route path='/searchbyprice' exact>
            <SearchByPrice />
          </Route>
          <Route path='/item/:id' exact component={DetailItem} />
          <Route path='/menurestaurant/:id' exact component={MenuRestaurant} />
          <Route path='/detailcategories/:id' exact component={DetailCategories} />
          <Route path='/store/:id' exact component={Stores} />
          <Route path='/review/:id' exact component={Review} />

        </Switch>
          <div>
            <Footer />
          </div>
      </Router>
    )
  }
}

export default App;
