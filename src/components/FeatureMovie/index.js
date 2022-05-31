// imgs and icons
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AddIcon from '@mui/icons-material/Add';
// styles
import './style.scss';

function FeatureMovie({ item }) {

  let firstDate = new Date(item.first_air_date);
  let genres = [];
  for (let i in item.genres) {
    genres.push(item.genres[i].name);
  }

  return (
    <div>
      <section className='featured' style={{
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`
      }}>
        <div className='featured--vertical'>
          <div className='featured--horizontal'>
            <div className='name'>{item.original_name}</div>
            <div className='info'>
              {item.vote_average !== 0 &&
                <div className='points'>{item.vote_average} pontos</div>
              }
              <div>{firstDate.getFullYear()}</div>
              <div>{item.number_of_seasons} temporada{item.number_of_seasons !== 1 ? 's' : ''}</div>
            </div>
            <div className='description'>{item.overview}</div>
            <div className='buttons'>
              <a href={`/watch/${item.id}`} className="btn btn--watch"><PlayArrowIcon /> Assistir</a>
              <a href={`/list/add/${item.id}`} className="btn btn--mylist"><AddIcon /> Minha Lista</a>
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