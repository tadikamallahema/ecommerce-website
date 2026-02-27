import axios from "axios";
import { useEffect, useState, type ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface protectedProps{
    children:ReactNode;
    allowedRoles: string[];
}

const ProtectedRoutes=({children,allowedRoles}:protectedProps)=>{
    const [isAuthenticated,setIsAuthenticated]=useState<boolean|null>(null);

    useEffect(()=>{
        const checkAuth=async()=>{
            try{
                const res=await axios.get("http://localhost:2007/api/check",{
                    withCredentials:true,
                });
                //setIsAuthenticated(true);
            if (allowedRoles.includes(res.data.role)) {
            setIsAuthenticated(true);
            } else {
          alert("You are not authorized");
        }
            }catch(err:any){
                const status=err?.response?.status;
                if(status===403){
                    alert("You are not authorized to access this page");
                }
            }
        };
        checkAuth();
    },[]);
    if(isAuthenticated===null) return <div>Loading..</div>;
    if(!isAuthenticated) return <Navigate to="/login"/>;

    return <>{children}</>
}
export default ProtectedRoutes;