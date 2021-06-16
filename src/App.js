import './App.css';
import {useState , useEffect} from 'react'
import { BrowserRouter as Router, Switch, Redirect, Route ,  Link } from 'react-router-dom';
import {auth} from './firebase'
import firebase from 'firebase';

import Dashboard from './components/Dashboard';
import Signup from './components/Signup'
import Login from './components/Login'


function App() {

  const [user , setUser] = useState(null)

  

  // adding firebase user globally
  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if(user) {
        setUser(user)
      }
      else setUser(null)
    })
  })

  return (
    <>
      <Router>
        <Switch>
          <Route exact path='/'>
              {/* pass user as prop to dashboard */}
              <Dashboard user={user}/>  
          </Route>
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login}/>
        </Switch>
      </Router>
    </>
  );
}


export default App;
