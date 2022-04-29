import React from "react";
// styles
import './Header.scss';

function Header({ black }) {
  return (
    <header className={black ? 'black' : undefined}>
      <div className="logo">
        <a href="/">
          <img alt="Logo Netflix" src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" />
        </a>
      </div>
      <div className="user">
        <a href="/">
          <img alt="Usuário" src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/366be133850498.56ba69ac36858.png" />
        </a>
      </div>
    </header>
  );
}

export default Header