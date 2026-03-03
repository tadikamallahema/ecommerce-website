import axios from 'axios';
import React, { useEffect, useState } from 'react'
import AdminDashboard from './AdminDashboard';

interface Vendor{
  id:number;
  name:string;
  email:string;
  is_admin_verified:boolean;
}
const ApproveVendor = () => {
  const [vendors,setVendors]=useState<Vendor[]>([]);
  const [rejectReason, setRejectReason] = useState<Record<number, string>>({});
  useEffect(()=>{
    const fetchvendor=async()=>{
      try{
        const res=await axios.get("http://localhost:2007/api/admin/pendingvendors",
          {withCredentials:true}
        )
        setVendors(res.data.vendors);
      }catch(err:any){
        alert(err.message);
      }
    };
    fetchvendor();
  },[]);

  const approveVendor=async(vendorId:number)=>{
    try{
      await axios.post(`http://localhost:2007/api/admin/verifyvendor/${vendorId}`,
        {approve:true},
        {withCredentials:true}
      )
      setVendors((prev)=>
      prev.filter((v)=>v.id!==vendorId));
    }catch(err:any){
      alert(err.message);
    }
  }

const rejectVendor = async (vendorId: number) => {
    const reason = rejectReason[vendorId];

    if (!reason) {
      alert("Please enter a rejection reason");
      return;
    }

    try {
      await axios.post(
        `http://localhost:2007/api/admin/verifyvendor/${vendorId}`,
        { approve: false, reason },
        { withCredentials: true }
      );

      setVendors((prev) =>
        prev.filter((v) => v.id !== vendorId)
      );
    } catch {
      alert("Failed to reject vendor");
    }
  };


  return (
    <div style={{ padding: "20px" }}>
      <AdminDashboard/>
      <h1>Vendor Verification</h1>

      {vendors.length === 0 ? (
        <p>No vendors pending verification</p>
      ) : (
        <table style={{ width: "100%",  borderCollapse: "collapse",  marginTop: "20px",  }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {vendors.map((vendor) => (
              <tr key={vendor.id}>
                <td>{vendor.name}</td>
                <td>{vendor.email}</td>
                <td>
                  <button onClick={() => approveVendor(vendor.id)} style={{ marginRight: "10px" }}>
                    Approve</button>
                  <input type="text"  placeholder="Rejection reason"  value={rejectReason[vendor.id] || ""}  
                  onChange={(e) =>  setRejectReason({
                        ...rejectReason,
                        [vendor.id]: e.target.value,
                      })} style={{ marginRight: "10px" }}/>

                  <button onClick={() => rejectVendor(vendor.id)}> Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
export default ApproveVendor;
