import axios from "axios";
import React, { useEffect, useState } from "react";
import AdminDashboard from "./AdminDashboard";

interface Vendor {
  id: number;
  name: string;
  email: string;
  is_admin_verified: boolean;
}

const ApproveVendor = () => {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [rejectReason, setRejectReason] = useState<Record<number, string>>({});

  useEffect(() => {
    const fetchvendor = async () => {
      try {
        const res = await axios.get(
          "http://localhost:2007/api/admin/pendingvendors",
          { withCredentials: true }
        );
        setVendors(res.data.vendors);
      } catch (err: any) {
        alert(err.message);
      }
    };

    fetchvendor();
  }, []);

  const approveVendor = async (vendorId: number) => {
    try {
      await axios.post(
        `http://localhost:2007/api/admin/verifyvendor/${vendorId}`,
        { approve: true },
        { withCredentials: true }
      );

      setVendors((prev) => prev.filter((v) => v.id !== vendorId));
    } catch (err: any) {
      alert(err.message);
    }
  };

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

      setVendors((prev) => prev.filter((v) => v.id !== vendorId));
    } catch {
      alert("Failed to reject vendor");
    }
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial, sans-serif" }}>
      <AdminDashboard />

      <h2 style={{ textAlign: "center", marginBottom: "25px", color: "#1a4fb4" }}>
        Vendor Verification
      </h2>

      {vendors.length === 0 ? (
        <p style={{ textAlign: "center" }}>No vendors pending verification</p>
      ) : (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <table
            style={{
              width: "80%",
              maxWidth: "900px",
              borderCollapse: "collapse",
              boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
              background: "#fff"
            }}
          >
            <thead>
              <tr style={{ background: "#1a4fb4", color: "white" }}>
                <th style={headerStyle}>Name</th>
                <th style={headerStyle}>Email</th>
                <th style={headerStyle}>Action</th>
              </tr>
            </thead>

            <tbody>
              {vendors.map((vendor) => (
                <tr key={vendor.id} style={{ borderBottom: "1px solid #ddd" }}>
                  <td style={cellStyle}>{vendor.name}</td>
                  <td style={cellStyle}>{vendor.email}</td>

                  <td style={cellStyle}>
                    <button
                      onClick={() => approveVendor(vendor.id)}
                      style={approveButton}
                    >
                      Approve
                    </button>

                    <input
                      type="text"
                      placeholder="Rejection reason"
                      value={rejectReason[vendor.id] || ""}
                      onChange={(e) =>
                        setRejectReason({
                          ...rejectReason,
                          [vendor.id]: e.target.value
                        })
                      }
                      style={{
                        padding: "6px",
                        marginRight: "10px",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        width: "150px"
                      }}
                    />

                    <button
                      onClick={() => rejectVendor(vendor.id)}
                      style={rejectButton}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const headerStyle = {
  padding: "12px",
  border: "1px solid #ddd",
  textAlign: "center" as const
};

const cellStyle = {
  padding: "10px",
  border: "1px solid #ddd",
  textAlign: "center" as const
};

const approveButton = {
  padding: "6px 12px",
  marginRight: "10px",
  background: "#2ecc71",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer"
};

const rejectButton = {
  padding: "6px 12px",
  background: "#e74c3c",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer"
};

export default ApproveVendor;