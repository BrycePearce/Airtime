import React from "react";

// Components
import CardGrid from "./card-grid/card-grid";
import Header from "./header/header";
import Meta from "./meta";

const Layout: React.FC = () => {
  return (
    <>
      <Meta />
      <Header />
      <CardGrid />
    </>
  );
};

export default Layout;
