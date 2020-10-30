import React from "react";

// Components
import Header from "./header/header";
import Meta from "./meta";

const Layout: React.FC = (props) => {
  return (
    <>
      <Meta />
      <Header />
      <div className="header-margin">{props.children}</div>
    </>
  );
};

export default Layout;
