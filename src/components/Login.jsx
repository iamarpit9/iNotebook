import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import "./Styling/Form.css";


const Login = () => {
  const host = "http://localhost:5000";
  
  let navigate = useNavigate();

  const [credentials, setCredentials] = useState({email: "", password:""})

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password }),
    });

    const json = await response.json();
    if(json.success){
        // Save the auth token and redirect
        localStorage.setItem("token", json.authToken);
        navigate("/");

    }else{
        alert("Invalid Credentials");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
          />
        </div>

        <button className="btn" type="submit"> Login </button>
      </form>
    </div>
  );
};

export default Login;
