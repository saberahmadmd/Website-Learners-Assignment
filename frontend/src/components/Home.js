import { Link } from 'react-router-dom';

import './Home.css';

function Home() {
  return (
    <div className='container'>
      <div className="home">
        <h1 className="home-title">Medication Management</h1>
        <Link to="/signup" className="home-link">Sign Up</Link>
        <Link to="/login" className="home-link">Login</Link>
      </div>
    </div>

  );
}

export default Home;
