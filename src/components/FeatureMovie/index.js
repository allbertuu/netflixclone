// imgs and icons
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AddIcon from '@mui/icons-material/Add';
// styles
import './style.scss';

function FeatureMovie({ movie }) {

  let firstDate = new Date(movie.first_air_date);
  let genres = [];
  for (let i in movie.genres) {
    genres.push(movie.genres[i].name);
  }

  return (
    <div>
      <section className='featured' style={{
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
      }}>
        <div className='featured--vertical'>
          <div className='featured--horizontal'>
            <div className='name'>{movie.original_name}</div>
            <div className='info'>
              {movie.vote_average !== 0 &&
                <div className='points'>{movie.vote_average} pontos</div>
              }
              <div>{firstDate.getFullYear()}</div>
              <div>{movie.number_of_seasons} temporada{movie.number_of_seasons !== 1 ? 's' : ''}</div>
            </div>
            <div className='description'>{movie.overview}</div>
            <div className='buttons'>
              <a href={`/watch/${movie.id}`} className="btn btn--watch"><PlayArrowIcon /> Assistir</a>
              <a href={`/list/add/${movie.id}`} className="btn btn--mylist"><AddIcon /> Minha Lista</a>
            </div>
            {genres.length !== 0 &&
              <div className='genres'>
                <strong>Gênero{genres.length > 1 ? 's' : ''}: </strong> {genres.join(', ')}
              </div>
            }
          </div>
        </div>
      </section>
    </div>
  );
}

export default FeatureMovie