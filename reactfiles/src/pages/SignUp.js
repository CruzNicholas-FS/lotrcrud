import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';
import authService from '../services/auth.service';

function SignUp() {
  const [email, setEmail]=useState("");
  const [password, setPassword]=useState("");

  const navigate = useNavigate();

  const handleSignup=async(e)=>{
    e.preventDefault();
    try {
      await authService.signup(email, password)
      .then(response=>{navigate("/dashboard")}, error=>{console.error(error)})
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="App">
      <header className="App-header">
       <h1>SignUp</h1>
       <Link to="/dashboard" className='link'>Dashboard</Link>
       <form onSubmit={handleSignup}>
          <input type="text" placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
          <input type="password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
          <button type="submit">Submit</button>
        </form>
      </header>
    </div>
  );
}

export default SignUp;