import '../Styles/PageHeader.css';
import Logo from '../Assets/Logo.svg'
import 'bootstrap/dist/css/bootstrap.min.css'; // Importing Bootstrap CSS

const PageHeader = () => {
  return (
    <header className="page-header">
      <div className="logo">
        <svg width="100" height="50" viewBox="0 0 100 50">
          <image href={Logo} width="100" height="50" />
        </svg>
      </div>
      <nav className="navigation d-flex d-lg-flex"> 
        <ul className="navbar-nav">
          <li className="nav-item"><a className="nav-link" href="#">Movies</a></li>
          <li className="nav-item"><a className="nav-link" href="#">TV Shows</a></li>
          {/* <li className="nav-item"><a className="nav-link" href="#">People</a></li>
          <li className="nav-item"><a className="nav-link" href="#">More</a></li> */}
        </ul>
      </nav>
      <div className="user-actions">
        <a href="#" className="btn btn-primary">Login</a>
        <a href="#" className="btn btn-secondary">Join Us</a>
      </div>
    </header>
  );
};

export default PageHeader;
