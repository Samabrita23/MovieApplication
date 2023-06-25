import React from 'react';
import '../Styles/PageFooter.css';

const PageFooter: React.FunctionComponent = () => {
  return (
    <footer className="footer">
      <div className="footer-column">
        <h3 className="footer-heading">Company</h3>
        <ul className="footer-list">
          <li><a href="#">About Us</a></li>
          <li><a href="#">Contact Us</a></li>
          <li><a href="#">Support Forums</a></li>
        </ul>
      </div>
      <div className="footer-column">
        <h3 className="footer-heading">Community</h3>
        <ul className="footer-list">
          <li><a href="#">Guidelines</a></li>
          <li><a href="#">Discussions</a></li>
          <li><a href="#">Twitter</a></li>
        </ul>
      </div>
      <div className="footer-column">
        <h3 className="footer-heading">Legal</h3>
        <ul className="footer-list">
          <li><a href="#">Terms of Use</a></li>
          <li><a href="#">Privacy Policy</a></li>
        </ul>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} All rights reserved.</p>
        <p>Made by Samabrita</p>
      </div>
    </footer>
  );
};

export default PageFooter;

