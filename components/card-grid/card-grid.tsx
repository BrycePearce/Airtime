import React, { useEffect, useState } from "react";
import cardStyles from "./card-grid.module.scss";
import axiosInstance from "../../lib/axios";

const CardGrid: React.FC = () => {
  const CardList = () => {
    const [data, setData] = useState();

    useEffect(() => {
      getPopular();
    }, []);

    const getPopular = async () => {
      const { data } = await axiosInstance.get(
        `https://api.themoviedb.org/3/tv/popular?api_key=#{api_key}&language=en-US&page=1`
      );
      setData(data);
    };

    if (data?.results) {
      const shows = data.results;
      console.log(shows);
      return shows.map((show) => {
        return (
          <article className="relative flex flex-col bg-dark-theme-light">
            <div className="absolute right-0 w-8 h-8 -mt-3 -mr-1 bg-white rounded-full">
              <span
                className="flex justify-center w-full h-full rounded"
                role="button"
                aria-pressed="false"
                aria-label="Bookmark"
              >
                <svg
                  className="self-center"
                  height="24"
                  viewBox="0 0 24 24"
                  width="24"
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13z" />
                </svg>
              </span>
            </div>
            <h3 className="my-2 text-base font-bold text-center text-dark-primary">
              {show.name}
            </h3>
            <ul className={cardStyles.genres}>
              <li>Action</li>
              <li>Military</li>
              <li>Fantasy</li>
            </ul>
            <div className="flex">
              <img
                className="poster"
                src={`https://image.tmdb.org/t/p/w154${show.poster_path}`}
                alt="poster"
              />
              <div className={cardStyles.showInformation}>
                <div className="uppercase text-dark-primary">mappa</div>
                <div className="text-gray-300 text-opacity-75 font-size-small">
                  Dec 6, 2020 at 9:10am CST
                </div>
                <div className="flex justify-around text-gray-300 text-opacity-75 font-size-small">
                  <span>Manga</span>
                  <span>24 eps × 24 min</span>
                </div>
                <div className="p-2 overflow-y-auto text-left h-42">
                  <p className="text-white font-size-small">{show.overview}</p>
                </div>
              </div>
            </div>
            <div className="flex px-8 py-1 border-t border-white footer border-opacity-10 justify-evenly">
              <div>icon</div>
              <div>icon</div>
              <div>icon</div>
              <div>icon</div>
              <div>icon</div>
            </div>
          </article>
        );
      });
    }
    return "<ul></ul>";
  };

  return (
    <main className={cardStyles.cardGrid} role="main">
      <CardList></CardList>
    </main>
  );
};

export default CardGrid;
