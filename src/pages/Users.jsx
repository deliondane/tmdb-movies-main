import React, { useState, useEffect } from "react";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null); //클릭한 사용자 정보 저장

  const userInfo = (info) => {
    setSelectedUser(info);
  };

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/users`).then((response) => {
      setUsers(response.data);
    });
  }, []);

  return (
    <div className="users">
      <h2>User List</h2>
      {users.map((user) => (
        <div
          className="userCard"
          onClick={(e) => {
            e.stopPropagation();
            userInfo(user);
          }}
        >
          {/* <Link to={`/users/${user.id}`}>{user.name}</Link> */}
          <div>
            <div
              className="active"
              style={{marginBottom: "20px", display: "inline-block", fontSize: "16px", cursor: "pointer"}}
              onClick={() => {
                setModal(!modal);
              }}
            >
              {user.name}
            </div>
          </div>
        </div>
      ))}
      {modal === true ? <Modal userInfo={selectedUser} /> : null}
    </div>
  );
};

function Modal({ userInfo }) {
  return (
    <div className="modal">
      <p className="ti">{userInfo.username}</p>
      <p>name | {userInfo.name}</p>
      <p>phone | {userInfo.phone}</p>
      <p>email | {userInfo.email}</p>
      <p>web | {userInfo.website}</p>
      <p>zipcode | {userInfo.address.zipcode}</p>
      <p>company | {userInfo.company.name}</p>
    </div>
  );
}
export default Users;
