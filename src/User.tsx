import React from 'react'
import { useState, useEffect } from "react";
import axios from 'axios';
import './User.css';

const apiAddress = 'http://localhost:4000';

export default function User() {
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [users, setUsers] = useState([]);

    useEffect(() => {
      fetchUsers();
    }, []);

    const fetchUsers = () => {
      axios
        .get(apiAddress + '/user/all')
        .then((res) => {
          console.log(res);
          setUsers(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    let handleSubmit = async (e: any) => {
      e.preventDefault();
      try {
        let res = await fetch(apiAddress + "/user/register", {
          method: "POST",
          headers: {
            Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
        },
          body: JSON.stringify({
            name: name,
            password: password,
            email: email,
          }),
        });
        let resJson = await res.json();
        if (res.status === 200) {
          setName("");
          setEmail("");
          setPassword("");
          setMessage("User created successfully");
          fetchUsers();
        } else {
          setMessage("Some error occured ");
        }
      } catch (err) {
        console.log(err);
      }
    };
  
  return (
    <div className="user-registration">
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <h1>Register account</h1>
          </div>
          <div className='form-group'>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={name}
                placeholder="name"
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                value={password}
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="text"
                value={email}
                placeholder="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <button className='btn btn-info' type="submit">Create</button>

              <div className="message">{message ? <p>{message}</p> : null}</div>
            </form>
          </div>
        </div>
      </div>
      
      <div id="users">
          {users.map((user: any) => (
            <div className='card'>
              <p>{user.id }</p>
              <p>{user.name}</p>
              <p>{user.email}</p>
            </div>
          ))}
      </div>
    </div>
  );
}