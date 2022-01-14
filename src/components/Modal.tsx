import * as React from 'react';
import { useContext } from 'react';
import { UserContext } from './User';

export const Modal = () => {
  const { randomPerson, handleClick
    } = useContext(UserContext);
  return (
    <div className="modal">
       <button className='btn' onClick={handleClick}>X</button>
      <img
        src={(randomPerson && randomPerson.large)}
        alt="random user"
        className="user-img"
      />
      <div className="user">
      <p>
        <strong>Name:</strong> {randomPerson.name}
      </p>
      <p>
        <strong>Gender:</strong> {randomPerson.gender}
      </p>
      <p>
        <strong>Email:</strong> {randomPerson.email}
      </p>
      <p>
        <strong>Phone:</strong> {randomPerson.phone}
      </p>
      <hr />
    </div>
    </div>
  );
};
