import { useState, useEffect } from "react";
// imgs and icons
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import imgError from '../assets/imgs/error-img.svg';
// scripts
import { initScrollReveal } from "../../assets/scripts/ScrollReveal";
// styles
import './style.scss';

function MovieRow({ title, items }) {

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
      let listW = items.results.length * 150;
      if ((window.innerWidth - listW) > x) {
        x = (window.innerWidth - listW) - 60;
      }
      setScrollX(x);
    }
    else {
      let x = scrollX - Math.round(window.innerWidth / 5);
      let listW = items.results.length * 150;
      if ((window.innerWidth - listW) > x) {
        x = (window.innerWidth - listW) - 60;
      }
      setScrollX(x);
    }
  }

  return (
    <div className="movieRow delayMediumReveal intervalCardReveal">

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
          width: items.results.length * 150
        }}>
          {items.results.length > 0 && items.results.map((item, key) => (
            <div key={key} className="item">
              {item.poster_path !== null &&
                <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.original_title} loading="lazy" ></img>
              }
              {item.poster_path === null &&
                <img src={imgError} alt="Em breve" loading="lazy" ></img>
              }
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default MovieRow
