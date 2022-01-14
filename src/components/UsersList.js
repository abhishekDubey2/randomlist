import React,{useState} from 'react';
import { USERS_PER_PAGE } from '../utils/constants';
import User from './User';

const Users = ({ users, page }) => {
  const [searchUser, setSearchUser] = useState("");
  const startIndex = (page - 1) * USERS_PER_PAGE;

  const newData = users.filter(item => {
    return item.login.username.toLowerCase().includes((searchUser).toLowerCase())
  });

  const handleSearchInput = event => {
    setSearchUser(event.target.value);
  }
  const selectedUsers = newData.slice(startIndex, startIndex + USERS_PER_PAGE);
  return (
    <React.Fragment>  
      <div className="block bcg-black">
      <div className='search-title'>
        <h3>Search by Username : </h3>
        <input
        type="text"
        autoFocus={true}
        placeholder="search users"
        onChange={handleSearchInput}
      />
    </div>
      </div>
      {selectedUsers.map(user => (
        <User key={user.login.uuid} {...user} />
      ))}
    </React.Fragment>
  );
};

export default Users;