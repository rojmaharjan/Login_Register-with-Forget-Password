import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import FormInput from "../components/FormInput";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); 
  const [token, setToken] = useState(""); 
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Get token from URL
  const { token: urlToken } = useParams();
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tokenFromUrl = urlParams.get('token');
    if (tokenFromUrl) {
      setToken(tokenFromUrl); 
    } else if (urlToken) {
      setToken(urlToken); 
    }
  }, [location, urlToken]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newPassword || newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    const tokenToUse = token; 

    if (!tokenToUse) {
      toast.error("Token is required.");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/email/reset-password/confirm", 
        {
          method: "POST", 
          headers: {
            "Content-Type": "application/json", 
          },
          body: JSON.stringify({ token: tokenToUse, newPassword }), 
        }
      );

      const data = await response.json(); 

      if (response.ok) {
        toast.success("Your password has been reset successfully.");
        setNewPassword("");
      setConfirmPassword("");
      } else {
        toast.error(data.error || "Failed to reset password. Please try again.");
      }
    } catch (err) {
      toast.error("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center p-4">
      <div className="container bg-white rounded-lg shadow-2xl p-8 max-w-md w-full text-center">
        <h1 className="font-bold text-2xl mb-4">Reset Your Password</h1>
        <p className="text-sm leading-5 text-gray-700 mb-6">
          Enter your new password below to reset it.
        </p>

        {/* Success message */}
        {message && <p className="mt-4 text-green-600 text-sm">{message}</p>}

        {/* Error message */}
        {error && <p className="mt-4 text-red-600 text-sm">{error}</p>}

        <form onSubmit={handleSubmit}>
          {/* Token Input (optional, in case not in URL) */}
          {!token && (
            <FormInput
              type="text"
              name="token"
              placeholder="Enter Token"
              icon="token"
              value={token}
              onChange={(e) => setToken(e.target.value)} 
              required
            />
          )}

          {/* New Password Input */}
          <FormInput
            type="password"
            name="newPassword"
            placeholder="New Password"
            icon="lock"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)} // Update newPassword state
            required
          />

          {/* Confirm Password Input */}
          <FormInput
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            icon="lock"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)} // Update confirmPassword state
            required
          />

          <button  
            type="submit" 
            className="relative flex items-center px-6 py-3 overflow-hidden text-xs transition-all bg-blue-500 rounded-[20px] border border-[#3a91a5] text-white font-bold  tracking-wider cursor-pointer transition-transform group disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 active:scale-95 m-auto  justify-center"
            disabled={loading}
          >
            <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-indigo-600 rounded-md group-hover:translate-x-0"></span>
            <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">
            {loading ? "Resetting..." : "Reset Password"}
            </span>
          </button>
        </form>

        <a
          href="/"
          className="block mt-6 text-sm text-gray-700 hover:underline"
        >
          Back to Sign In
        </a>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ResetPassword;
