import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./auth.css"; // paste your CSS here

const Auth = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [registerForm, setRegisterForm] = useState({
    name: "",
    phone_number: "",
    email: "",
    password: "",
  });

  // Handle Login Change
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Register Change
  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterForm({
      ...registerForm,
      [e.target.name]: e.target.value,
    });
  };

  // LOGIN
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:2007/api/login",
        loginForm,
        { withCredentials: true }
      );

      alert("Login Successful");
      console.log(res.data);
      navigate("/user");
    } catch (err: any) {
      alert(err.response?.data?.message || "Login Failed");
    }
  };

  // REGISTER
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:2007/api/register",
        registerForm
      );

      alert("Registration Successful");
      console.log(res.data);
      setIsSignUp(false);
    } catch (err: any) {
      alert(err.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className={`container ${isSignUp ? "sign-up-mode" : ""}`}>
      <div className="forms-container">
        <div className="signin-signup">
          
          {/* LOGIN FORM */}
          <form onSubmit={handleLoginSubmit} className="sign-in-form">
            <h2 className="title">Sign in</h2>

            <div className="input-field">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={loginForm.email}
                onChange={handleLoginChange}
                required
              />
            </div>

            <div className="input-field">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={loginForm.password}
                onChange={handleLoginChange}
                required
              />
            </div>

            <input type="submit" value="Login" className="btn solid" />
          </form>

          {/* REGISTER FORM */}
          <form onSubmit={handleRegisterSubmit} className="sign-up-form">
            <h2 className="title">Sign up</h2>

            <div className="input-field">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={registerForm.name}
                onChange={handleRegisterChange}
                required
              />
            </div>

            <div className="input-field">
              <input
                type="text"
                name="phone_number"
                placeholder="Phone Number"
                value={registerForm.phone_number}
                onChange={handleRegisterChange}
                maxLength={10}
                required
              />
            </div>

            <div className="input-field">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={registerForm.email}
                onChange={handleRegisterChange}
                required
              />
            </div>

            <div className="input-field">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={registerForm.password}
                onChange={handleRegisterChange}
                required
              />
            </div>

            <input type="submit" className="btn" value="Sign up" />
          </form>
        </div>
      </div>

      {/* PANELS */}
      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here?</h3>
            <p>Create an account to start shopping</p>
            <button
              className="btn transparent"
              onClick={() => setIsSignUp(true)}
            >
              Sign up
            </button>
          </div>
        </div>

        <div className="panel right-panel">
          <div className="content">
            <h3>Already have an account?</h3>
            <p>Login to continue</p>
            <button
              className="btn transparent"
              onClick={() => setIsSignUp(false)}
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;