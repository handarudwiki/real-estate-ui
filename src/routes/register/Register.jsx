import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.scss";
import axios from "axios";
import apiRequest from "../../lib/api_request";
import { AuthContext } from "../../../context/AuthContext";


export default function Register() {
  const {currentUser} = useContext(AuthContext)


  const [error, setError] = useState("");
  const [isloading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await apiRequest.post("/register", {
        username,
        password,
        email,
      });

      navigate("/login", {
        state: { message: "Regitration successful, please login" },
      });
    } catch (e) {
      console.log(e.response.data.message);
      setError(e.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="register">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Sign UP</h1>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="input username"
            required
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            value={username}
          />
          <input
            type="email"
            name="email"
            id="email"
            placeholder="input email"
            required
            onChange={(e)=>setEmail(e.target.value)}
            value={email}
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
          <button disabled={isloading}>Register</button>
          {error && <span className="">{error}</span>}
          <Link to="/login">Do you have an acount?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}
