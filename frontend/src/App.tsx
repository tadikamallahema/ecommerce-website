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
import UserDashboard from "./user/UserDashboard.tsx";
import Cart from "./user/Cart.tsx";
import VendorDashboard from "./vendor/VendorDashboard.tsx";
import VendorProduct from "./vendor/VendorProduct.tsx";
import ViewCategories from "./user/ViewCategories.tsx";
import CategoryProducts from "./user/CategoryProducts.tsx";


function App() {
  
  return (
    <>
      <Routes>
        <Route path="/viewAllcat" element={<ViewCategories/>}/>
        <Route path="/category/:id" element={<CategoryProducts />} />
        {/* ---------- PUBLIC ---------- */}
        <Route path="/" element={<Home />} />
        {/* USER AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />

        {/* VENDOR AUTH */}
        <Route path="/vendor/login" element={<LoginV />} />
        <Route path="/vendor/register" element={<VRegister />} />

        {/* ADMIN AUTH */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* ---------- USER ---------- */}
        <Route
          path="/user"
          element={
            <ProtectedRoutes allowedRoles={["user"]}>
              <UserDashboard />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoutes allowedRoles={["user"]}>
              <Cart />
            </ProtectedRoutes>
          }
        />

        {/* ---------- VENDOR ---------- */}
        <Route
          path="/vendor"
          element={
            <ProtectedRoutes allowedRoles={["vendor"]}>
              <VendorDashboard />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/vendor/products"
          element={
            <ProtectedRoutes allowedRoles={["vendor"]}>
              <VendorProduct />
            </ProtectedRoutes>
          }
        />

        {/* ---------- ADMIN ---------- */}
        <Route
          path="/admin"
          element={
            <ProtectedRoutes allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/admin/verifyvendors"
          element={
            <ProtectedRoutes allowedRoles={["admin"]}>
              <ApproveVendor />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/admin/verifyproducts"
          element={
            <ProtectedRoutes allowedRoles={["admin"]}>
              <ApproveProduct />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/admin/manage-categories"
          element={
            <ProtectedRoutes allowedRoles={["admin"]}>
              <ManageCategories />
            </ProtectedRoutes>
          }
        />
        {/* <Route
          path="/admin/products"
          element={
            <ProtectedRoutes allowedRoles={["admin"]}>
              <GetAllProducts />
            </ProtectedRoutes>
          }
        /> */}
        <Route
          path="/admin/createcategory"
          element={
            <ProtectedRoutes allowedRoles={["admin"]}>
              <CreateCategory />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </>
  )
}

export default App;
/**
 {/*
 <ManageCategories/>
 <CreateCategory/>
 <GetAllProducts/>
 <ApproveProduct/>
 <AdminDashboard/>
 <ApproveProduct/>
 <h1>Hello is my APP.jsx working?</h1> <Navbar/> 
 {/*  <SignUp/> 
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