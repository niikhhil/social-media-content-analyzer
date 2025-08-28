import React from 'react';

function Footer() {
  // --- IMPORTANT ---
  // Replace "Your Name" and "your.email@example.com" with your actual details.
  const yourName = "Nikhil Yadav";
  const yourEmail = "nikhilyadav9305@gmail.com";
  const currentYear = new Date().getFullYear();

  return (
    <footer className="app-footer">
      <div className="footer-content">
        <p>
          Contact me at: <a href={`mailto:${yourEmail}`}>{yourEmail}</a>
        </p>
        <p>
          &copy; {currentYear} {yourName}. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
