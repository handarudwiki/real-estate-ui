import React, { useContext, useEffect, useState } from "react";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import apiRequest from "../../lib/api_request";
import { AuthContext } from "../../../context/AuthContext.jsx";



export default function Login() {
  const{currentUser, updateUser} = useContext(AuthContext)
  

  const location = useLocation();
  const message = location.state?.message

  const navigate = useNavigate()

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("")
  const [isloading,setIsLoading] = useState(false)


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("test")

    try {
      const res = await apiRequest.post('/login', {
        username,
        password
      })
      updateUser(res.data)
      navigate("/")
    } catch (error) {
      setError(error.response.data.message)
    }finally{
      setIsLoading(false);
    }
  };
  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Welcome Back</h1>
          { message &&  <p>{message}</p>}
          <input
            type="text"
            name="username"
            id="username"
            placeholder="input username"
            required
            onChange={(e)=>setUsername(e.target.value)} 
            value={username}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="input password"
            required
            onChange={(e)=>setPassword(e.target.value)}
            value={password}
          />
          <button disabled={isloading}>Login</button>
          {error && <span className="">{error}</span>}
          <Link to="/register">{"Don't"} you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}
