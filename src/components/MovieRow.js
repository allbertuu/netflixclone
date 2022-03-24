import React, { useState } from "react";
import './MovieRow.scss';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

function MovieRow({ title, items }) {

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
        <div className="movieRow">

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
                            <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.original_title} loading="lazy" ></img>
                        </div>
                    ))}
                </div>
            </div>
            
        </div>
    );
}

export default MovieRow
