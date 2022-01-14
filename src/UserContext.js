import { createContext, useState, useEffect, useRef } from "react";
import { USERS_PER_PAGE } from './utils/constants';
import axios from 'axios';
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
      if (performance.navigation.type === 1 && prevUser) {
        setUsers(prevUser);
      } else {
        setIsLoading(true);
      axios
        .get('https://randomuser.me/api/?page=1&results=50&seed=abc')
        .then(response => {
          const result = response.data.results;
          setUsers(result);
          setTotalPages(Math.ceil(result.length / USERS_PER_PAGE));
          setIsLoading(false);
        });
      }
    }, []);
    const  usePrevious = (value) => {
      // The ref object is a generic container whose current property is mutable ...
      // ... and can hold any value, similar to an instance property on a class
      const ref = useRef();
      // Store current value in ref
      useEffect(() => {
        ref.current = value;
      }, [value]); // Only re-run if value changes
      // Return previous value (happens before update in useEffect above)
      return ref.current;
    }
    const prevUser = usePrevious(users);
    const handleClick = number => {
      setPage(number);
    };

  return (
    <UserContext.Provider
      value={{
        users,
        page,
        totalPages,
        isLoading,
        setIsLoading,
        handleClick
      }}
    >
      {children}
    </UserContext.Provider>
  );
};