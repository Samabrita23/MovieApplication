// PageHeader.tsx
import '../Styles/PageHeader.css';
import Logo from '../Assets/Logo.svg'

 const PageHeader = () => {
  return (
    <header className="page-header">
      <div className="logo">
        <svg width="100" height="50" viewBox="0 0 100 50">
          <image href={Logo} width="100" height="50" />
        </svg>
      </div>
      <nav className="navigation">
        <ul>
          <li><a href="#">Movies</a></li>
          <li><a href="#">TV Shows</a></li>
          <li><a href="#">People</a></li>
          <li><a href="#">More</a></li>
        </ul>
      </nav>
      <div className="user-actions">
        <a href="#">Login</a>
        <a href="#">Join Us</a>
        {/* <button><i className="fa fa-search"></i></button> */}
      </div>
    </header>
  );
};
 export default PageHeader;
