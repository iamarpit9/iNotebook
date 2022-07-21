import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Styling/Form.css";


const Signup = () => {
  const host = "http://localhost:5000";

  let navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    confPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`${host}/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
          name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const json = await response.json();
    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem("token", json.authToken);
      navigate("/");
    } else {
      alert("Invalid Credentials");
    }
  };

   const onChange = (e) => {
     setCredentials({ ...credentials, [e.target.name]: e.target.value });
   };

  return (
    <div>
      <div className="container" style={{"height": "380px"}}>
        <h2>Signup</h2>
        <form onSubmit={handleSubmit}>
          <div className="inp">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={credentials.name}
              onChange={onChange}
            />
          </div>
          <div className="inp">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={credentials.email}
              onChange={onChange}
            />
          </div>
          <div className="inp">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={onChange}
              minLength={5}
              required
            />
          </div>
          <div className="inp">
            <label htmlFor="confPassword">Confirm Password</label>
            <input
              type="password"
              id="confPassword"
              name="confPassword"
              value={credentials.confPassword}
              onChange={onChange}
              minLength={5}
              required
            />
          </div>

          <button className="btn" type="submit">
            {" "}
            Signup{" "}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
