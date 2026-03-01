import axios from 'axios';
import React, { useEffect, useState } from 'react';

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
        alert(err.message);
      }
    };

    fetchUserProfile();
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h3>Profile Page</h3>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone_number}</p>
      <p>Status: {user.is_active ? "Active" : "Inactive"}</p>
    </div>
  );
};

export default Profile;