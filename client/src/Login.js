import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();

    const res = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    });

    const response = await res.json();
    console.log(response);
    localStorage.setItem("token", response.token);

    if (res.status === 201) {
      window.alert("Login successful");
      navigate('/userProfile');
    } else if (res.status === 400 || !response) {
      window.alert("Invalid credentials");
    }
  };

  return (
    <div style={{ backgroundColor: "aqua" }}>
      <h1 style={{ textAlign: "center", marginTop: "4rem", backgroundColor: "aqua" }}>Sign In</h1>

      <div style={{ margin: "0 auto", width: "50%" }}>
        <form>
          <div style={{ marginBottom: "1rem" }}>
            <label>Email address</label>
            <input
              type="email"
              style={{ width: "100%" }}
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label>Password</label>
            <input
              type="password"
              style={{ width: "100%" }}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div style={{ textAlign: "center" }}>
            <button
              type="submit"
              style={{ backgroundColor: "#007bff", color: "#fff", margin: "1rem" }}
              onClick={loginUser}
            >
              Sign in
            </button>
          </div>
          <div style={{ textAlign: "center" }}>
            <p>New User?</p>
            <button
              style={{ backgroundColor: "#007bff", color: "#fff", margin: "1rem" }}
              onClick={() => navigate('/')}
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
