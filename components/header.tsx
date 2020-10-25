import React from "react";

const Header: React.FC = () => {
  return (
    <header className="flex bg-gray-200 h-16 items-center justify-between fixed w-full">
      <button
        type="button"
        className="flex justify-center items-center h-full w-16"
      >
        <svg className="fill-current w-6 h-6" viewBox="0 0 20 20">
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
        </svg>
      </button>
      <a className="text-xl">Airtime</a>
      <nav className="h-full ml-16">
        <ul className="flex h-full">
          <li className="flex mx-4 relative active">
            <a className="h-full inline-flex items-center">Browse</a>
          </li>
          <li className="flex mx-4 relative">
            <a className="h-full inline-flex items-center">Seasons</a>
          </li>
          <li className="flex mx-4 relative">
            <a className="h-full inline-flex items-center">Schedule</a>
          </li>
          <li className="flex mx-4 relative">
            <a className="h-full inline-flex items-center">Headlines</a>
          </li>
          <li className="flex mx-4 relative">
            <a className="h-full inline-flex items-center">Videos</a>
          </li>
        </ul>
      </nav>
      <div className="flex justify-between h-full ml-auto">
        <button type="button" className="flex justify-center items-center w-16">
          <svg viewBox="0 0 24 24" fill="black" width="24px" height="24px">
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
          </svg>
        </button>
        <button type="button" className="flex justify-center items-center w-16">
          <svg height="24" viewBox="0 0 24 24" width="24">
            <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
          </svg>
        </button>
        <button type="button" className="flex justify-center items-center w-16">
          <svg height="24" viewBox="0 0 24 24" width="24">
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
