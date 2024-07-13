import React, { useState } from 'react';
import './Login.css'
import {faInfoCircle}  from "@fortawesome/free-solid-svg-icons";
import { Link,useNavigate } from 'react-router-dom';



const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  console.log(email);
  console.log(password);  

  const handleLogin = (e) => {
    e.preventDefault();
    // Placeholder authentication logic
    if (email === 'favour@gmail.com' && password === 'Admin123') {
      setIsAuthenticated(true);
      navigate('/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className='Form'>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
       <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email"
        /> 
        <p id = "emailnote" className={email}>
          <fontAwesomeIcon icon={faInfoCircle}/>
        </p>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
        />

<p id = "pwdnote" className={password && email}>
                            <fontAwesomeIcon icon={faInfoCircle}/>
                           

            </p>
        <button type="submit">Login</button>
      </form>
       <p>
                        Don't have an account?<br/>
                <span className="line">
                   <Link to={"/Register"}>Sign up</Link>
                </span>
       </p>
      </div>
  );
}

export default Login;
