import React, { useState } from "react";
import { useParams } from "react-router-dom";
import FormInput from "../components/FormInput";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [token, setToken] = useState(""); // Added state for token (if inputted manually)
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { token: urlToken } = useParams(); // Token from URL (optional if you're using an input field)

  // handleSubmit function when form is submitted
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation for new password
    if (!newPassword || newPassword.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    const tokenToUse = token || urlToken; // Use the token from the input field or URL

    if (!tokenToUse) {
      setError("Token is required.");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      // Send request to API with token and newPassword
      const response = await fetch(
        "http://localhost:5000/api/email/reset-password/confirm", // The endpoint to confirm password reset
        {
          method: "POST", // HTTP method
          headers: {
            "Content-Type": "application/json", // Send data as JSON
          },
          body: JSON.stringify({ token: tokenToUse, newPassword }), // Send token and newPassword
        }
      );

      const data = await response.json(); // Parse the JSON response

      if (response.ok) {
        setMessage("Your password has been reset successfully.");
      } else {
        setError(data.error || "Failed to reset password. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
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
          {/* Input field for token */}
          <FormInput
            type="text"
            name="person"
            placeholder="Enter Token (if not in URL)"
            icon="token"
            value={token}
            onChange={(e) => setToken(e.target.value)} // Update token state
          />

          {/* Input field for new password */}
          <FormInput
            type="password"
            name="newPassword"
            placeholder="New Password"
            icon="lock"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)} // Update newPassword state
            required
          />
          <button
            type="submit"
            disabled={loading}
            className={`mt-4 rounded-[20px] border border-[#3a91a5] bg-[#3a91a5] text-white text-xs font-bold py-3 px-11 uppercase tracking-wider cursor-pointer transition-transform ${
              loading
                ? "opacity-50 cursor-not-allowed"
                : "hover:opacity-90 active:scale-95"
            }`}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        <a
          href="/"
          className="block mt-6 text-sm text-gray-700 hover:underline"
        >
          Back to Sign In
        </a>
      </div>
    </div>
  );
};

export default ResetPassword;
