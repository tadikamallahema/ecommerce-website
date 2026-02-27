import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
interface Admin{
    name:string;
    email:string;
    password:string;
}
const AdminLogin = () => {
    const [form,setForm]=useState<Admin>({
        name:'',
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
        e.preventDefault();
        try{
            const res= await axios.post("http://localhost:2007/api/alog",form,
            {
                withCredentials:true
            });
        alert('Admin Logged in successfully');
        console.log(res.data);
        navigate('/admin');
        }catch(err:any){
            alert(err.message);
        }
    }
  return (
    <div>
        <h3>Admin Login Page</h3>
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

export default AdminLogin
