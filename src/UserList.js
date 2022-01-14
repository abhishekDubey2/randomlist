import { useState, useEffect } from "react";
import RandomUser from "./RandomUser";
import Pagination from "@material-ui/lab/Pagination";

const UserList = () => {
  const [users, setUserList] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

//pagination
const [page, setPage] = useState(1);
const [count, setCount] = useState(0);
const [pageSize, setPageSize] = useState(3);
const [currentTutorial, setCurrentTutorial] = useState(null);

const pageSizes = [3, 6, 9];

  const fetchUsers = async () => {
    try {
      await fetch("https://randomuser.me/api/?page=3&results=10&seed=abc")//https://randomuser.me/api/?page=1&results=10&seed=abc
        .then((results) => {
          return results.json();
        })
        .then((data) => {
          let users = data.results;
          let info = data.info;
          console.log(info);
          setUserList(users);
          setPage(Math.ceil(users.length / 4));
          setLoading(false);
        });
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    setLoading(true);
    fetchUsers();
  }, [page, pageSize]);

//pagination
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setPage(1);
  };



  if (error) {
    return <p>{error.message}</p>;
  }

  

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <main>
      <div className="block bcg-black">
      {"Items per Page: "}
          <select onChange={handlePageSizeChange} value={pageSize}>
            {pageSizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
     { <Pagination
            className="my-3"
            count={count}
            page={page}
            siblingCount={1}
            boundaryCount={1}
            variant="outlined"
            shape="rounded"
            onChange={handlePageChange}
          />}
      </div>
      <div className="block">
        {users
          ? users.map((user, key) => {
              return <RandomUser key={key} person={user} />;
            })
          : null}
      </div>
    </main>
  );
};

export default UserList;
