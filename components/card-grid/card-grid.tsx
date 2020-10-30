import React from "react";
import cardStyles from "./card-grid.module.scss";

const CardGrid: React.FC = () => {
  return (
    <main className={cardStyles.cardGrid} role="main">
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
          Attack on Titan: Final Season
        </h3>
        <ul className={cardStyles.genres}>
          <li>Action</li>
          <li>Military</li>
          <li>Fantasy</li>
        </ul>
        <div className="flex">
          <img
            className="poster"
            src="https://u.livechart.me/anime/2478/poster_image/f4518e517e6a56b52973852f67635e38.jpg?style=small&format=jpg"
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
              <p className="text-white font-size-small">
                Gol D. Roger was known as the Pirate King, the strongest and
                most infamous being to have sailed the Grand Line. The capture
                and death of Roger by the World Government brought a change
                throughout the world. His last words before his death revealed
                the location of the greatest treasure in the world, One Piece.
                It was this revelation that brought about the Grand Age of
                Pirates, men who dreamed of finding One Piece (which promises an
                unlimited amount of riches and fame), and quite possibly the
                most coveted of titles for the person who found it, the title of
                the Pirate King. Enter Monkey D. Luffy, a 17-year-old boy that
                defies your standard definition of a pirate. Rather than the
                popular persona of a wicked, hardened, toothless pirate who
                ransacks villages for fun, Luffy’s reason for being a pirate is
                one of pure wonder; the thought of an exciting adventure and
                meeting new and intriguing people, along with finding One Piece,
                are his reasons of becoming a pirate. Following in the footsteps
                of his childhood hero, Luffy and his crew travel across the
                Grand Line, experiencing crazy adventures, unveiling dark
                mysteries and battling strong enemies, all in order to reach One
                Piece. [Source: MyAnimeList]
              </p>
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
    </main>
  );
};

export default CardGrid;
