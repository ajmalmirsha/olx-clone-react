import React,{useEffect,useContext} from 'react';
import {BrowserRouter,Route} from 'react-router-dom'
import './App.css';



/**
 * ?  =====Import Components=====
 */


import Home from './Pages/Home';
import Signup  from './Pages/Signup'
import Login from './Pages/Login'
import View from './Pages/ViewPost'



import {AuthContext} from './store/Context'
import { Firebase } from './firebase/config';
import Create from './Components/Create/Create';
import Post from './store/postContext'
function App() {
  const {setUser} = useContext(AuthContext)
  useEffect(()=>{
   Firebase.auth().onAuthStateChanged((user)=>{
    setUser(user)
   })
  })
  return (
    <div>
      <Post>
      <BrowserRouter>
      <Route exact path='/'>
      <Home />
      </Route>
      <Route path='/signup'>
        <Signup/>
      </Route>
      <Route path='/login'>
       <Login/>
      </Route>
      <Route path='/sell'>
      <Create/>
      </Route>
      <Route path='/view'>
       <View/>
      </Route>
      </BrowserRouter>
      </Post>
    </div>
  );
}

export default App;
