import React , {useState,useContext} from 'react';
import { FirebaseContext } from '../../store/Context';
import Logo from '../../olx-logo.png';
import './Login.css';

import { useHistory } from 'react-router-dom';

function Login() {
  const history = useHistory()
   const [Email,setEmail] = useState('')
   const [Password,setPassword] = useState('')

   const {Firebase} = useContext(FirebaseContext)


const handleLogin = (e)=>{
  e.preventDefault()
  Firebase.auth().signInWithEmailAndPassword(Email,Password).then(()=>{
   history.push('/')
  }).catch((error)=>{
    alert(error.message)
  })

}

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" id='logo' height="200px" src={Logo}></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            defaultValue="John"
            value={Email}
            onChange={(e)=>{
             setEmail(e.target.value)
            }}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            defaultValue="Doe"
            value={Password}
            onChange={(e)=>{
             setPassword(e.target.value)
            }}
          />
          <br />
          <br />
          <button  >Login</button>
        </form>
        <a onClick={()=>{
            history.push('/signup')
          }}>Signup</a>
      </div>
    </div>
  );
}

export default Login;
