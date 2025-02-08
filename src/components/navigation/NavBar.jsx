import { Link, useLocation } from 'react-router-dom';

const NavBar = () => {
  const location = useLocation();
  
  return (
    <nav className="main-nav">
      {/* Cubby as non-link header */}
      <h1 className="site-title">Cubby</h1>
      
      <div className="nav-links">
        <Link 
          to="/profile" 
          className={location.pathname === '/profile' ? 'active' : ''}
        >
          Profile
        </Link>
        <Link
          to="/cubby"
          className={location.pathname === '/cubby' ? 'active' : ''}
        >
          Cubby
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
