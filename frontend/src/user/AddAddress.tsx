import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddAddress = () => {

  const navigate = useNavigate();

  const [form,setForm] = useState({
    full_name:"",
    phone:"",
    address_line:"",
    city:"",
    state:"",
    pincode:""
  });

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setForm({
      ...form,
      [e.target.name]:e.target.value
    });
  };

  const handleSubmit = async (e:React.FormEvent)=>{
    e.preventDefault();

    try{

      await axios.post(
        "http://localhost:2007/api/address/addaddress",
        form,
        {withCredentials:true}
      );

      alert("Address added successfully");

      navigate("/user/checkout");

    }catch(err:any){
      alert(err.response?.data?.message || "Failed to add address");
    }

  };

  return (

    <div
      style={{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        height:"90vh",
        background:"#f5f5f5"
      }}
    >

      <form
        onSubmit={handleSubmit}
        style={{
          background:"#fff",
          padding:"30px",
          borderRadius:"10px",
          maxWidth:"400px",
          width:"100%",
          boxShadow:"0 5px 20px rgba(0,0,0,0.1)"
        }}
      >

        <h2>Add Delivery Address</h2>

        <input
          name="full_name"
          placeholder="Full Name"
          value={form.full_name}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          name="address_line"
          placeholder="Address Line"
          value={form.address_line}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          name="city"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          name="state"
          placeholder="State"
          value={form.state}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          name="pincode"
          placeholder="Pincode"
          value={form.pincode}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <button
          type="submit"
          style={{
            width:"100%",
            padding:"12px",
            marginTop:"10px",
            background:"#ff3d3d",
            border:"none",
            color:"#fff",
            borderRadius:"6px",
            cursor:"pointer"
          }}
        >
          Save Address
        </button>

      </form>

    </div>

  );
};

const inputStyle = {
  width:"100%",
  padding:"10px",
  marginTop:"10px",
  borderRadius:"5px",
  border:"1px solid #ddd"
};

export default AddAddress;