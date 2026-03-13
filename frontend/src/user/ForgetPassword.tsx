import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgetPassword: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:2007/api/checkmail", {
        email,
      });

      if (res.data) {
        navigate("/resetpass", { state: { email } });
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Email not found");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Forgot Password</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <br />

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <br />

        <button type="submit">Continue</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default ForgetPassword;