import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

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
