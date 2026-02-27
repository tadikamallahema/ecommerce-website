import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.tsx"
import SignUp from "./user/SignUp.tsx";
import Login from "./user/Login.tsx";
import LoginV from './vendor/LoginV.tsx';
import VRegister from "./vendor/VRegister.tsx";
import AdminLogin from "./admin/AdminLogin.tsx";
import Home from "./user/Home.tsx";
import ProtectedRoutes from "./components/ProtectedRoutes.tsx";
import ApproveVendor from "./admin/ApproveVendor.tsx";
import AdminDashboard from "./admin/AdminDashboard.tsx";
import ManageCategories from "./admin/ManageCategories.tsx";
import GetAllProducts from "./admin/GetAllProducts.tsx";
import ApproveProduct from "./admin/ApproveProduct.tsx";
import CreateCategory from "./admin/CreateCategory.tsx";

function App() {
  
  return (
    <>
    <ManageCategories/>
      {/*
    <CreateCategory/>
    <GetAllProducts/>
    <ApproveProduct/>
      <AdminDashboard/>
      <ApproveProduct/>
      <h1>Hello is my APP.jsx working?</h1> <Navbar/> */}
     {/*  <SignUp/> */}
     
    </>
  )
}

export default App
/**
  <Routes>
        <Route path="/register" element={<SignUp/>}/>
        <Route path="/login" element={<Login/>}/>
        {/* <Route path="/home" element={
          <ProtectedRoutes>
            <Home/>
          </ProtectedRoutes>
        }/> 
        <Route path="/vendor/login" element={<LoginV/>}/>
        <Route path="/vendor/register" element={<VRegister/>}/>
        <Route path="/admin/login" element={<AdminLogin/>}/>
        <Route path="/adminv/verify" element={<ApproveVendor/>}/>
        <Route path="/admin/verifyprod" element={<ApproveProduct/>}/>
        <Route path="/admin/manageCategories" element={<ManageCategories/>}/>
        <Route path="/admin/getAllProducts" element={<GetAllProducts/>}/>
      </Routes>
 */