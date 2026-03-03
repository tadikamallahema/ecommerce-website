import axios from "axios";
import React, { useEffect, useState } from "react";
import UserDashboard from "./UserDashboard";

interface User {
  id: number;
  name: string;
  phone_number: string;
  email: string;
  is_active: boolean;
}

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await axios.get(
          "http://localhost:2007/api/user/profile",
          { withCredentials: true }
        );
        setUser(res.data.user);
      } catch (err: any) {
        alert("Failed to load profile");
      }
    };

    fetchUserProfile();
  }, []);

  if (!user)
    return (
      <div style={{ padding: "40px" }}>
        <UserDashboard />
        <p>Loading profile...</p>
      </div>
    );

return (
  <div
    style={{
      background: "#f5f5f5",
      minHeight: "89.5vh",
      padding: "30px 20px",
    }}
  >
    <UserDashboard />

    <h2
      style={{
        textAlign: "center",
        margin: "20px 0 30px 0",
      }}
    >
      👤 My Profile
    </h2>

    {/* Center Container */}
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
        <div
          style={{
            background: "#fff",
            borderRadius: "16px",
            boxShadow: "0 5px 20px rgba(0,0,0,0.05)",
            padding: "30px",
            width: "100%",
            maxWidth: "600px",
          }}
        >
          <h3 style={{ marginBottom: "20px", textAlign: "center" }}>
            Personal Information
          </h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "150px 1fr",
              rowGap: "15px",
              fontSize: "16px",
            }}
          >
            <span style={{ fontWeight: "bold" }}>Name</span>
            <span>{user.name}</span>

            <span style={{ fontWeight: "bold" }}>Email</span>
            <span>{user.email}</span>

            <span style={{ fontWeight: "bold" }}>Phone</span>
            <span>{user.phone_number}</span>

            <span style={{ fontWeight: "bold" }}>Status</span>
            <span
              style={{
                color: user.is_active ? "green" : "red",
                fontWeight: "bold",
              }}
            >
              {user.is_active ? "Active" : "Inactive"}
            </span>
          </div>
        </div>
    </div>
  </div>
);
};

export default Profile;