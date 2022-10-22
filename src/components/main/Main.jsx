import React, { useEffect, useState } from "react";
import mailSvg from "../../assets/mail.svg";
import manSvg from "../../assets/man.svg";
import womanSvg from "../../assets/woman.svg";
import manAgeSvg from "../../assets/growing-up-man.svg";
import womanAgeSvg from "../../assets/growing-up-woman.svg";
import mapSvg from "../../assets/map.svg";
import phoneSvg from "../../assets/phone.svg";
import padlockSvg from "../../assets/padlock.svg";
import cwSvg from "../../assets/cw.svg";
import Footer from "../footer/Footer";
import axios from "axios";

const url = "https://randomuser.me/api/";
const defaultImage = "https://randomuser.me/api/portraits/men/75.jpg";

const Main = () => {
  const [user, setUser] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [changeUser, setChangeUser] = useState([]);
  const [userAdd, setUserAdd] = useState([]);
  const userImg = user?.picture?.medium;

  const getUser = async () => {
    const { data } = await axios(url);
    setUser(data.results[0]);
  };
  console.log(user);
  useEffect(() => {
    getUser();
  }, []);

  const showName = (e) => {
    setTitle(e.target.name);
    setDescription(
      user.name.title + " " + user.name.first + " " + user.name.last
    );
  };
  const showEmail = (e) => {
    setTitle(e.target.name);
    setDescription(user.email);
  };
  const showAge = (e) => {
    setTitle(e.target.name);
    setDescription(user.dob.age);
  };
  const showMap = (e) => {
    setTitle(e.target.name);
    setDescription(
      user.location.street.number + " " + user.location.street.number
    );
  };
  const showPhone = (e) => {
    setTitle(e.target.name);
    setDescription(user.cell);
  };
  const showPassword = (e) => {
    setTitle(e.target.name);
    setDescription(user.login.password);
  };
  const add = () => {
    userAdd.includes(user) || setUserAdd([...userAdd, user]);
  };

  return (
    <main>
      <div className="block bcg-orange">
        <img src={cwSvg} alt="cw" id="cw" />
      </div>
      <div className="block">
        <div className="container">
          <img src={userImg} alt="random user" className="user-img" />
          <p className="user-title">My {title} is</p>
          <p className="user-value">{description}</p>
          <div className="values-list">
            <button className="icon" name="name" onClick={showName}>
              <img
                src={user?.gender == "female" ? womanSvg : manSvg}
                alt="user"
                id="iconImg"
                name="name"
              />
            </button>
            <button className="icon" name="email" onClick={showEmail}>
              <img src={mailSvg} alt="mail" id="iconImg" name="email" />
            </button>
            <button className="icon" name="age" onClick={showAge}>
              <img
                src={user?.gender == "female" ? womanAgeSvg : manAgeSvg}
                alt="age"
                id="iconImg"
                name="age"
              />
            </button>
            <button className="icon" name="street" onClick={showMap}>
              <img src={mapSvg} alt="map" id="iconImg" name="street" />
            </button>
            <button className="icon" name="phone" onClick={showPhone}>
              <img src={phoneSvg} alt="phone" id="iconImg" name="phone" />
            </button>
            <button className="icon" name="password" onClick={showPassword}>
              <img src={padlockSvg} alt="lock" id="iconImg" name="password" />
            </button>
          </div>
          <div className="btn-group">
            <button className="btn" type="button" onClick={getUser}>
              new user
            </button>
            <button className="btn" type="button" onClick={add}>
              add user
            </button>
          </div>

          <table className="table">
            <thead>
              <tr className="head-tr">
                <th className="th">Firstname</th>
                <th className="th">Email</th>
                <th className="th">Phone</th>
                <th className="th">Age</th>
              </tr>
            </thead>
            <tbody>
              {userAdd.map((item) => {
                return (
                  <tr key={item.id.value}>
                    <td>{item.name.first}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>{item.dob.age}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Footer />
      </div>
    </main>
  );
};

export default Main;
