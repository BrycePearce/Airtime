import React from "react";
import cardStyles from "./card-grid.module.scss";

const CardGrid: React.FC = () => {
  return (
    <section className={cardStyles.cardGrid}>
      <article className="relative flex direction flex-col bg-dark-theme-light">
        Howdy
      </article>
    </section>
  );
};

export default CardGrid;
