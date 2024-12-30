import React, { useEffect, useState } from "react";
import axios from "axios";
// import { Link } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [modal, setModal]=useState(false);

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/users`).then((res) => {
      // console.log(res);
      setUsers(res.data);
    });
  }, []);

  return (
    <div>
      <h2>user List</h2>
      {users.map((user) => (
        <div className="userCard">
        {/*  <Link to={`/users/${user.id}`} className="userCard" key={user.id}>
           {user.name}
          </Link> */}
          <div className="active" onClick={()=>{setModal(!modal)}}>{user.name}</div>
        </div>
      ))}
      {
        modal===true ? <Modal users={users}/> : null
      }
    </div>
  );
};

function Modal({users}){
  return(
    <div className="modal">
      <h4>{users.name}</h4>
      <p>이메일:{users.name} </p>
      <p>핸드폰: </p>
      <p>웹사이트: </p>
    </div>
  )
}
export default Users;
