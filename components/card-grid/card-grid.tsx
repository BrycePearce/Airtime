import React, { useEffect, useState } from "react";
import cardStyles from "./card-grid.module.scss";
import axiosInstance from "../../lib/axios";
import { Show } from "../../db/entity";

import tw, { css } from "twin.macro";

const CardGrid: React.FC = () => {
  const [shows, setData] = useState<Show[]>([]);

  useEffect(() => {
    const setCardData = async () => {
      const { data } = await axiosInstance.get("api/hello");
      setData(data);
    };
    setCardData();
  }, []);

  return (
    <main className={cardStyles.cardGrid} role="main">
      Howdy
    </main>
  );
};

export default CardGrid;
