import React from 'react'
import { useState, useEffect } from "react";
import axios from 'axios';
import './User.css';
import { useNavigate } from "react-router-dom"

const apiAddress = 'http://localhost:4000';

export default function User() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate()

    let handleSubmit = async (e: any) => {
      e.preventDefault();
      try {
        let res = await fetch(apiAddress + "/user/login", {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Auth-token': `${sessionStorage.getItem("Auth-token")}`
        },
          body: JSON.stringify({
            name: name,
            password: password
          }),
        });
        let resJson = await res.json();
        if (res.status === 404) {
          setMessage("User was not found!");
        } else if (res.status === 400) {
          setMessage("Ivalid credentials!");
        } else if (res.status === 201) {
          debugger;
          if (resJson['auth-token']) {
            sessionStorage.setItem("Auth-token", resJson['auth-token']);
            setMessage("Logged in");
            
          } else {
            setMessage(resJson['message']);
          }
          navigate('/dashboard');
        }
      } catch (err) {
        console.log(err);
      }
    };
  
  return (
    <div className="user-login">
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <h1>Sign in page</h1>
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
              <button className='btn btn-info' type="submit">Login</button>

              <div className="message">{message ? <p>{message}</p> : null}</div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}