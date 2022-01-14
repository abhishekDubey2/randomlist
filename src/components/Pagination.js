import React,{useContext} from 'react';
import '../App.css'
import { UserContext } from "../UserContext";
const Pagination = () => {
  const {
    page,
    totalPages,
    handleClick,
  } = useContext(UserContext);

  const pages = [...Array(totalPages).keys()].map(number => number + 1);

  return (
    <div className="numbers">
      {pages.map(number => (
        <a
          key={number}
          href="/#"
          onClick={() => handleClick(number)}
          className={`${page === number && 'active'}`}
        >
          {number}
        </a>
      ))}
    </div>
  );
};

export default Pagination;
