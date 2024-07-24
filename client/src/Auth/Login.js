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

  

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        setIsAuthenticated(true);
        navigate('/dashboard');
      } else {
        alert('Invalid credentials');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred');
    }
  };
  

  return (
    <div className='Form'>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>

        <label> Email
       <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email"
        /> 
        </label>
        <p id = "emailnote" className={email}>
          <fontAwesomeIcon icon={faInfoCircle}/>
        </p>
        <label> Password
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
        />
        </label>

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
