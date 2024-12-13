import React from "react";

const Footer = () => {
  const crDate = new Date();
  const crYear = crDate.getFullYear();
  return (
    <div className="footer-wrapper">
      <p>�� {crYear} Resto App. All rights reserved.</p>
    </div>
  );
};

export default Footer;

// user name in db = restaurant
// password in db = iymdERC3eqXmSaHn