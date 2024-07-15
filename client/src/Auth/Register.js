import React, { useState } from 'react';
import {Link, useNavigate } from 'react-router-dom';
import {faInfoCircle}  from "@fortawesome/free-solid-svg-icons";



const Register = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // const handleSignup = (e) => {
  //   e.preventDefault();
  //   // Placeholder sign-up logic
  //   if (email && password) {
  //     setIsAuthenticated(true);
  //     navigate('/dashboard');
  //   } else {
  //     alert('Please fill out all fields');
  //   }
  // };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (response.ok) {
        setIsAuthenticated(true);
        navigate('/dashboard');
        console.log('Registration successful');

    
      } else {
        alert('Registration failed');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred');
    }
  };
  

  return (
    <div className='Form'>
      <h1>Signup</h1>
      <form onSubmit={handleSignup}>

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
           
        <button type="submit">Signup</button>
      </form>
        <p>
                        Already have an account?<br/>
               <span className="line">
                   <Link to={"/Login"}> Login</Link>
               </span>
        </p>
    </div>
  );
}

export default Register;
