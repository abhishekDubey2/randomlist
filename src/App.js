import Pagination from "./components/Pagination";
import UserList from "./components/UsersList";
import React, { useContext } from "react";
import { UserContext } from "./UserContext";

const App = () => {
  const {
    users,
    page,
    isLoading
  } = useContext(UserContext);

  return (
    <main>
     { isLoading ? (
        <div className="loading">Loading...</div>
      ) : (
        <React.Fragment>
          <div className="block">
            <UserList users={users} page={page} />
          </div>
          <Pagination
          />
        </React.Fragment>
      )}
    </main>
  );
};

export default App;
