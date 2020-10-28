import React from "react";

// Components
import Header from "./header/header";
import Meta from "./meta";

const Layout: React.FC = (props) => {
  return (
    <>
      <Meta />
      <Header />
      <div style={{marginTop: '4rem'}}>
        {props.children}
      </div>
    </>
  );
};

export default Layout;