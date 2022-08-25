import { Link } from 'react-router-dom';
import '../App.css';

function Home() {
  return (
    <div className="App">
      <header className="App-header">
       <h1>Lord of the Rings Characters</h1>
       <Link to="/dashboard" className='link'>Dashboard</Link>
       <Link to="/signup" className='link'>SignUp</Link>
       <Link to="/login" className='link'>Login</Link>
      </header>
    </div>
  );
}

export default Home;