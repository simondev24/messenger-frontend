import { useState, useEffect } from "react";
import './Dashboard.css';

const apiAddress = 'http://localhost:4000';

export default function Dashboard() {
    const [conversations, setConversations] = useState([]);
    
    useEffect(() => {
      console.log("use effect called");
      const fetchConversations = async () => {
        const conversations = getConversations();
      };
      fetchConversations();
    }, []);

    const getConversations = async () => {
      try {
        let res = await fetch(apiAddress + "/conversation/all", {
          method: "GET",
          headers: {
            Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Auth-token': `${sessionStorage.getItem("Auth-token")}`
        },
        });
        setConversations(await res.json());
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