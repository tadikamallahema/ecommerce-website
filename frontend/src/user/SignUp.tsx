/* import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

interface User{
    name:string;
    phone_number:string;
    email:string;
    password:string;
}
const SignUp = () => {
    const [form,setForm]=useState<User>({
        name:'',
        phone_number:'',
        email:'',
        password:''
    })
    const navigate=useNavigate();
    /* React.ChangeEvent<HTMLInputElement>  - used for safe type conversion 
    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setForm(prev=>({
            ...prev,
            [e.target.name]:e.target.value
        }));
    }
    const handleSubmit=async(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        try{
           const res= await axios.post("http://localhost:2007/api/register",form);
           
           alert("SignUp successful");
           console.log(res.data);
           navigate('/login');
        }catch(err:any){
            alert(err.response?.data?.message);
            //console.log(err.message);
        }
    }
  return (
    <div>
        <Navbar/>
      <h3> SignUp page</h3>
      <form onSubmit={handleSubmit}>
        <div>
            <label>Enter name: </label>
            <input type='text' name='name' value={form.name} onChange={handleChange} required/>
        </div>
        <div>
            <label>Enter PhoneNumber: </label>
            <input type='text' name='phone_number' value={form.phone_number} onChange={handleChange} maxLength={10} required />
        </div>
        <div>
            <label>Enter Email: </label>
            <input type='text' name='email'value={form.email} onChange={handleChange} required/>
        </div>
        <div>
            <label>Enter password: </label>
            <input type='password' name='password' value={form.password} onChange={handleChange} required />
        </div>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default SignUp
 */

import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import './auth.css';
interface User {
  name: string;
  phone_number: string;
  email: string;
  password: string;
}

const SignUp = () => {
  const [form, setForm] = useState<User>({
    name: "",
    phone_number: "",
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
        "http://localhost:2007/api/register",
        form
      );

      alert("Registration Successful");
      console.log(res.data);
      navigate("/login");
    } catch (err: any) {
      alert(err.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="auth-container">
        <h2>Register</h2>

        <form onSubmit={handleSubmit}>
          <div>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Phone Number</label>
            <input
              type="text"
              name="phone_number"
              value={form.phone_number}
              onChange={handleChange}
              maxLength={10}
              required
            />
          </div>

          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              required
              onChange={handleChange}
              minLength={6}
            />
          </div>
          <p style={{ fontSize: "14px", marginTop: "10px" }}>
        Already have an account?{" "}
        <Link to="/login" style={{ color: "#F86F03", fontWeight: "bold" }}>
            Login
        </Link>
        </p>

          <button type="submit" disabled={loading}>
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>
      </div>
    </>
  );
};

export default SignUp;