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
import CheckOutPage from "./user/CheckOutPage.tsx";
import Profile from "./user/Profile.tsx";
import OrderHistory from "./user/OrderHistory.tsx";
import CreateProduct from "./vendor/CreateProduct.tsx";
import CheckEmail from "./user/CheckEmail.tsx";
import VerifyEmail from "./user/VerifyEmail.tsx";
import AddAddress from "./user/AddAddress.tsx";
function App() {
  
  return (
    <>

      <Routes>
        <Route path="/user/categories" element={<ViewCategories/>}/>
        {/* <Route path="/category/:id" element={<CategoryProducts />} /> */}
        <Route path="/checkemail" element={<CheckEmail/>}/>
        <Route path="/verifyemail/:token" element={<VerifyEmail/>}/>
        <Route path="/" element={<Home />} />
       <Route path="/user/addaddress" element={<AddAddress/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />

        <Route path="/vendor/login" element={<LoginV />} />
        <Route path="/vendor/register" element={<VRegister />} />

        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/category/:id"
          element={
            <ProtectedRoutes allowedRoles={["user"]}>
              <CategoryProducts />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/user"
          element={
            <ProtectedRoutes allowedRoles={["user"]}>
              <UserDashboard />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/user/cart"
          element={
            <ProtectedRoutes allowedRoles={["user"]}>
              <Cart />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/user/checkout"
          element={
            <ProtectedRoutes allowedRoles={["user"]}>
              <CheckOutPage />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/user/profile"
          element={
            <ProtectedRoutes allowedRoles={["user"]}>
              <Profile />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/user/history"
          element={
            <ProtectedRoutes allowedRoles={["user"]}>
              <OrderHistory />
            </ProtectedRoutes>
          }
        />

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
        <Route
          path="/vendor/createproduct"
          element={
            <ProtectedRoutes allowedRoles={["vendor"]}>
              <CreateProduct />
            </ProtectedRoutes>
          }
        />

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
          path="/admin/manageCategories"
          element={
            <ProtectedRoutes allowedRoles={["admin"]}>
              <ManageCategories />
            </ProtectedRoutes>
          }
        />
         <Route
          path="/admin/products"
          element={
            <ProtectedRoutes allowedRoles={["admin"]}>
              <GetAllProducts />
            </ProtectedRoutes>
          }
        /> 
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
