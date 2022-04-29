import API from './api';

/*
- originais da netflix
- recomendados (trending)
- em alta (top rated)
- aventura
- comédia
- familia
- romance
- documentário
*/

const getList = async (endpoint) => {
  const res = await API.get(endpoint);
  const data = res.data;
  return data;
}

const Tmdb = {
  getHomeList: async () => {
    return [
      {
        slug: 'originals',
        title: 'Originais do Netflix',
        items: await getList('/discover/tv?with_network=213')
      },
      {
        slug: 'trending',
        title: 'Recomendados para Você',
        items: await getList('/trending/all/week')
      },
      {
        slug: 'toprated',
        title: 'Em Alta',
        items: await getList('/movie/top_rated')
      },
      {
        slug: 'adventure',
        title: 'Aventura',
        items: await getList('/discover/movie?with_genres=12')
      },
      {
        slug: 'comedy',
        title: 'Comédia',
        items: await getList('/discover/movie?with_genres=35')
      },
      {
        slug: 'family',
        title: 'Família',
        items: await getList('/discover/movie?with_genres=10751')
      },
      {
        slug: 'romance',
        title: 'Romance',
        items: await getList('/discover/movie?with_genres=10749')
      },
      {
        slug: 'documentary',
        title: 'Documentário',
        items: await getList('/discover/movie?with_genres=99')
      },
    ]
  },
  getMovieInfo: async (movieId, type) => {
    let info = {};

    if (movieId) {
      switch (type) {
        case 'movie':
          info = await getList(`/movie/${movieId}`);
          break;
        case 'tv':
          info = await getList(`/tv/${movieId}`);
          break;
        default:
          break;
      }
    }
    return info;
  }
}

export default Tmdb