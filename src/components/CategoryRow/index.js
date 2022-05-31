import { useState, useEffect } from "react";
// imgs and icons
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import errorImg from '../../assets/imgs/error-img.svg';
// scripts
import { initScrollReveal } from "../../assets/scripts/ScrollReveal";
// styles
import './style.scss';

function CategoryRow({ title, movies }) {

  useEffect(() => {
    initScrollReveal();
  }, []);

  const [scrollX, setScrollX] = useState(-400);

  const handleLeftArrow = () => {
    if (window.innerWidth < 768) {
      let x = scrollX + Math.round(window.innerWidth / 2);
      if (x > 0) {
        x = 0;
      }
      setScrollX(x);
    }
    else {
      let x = scrollX + Math.round(window.innerWidth / 5);
      if (x > 0) {
        x = 0;
      }
      setScrollX(x);
    }
  }

  const handleRightArrow = () => {
    if (window.innerWidth < 768) {
      let x = scrollX - Math.round(window.innerWidth / 2);
      let listW = movies.results.length * 150;
      if ((window.innerWidth - listW) > x) {
        x = (window.innerWidth - listW) - 60;
      }
      setScrollX(x);
    }
    else {
      let x = scrollX - Math.round(window.innerWidth / 5);
      let listW = movies.results.length * 150;
      if ((window.innerWidth - listW) > x) {
        x = (window.innerWidth - listW) - 60;
      }
      setScrollX(x);
    }
  }

  return (
    <div className="c-category-row delayMediumReveal intervalCardReveal">

      <h2>{title}</h2>

      <div className="icon-left" onClick={handleLeftArrow}>
        <NavigateBeforeIcon style={{ fontSize: 50 }} />
      </div>

      <div className="icon-right" onClick={handleRightArrow}>
        <NavigateNextIcon style={{ fontSize: 50 }} />
      </div>

      <div className="listarea">
        <div className="list" style={{
          marginLeft: scrollX,
          width: movies.results.length * 150
        }}>
          {movies.results.length > 0 && movies.results.map((item) => (
            <div key={item.id} className="item">
              {item.poster_path ?
                <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.original_name} loading="lazy" ></img>
                :
                <img src={errorImg} alt="Em breve" loading="lazy" ></img>
              }
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default CategoryRow
