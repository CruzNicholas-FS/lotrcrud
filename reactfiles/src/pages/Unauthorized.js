import { Link } from 'react-router-dom';
import '../App.css';

function Unauthorized() {
  return (
    <div className="App">
      <header className="App-header">
       <h1>Unauthorized</h1>
       <p>Signup or Login to access this page</p>
       <Link to="/" className='link'>Home</Link>
       <Link to="/signup" className='link'>SignUp</Link>
       <Link to="/login" className='link'>Login</Link>
      </header>
    </div>
  );
}

export default Unauthorized;