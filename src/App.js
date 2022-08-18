import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
import { useState } from "react";

// Import Pages
import Characters from "./pages/Characters";
import Comics from "./pages/Comics";
import Header from "./components/Header";
import Character from "./pages/Character";
import Favoris from "./pages/Favoris";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";

// FONT AWESOME
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
library.add(faHeart);

function App() {
  const favCookie = Cookies.get("Fav");
  // Ce state va prendre la valeur du cookie si celui-ci
  // est enregistré . Sije ne trouve pas de cookie ayant pour valeur "userToken" il sera egale a "null"

  const [userToken, setUserToken] = useState(Cookies.get("userToken") || null);
  // pour avoir les info de maniere persistante, on doit recuperer le cookie et le stocker dans une variable. Dans le state , avoir une ternaire qui dit si la variable existe alors tu peut faire un JSON.parse. Sinon le state aura un tableau vide
  const [favoriteCharac, setFavoriteCharac] = useState(
    favCookie ? JSON.parse(favCookie) : []
  );
  const [favoriteComics, setFavoriteComics] = useState(
    favCookie ? JSON.parse(favCookie) : []
  );

  // fonction a laquelle lorsque je lui donne quelque chose (token) elle
  // l'enregistre en tant que userToken
  const handleToken = (token) => {
    if (token) {
      // Nom,valeur,expire
      Cookies.set("userToken", token, { expires: 7 });
      setUserToken(token);
    } else {
      // Nom du token a supprimer
      Cookies.remove("userToken");
      setUserToken(null);
    }
  };

  // Cookie
  // etape 1 : recuperer le cookie
  // etape 2: parser le cookie recuperer pour reobtenir un tableau
  // etape 3: faire une boucle sur ce tableau pour checker si l'id du character y est deja
  // etape 4: si il y est , le supprimer.
  // etape 5: sinon l'ajouter et restringifier et l'envoyer dans les cookie

  const handleFav = (character) => {
    const tabFavCookie = [...favoriteCharac];
    console.log("fav2", tabFavCookie);
    let isInFav = false;

    for (let i = 0; i < tabFavCookie.length; i++) {
      console.log("tab1", tabFavCookie[i]);
      if (tabFavCookie[i]._id === character._id) {
        console.log("J'existe ");
        isInFav = true;
        alert("Charac already in Fav");
      }
    }
    if (isInFav === false) {
      console.log("J'existe pas ");
      tabFavCookie.push(character);
      setFavoriteCharac(tabFavCookie);
      Cookies.set("Fav", JSON.stringify(tabFavCookie), { expire: 300 });
    }
    console.log("cookie", tabFavCookie);
  };

  const handleFav2 = (elem) => {
    const tabFavCookie = [...favoriteComics];
    // console.log("fav2", tabFavCookie);
    let isInFav = false;
    for (let i = 0; i < tabFavCookie.length; i++) {
      // console.log("tabfav", tabFavCookie[i]._id);
      // console.log("elem", elem._id);
      if (tabFavCookie[i]._id === elem._id) {
        console.log("J'existe ");
        isInFav = true;
        alert("Charac already in Fav");
      }
    }
    if (isInFav === false) {
      console.log("J'existe pas ");
      tabFavCookie.push(elem);
      setFavoriteComics(tabFavCookie);
      Cookies.set("Fav", JSON.stringify(tabFavCookie), { expire: 300 });
    }
    console.log("cookie2", tabFavCookie);
    // console.log("handlefav2", handleFav2);
  };

  return (
    <div className="app">
      <Router>
        <Header handleToken={handleToken} userToken={userToken} />
        <Routes>
          <Route
            path="/characters"
            element={<Characters handleFav={handleFav} />}
          />
          <Route path="/comics" element={<Comics handleFav2={handleFav2} />} />
          <Route path="/comics/:id" element={<Character />} />
          <Route
            path="/favoris"
            element={
              <Favoris
                favoriteCharac={favoriteCharac}
                favoriteComics={favoriteComics}
              />
            }
          />
          <Route
            path="/signup"
            element={<SignUp handleToken={handleToken} />}
          />
          <Route path="/login" element={<LogIn handleToken={handleToken} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
