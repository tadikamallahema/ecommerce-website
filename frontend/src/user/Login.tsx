/* import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

interface User{
    email:string;
    password:string;
}
const Login = () => {
    const [form,setForm]=useState<User>({
        email:'',
        password:''
    });
    const navigate=useNavigate();
    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setForm(prev=>({
            ...prev,
            [e.target.name]:e.target.value
        }))
    }
    const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault(); // used to stop the frequent refresh of the page 
        try{
            const res= await axios.post("http://localhost:2007/api/login",form,
                {
                    withCredentials:true //I want to send cookies along with this request
                });
            alert('Login Successfull');
            navigate('/user');
            console.log(res.data);
        }catch(err:any){
            alert(err.message);
            console.log(err);
        }
    }
  return (
    <div>
        <Navbar/>
      <h1> Login Page</h1>
      <form onSubmit={handleSubmit}>
        <div>
            <label>Enter Email:</label>
            <input type='text' name='email' value={form.email} onChange={handleChange} required/>
        </div>
        <div>
            <label>Enter password:</label>
                <input type='password' name='password' value={form.password} onChange={handleChange} required/>
        </div>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default Login
 */

import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import './auth.css';
interface User {
  email: string;
  password: string;
}

const Login = () => {
  const [form, setForm] = useState<User>({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:2007/api/login",
        form,
        { withCredentials: true }
      );

      alert("Login Successful");
      console.log(res.data);
      navigate("/user/profile",{ replace: true });
    } catch (err: any) {
      alert(err.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="auth-container">
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          <div>
            <label>Email</label>
            <input  type="email"  name="email"  value={form.email}  onChange={handleChange}  required/>
          </div>

          <div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <p style={{ fontSize: "14px", marginTop: "10px" }}>
            Don't have an account?{" "}
            <Link to="/register" style={{ color: "#F86F03", fontWeight: "bold" }}>
              Sign Up
            </Link>
          </p>

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;