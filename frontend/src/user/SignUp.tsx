import axios from 'axios';
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
    /* React.ChangeEvent<HTMLInputElement>  - used for safe type conversion */
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
