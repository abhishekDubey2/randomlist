import { useState, useEffect, createContext } from "react";
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
} from "react-icons/fa";
import dateFormat from "dateformat";
import { Modal } from "./Modal.tsx";
import { ReactDimmer } from "react-dimmer";
export const UserContext = createContext();
export const User = (props) => {
  const defaultImage = "https://randomuser.me/api/portraits/men/23.jpg";
  const [randomPerson, setRandomPerson] = useState(null);
  const [title, setTitle] = useState("name");
  const [value, setValue] = useState("random person");

  const [isModalOpen, setModal] = useState(false);

  const handleClick = () => {
    setModal((prevState) => !prevState);
  };
  useEffect(() => {
    const {
      phone,
      email,
      gender,
      login: { username },
      name: { first, last },
      dob: { date },
      picture: { large, thumbnail },
      location: {
        street: { number, name },
        city,
        country,
        postcode,
      },
    } = props;
    const newPerson = {
      large,
      thumbnail,
      gender,
      phone,
      email,
      username,
      dob: `${date}`,
      address: `${number}, ${name}, ${city}, ${country}, ${postcode}`,
      name: `${first} ${last}`,
    };
    setRandomPerson(newPerson);
    setTitle("Username");
    setValue(newPerson.username);
  }, [props]);

  const handleValue = (e) => {
    if (e.target.classList.contains("icon")) {
      const newValue = e.target.dataset.id;
      if (newValue === "dob") {
        return setValue(dateFormat(randomPerson[newValue], "dd/mm/yyyy"));
      }
      if (newValue === "phone") {
        return setValue(randomPerson[newValue].split("-").join(" "));
      }
      setTitle(newValue);
      setValue(randomPerson[newValue]);
    }
  };
  return (
    <div className="container" onClick={handleClick}>
      <img
        src={(randomPerson && randomPerson.thumbnail) || defaultImage}
        alt="random user"
        className="user-img"
      />
      <p className="user-name">{randomPerson ? randomPerson.name : ""}</p>
      <div className="detail">
        <div className="user-msg">
          <p className="user-title">my {title} is</p>
          <p className="user-value - ">{value}</p>
        </div>

        <div className="values-list">
          <button className="icon" data-id="username" onMouseOver={handleValue}>
            <FaUser />
          </button>
          <button className="icon" data-id="email" onMouseOver={handleValue}>
            <FaEnvelopeOpen />
          </button>
          <button className="icon" data-id="dob" onMouseOver={handleValue}>
            <FaCalendarTimes />
          </button>
          <button className="icon" data-id="address" onMouseOver={handleValue}>
            <FaMap />
          </button>
          <button className="icon" data-id="phone" onMouseOver={handleValue}>
            <FaPhone />
          </button>
          <UserContext.Provider
            value={{
              randomPerson,
            }}
          >
            {isModalOpen && <Modal handleClick={handleClick} />}
          </UserContext.Provider>

          <ReactDimmer
            isOpen={isModalOpen}
            exitDimmer={setModal}
            zIndex={100}
            blur={1.5}
          />
        </div>
      </div>
    </div>
  );
};

export default User;
