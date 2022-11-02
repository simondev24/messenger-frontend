import React from 'react'
import { useState, useEffect } from "react";
import axios from 'axios';
import './Dashboard.css';

const apiAddress = 'http://localhost:4000';

export default function Dashboard() {
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [conversations, setConversations] = useState([]);

    useEffect(() => {
      fetchUsers();
    }, []);

    const fetchUsers = () => {
      axios
        .get(apiAddress + '/conversation/all')
        .then((res) => {
          console.log(res);
          setConversations(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    let handleSubmit = async (e: any) => {
      e.preventDefault();
      try {
        let res = await fetch(apiAddress + "/user", {
          method: "POST",
          headers: {
            Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
        },
          body: JSON.stringify({
            
          }),
        });
        let resJson = await res.json();
        
      } catch (err) {
        console.log(err);
      }
    };
  
  return (
    <div className="container user-dashboard">
      <h1>User Dashboard</h1>
      <h3>Last conversations</h3>
      <div id="row conversations">
          {conversations.map((conversations: any) => (
            <div className='col-md-12 card'>
              <p>{conversations.id }</p>
              <p>{conversations.name}</p>
            </div>
          ))}
      </div>
    </div>
  );
}