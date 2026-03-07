import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    const verify = async () => {
      try {
        await axios.get(`http://localhost:2007/api/verify-email/${token}`);
        setStatus("success");

        // redirect to login after 3 seconds
        setTimeout(() => {
          navigate("/login");
        }, 3000);

      } catch (err) {
        setStatus("error");
      }
    };

    if (token) verify();
  }, [token, navigate]);

  return (
    <div style={container}>
      {status === "loading" && (
        <>
          <img
            src="https://cdn-icons-png.flaticon.com/512/189/189792.png"
            alt="verifying"
            style={image}
          />
          <h2>Verifying your email...</h2>
          <p>Please wait while we verify your account.</p>
        </>
      )}

      {status === "success" && (
        <>
          <img
            src="https://cdn-icons-png.flaticon.com/512/845/845646.png"
            alt="verified"
            style={image}
          />
          <h2>Email Verified Successfully 🎉</h2>
          <p>You can now login to your account.</p>
          <p>Redirecting to login...</p>
        </>
      )}

      {status === "error" && (
        <>
          <img
            src="https://cdn-icons-png.flaticon.com/512/463/463612.png"
            alt="error"
            style={image}
          />
          <h2>Verification Failed</h2>
          <p>The verification link is invalid or expired.</p>
        </>
      )}
    </div>
  );
};

const container: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "80vh",
  textAlign: "center",
  fontFamily: "Arial",
};

const image: React.CSSProperties = {
  width: "120px",
  marginBottom: "20px",
};

export default VerifyEmail;