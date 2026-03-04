import axios from 'axios';
import React, { useState } from 'react'
import VendorDashboard from './VendorDashboard';

interface Vendor{
    name:string;
    email:string;
    phone_number:string,
    password:string;
    business_name:string;
    business_type:string
}
const VRegister = () => {
    const [form,setForm]=useState<Vendor>({
        name:'',
        email:'',
        phone_number:'',
        password:'',
        business_name:'',
        business_type:''
    });
    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
            setForm(prev=>({
                ...prev,
                [e.target.name]:e.target.value
            }));
        }
    const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        try{
            const res=await axios.post("http://localhost:2007/api/vregister",form);
        alert('Vendor Registered Successfully');
        console.log(res.data);
        
        }catch(err:any){
            alert(err.message);
        }
    }
  return (
    <>
         <VendorDashboard/>
    <div className="auth-container">
        <h3>Vendor Signup Page </h3>
       <form onSubmit={handleSubmit}>
        <div>
            <label>Enter name: </label>
            <input type='text' name='name' value={form.name} onChange={handleChange} required/>
        </div>
        <div>
            <label>Enter Email: </label>
            <input type='text' name='email'value={form.email} onChange={handleChange} required/>
        </div>
        <div>
            <label>Enter PhoneNumber: </label>
            <input type='text' name='phone_number' value={form.phone_number} onChange={handleChange} maxLength={10} required />
        </div>
        <div>
            <label>Enter password: </label>
            <input type='password' name='password' value={form.password} onChange={handleChange} required />
        </div>
        <div>
            <label>Enter Business Name: </label>
            <input type='text' name='business_name' value={form.business_name} onChange={handleChange} required />
        </div>
        <div>
            <label>Enter Business Type: </label>
            <input type='text' name='business_type' value={form.business_type} onChange={handleChange} required />
        </div>
        <button type='submit'>Submit</button>
      </form>
    </div>
    </>
  )
}

export default VRegister
