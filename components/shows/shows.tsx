import React from "react";
import axiosInstance from "../../lib/axios";
import { useQuery } from "react-query";
import { Show } from "../../db/entity";
import Card from "./show/Card";

const Shows = () => {
  const { isLoading, data } = useQuery("shows", async () => {
    const { data } = await axiosInstance.get("api/hello");
    return data.shows as Show[];
  });

  return (
    <>
      {isLoading
        ? "Loading..."
        : data.map((show, index) => <Card show={show} key={index} />)}
    </>
  );
};

export default Shows;
