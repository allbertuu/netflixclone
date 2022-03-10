import React, { useEffect, useState } from 'react';
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow';
import './App.css'
import FeatureMovie from './components/FeatureMovie';
import Header from './components/Header';

const App = () => {

  const [movieList, setMovieList] = useState([]);
  const [featureData, setFeatureData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(() => {
    const loadAll = async () => {
      // pegando a lista total
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      // pegando o featured
      let originals = list.filter(i => i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
      setFeatureData(chosenInfo);
    }

    loadAll();
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      window.scrollY > 70 ? setBlackHeader(true) : setBlackHeader(false);
    }

    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener)
    }
  }, []);

  return (
    <div className='page'>

      <Header black={blackHeader} />

      {featureData &&
        <FeatureMovie item={featureData} />
      }

      <section className='lista'>
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>
      <footer>
        <span>Feito com <span role="img" aria-label='coração'>❤</span> por <a href='https://github.com/allbertuu'>Alberto Albuquerque</a></span>
        <div className="separator"></div>
        <span>Direitos de imagem para Netflix</span>
        <div className="separator"></div>
        <span>Dados extraídos do site Themoviedb.org</span>
      </footer>

      {movieList.length <= 0 &&
        <div className='loading'>
          <img src='https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif' alt='Carregando' />
        </div>
      }

    </div>
  );
}

export default App