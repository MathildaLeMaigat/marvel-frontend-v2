import { Link } from "react-router-dom";
import logo from "../assets/img/marvel.logo.png";

const Header = () => {
  return (
    <div className="header">
      <Link to="/">
        <img src={logo} alt="logo" />
      </Link>

      <Link to="/character">
        <p>Personnages</p>
      </Link>
      <Link to="/comics">
        <p>Comics</p>
      </Link>

      <p>Favoris</p>

      <p>Se connecter</p>
      <p>S'inscrire</p>
    </div>
  );
};

export default Header;
