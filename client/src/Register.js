import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const postData = async (e) => {
    e.preventDefault();

    const { name, email, password, cpassword } = user;

    const resp = await fetch("http://localhost:3000", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        cpassword,
      }),
    });

    const data = await resp.json();

    if (resp.status === 422 || !data) {
      window.alert("Invalid Registration");
    } else if (resp.status === 201) {
      window.alert("Registration Successful");
      navigate('/login');
    } else if (resp.status === 409) {
      window.alert("Email already exists");
    } else if (resp.status === 401) {
      window.alert("Password and confirm password don't match");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" , backgroundColor:"aqua" }}>
      <h1 className="text-center mt-4" style={{ marginBottom: "20px" }}>Sign Up</h1>

      <div className="container" style={{ width: "50%", margin: "0 auto" }}>
        <form method="POST">
          <div style={{ marginBottom: "1rem" }}>
            <label>Your Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={user.name}
              onChange={handleInputs}
              placeholder="Enter your Name"
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label>Email address</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={user.email}
              onChange={handleInputs}
              placeholder="Enter your email"
            />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={user.password}
              onChange={handleInputs}
              placeholder="Enter your password"
            />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label>Confirm Password</label>
            <input
              type="password"
              name="cpassword"
              className="form-control"
              value={user.cpassword}
              onChange={handleInputs}
              placeholder="Re-enter password"
            />
          </div>

          <div>
            <button
              type="submit"
              onClick={postData}
              className="btn btn-primary m-4"
              style={{ backgroundColor: "green", color: "white" }}
            >
              Register
            </button>
          </div>
          <p>Already Registered?</p>
          <div>
            <button
              className="btn btn-primary m-4"
              onClick={() => navigate('/login')}
              style={{ backgroundColor: "green", color: "white" }}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
