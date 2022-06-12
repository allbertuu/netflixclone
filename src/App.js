import { useEffect, useState } from "react";
// components
import CategoryRow from "./components/CategoryRow";
import FeatureMovie from "./components/FeatureMovie";
import Header from "./components/Header";
// scripts
import Tmdb from "./services/Tmdb";
// styles
import "./App.scss";

const App = () => {
  const [netflixCategories, setNetflixCategories] = useState([]);
  const [featureData, setFeatureData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(() => {
    const loadAll = async () => {
      let categoriesList = await Tmdb.getHomeList();
      setNetflixCategories(categoriesList);

      let originals = categoriesList.filter((i) => i.slug === "originals");
      let randomChosen = Math.floor(
        Math.random() * (originals[0].items.results.length - 1)
      );
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, "tv");
      setFeatureData(chosenInfo);
    };

    loadAll();
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      window.scrollY > 70 ? setBlackHeader(true) : setBlackHeader(false);
    };

    window.addEventListener("scroll", scrollListener);

    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  }, []);

  return (
    <div className="page">
      <Header black={blackHeader} />

      {featureData ? <FeatureMovie movie={featureData} /> : null}

      <section className="lista">
        {netflixCategories.map((category) => (
          <CategoryRow
            key={category.slug}
            title={category.title}
            movies={category.items}
          />
        ))}
      </section>

      <footer>
        <span>
          Feito com{" "}
          <span role="img" aria-label="coração">
            ❤
          </span>{" "}
          por <a href="https://github.com/allbertuu">Alberto Albuquerque</a>
        </span>
        <div className="separator"></div>
        <span>Direitos de imagem para Netflix</span>
        <div className="separator"></div>
        <span>Dados extraídos do site Themoviedb.org</span>
      </footer>

      {netflixCategories.length <= 0 ? (
        <div className="loading">
          <img
            src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif"
            alt="Carregando"
          />
        </div>
      ) : null}
    </div>
  );
};

export default App;
