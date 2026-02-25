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

function App() {
  
  return (
    <>
      <h1>Hello is my APP.jsx working?</h1>
      {/* <Navbar/> */}
     {/*  <SignUp/> */}
      <Routes>
        <Route path="/register" element={<SignUp/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/home" element={
          <ProtectedRoutes>
            <Home/>
          </ProtectedRoutes>
        }/>
        <Route path="/vendor/login" element={<LoginV/>}/>
        <Route path="/vendor/register" element={<VRegister/>}/>
        <Route path="/admin/login" element={<AdminLogin/>}/>
        <Route path="/adminv/verify" element={<ApproveVendor/>}/>
      </Routes>
    </>
  )
}

export default App
