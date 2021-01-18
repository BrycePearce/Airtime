import React from "react";
import axiosInstance from "../../lib/axios";
import { useQuery } from "react-query";
import type { Show } from "../../db/entity";
import Card from "./show/Card";
import tw, { styled } from "twin.macro";

const ShowWrapper = styled.main`
  ${tw`grid gap-10 p-4`}
  grid-template-columns: repeat(auto-fill, minmax(24rem, 1fr));
  margin: 0 5vw;
`;
const Shows = () => {
  const { isLoading, data } = useQuery("shows", async () => {
    const { data } = await axiosInstance.get("api/hello");
    data.shows = data.shows.slice(0, 10);
    return data.shows as Show[];
  });

  return (
    <ShowWrapper>
      {isLoading
        ? "Loading..."
        : data.map((show, index) => <Card show={show} key={index} />)}
    </ShowWrapper>
  );
};

export default Shows;
