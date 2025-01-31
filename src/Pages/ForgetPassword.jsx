import React, { useState } from "react";
import Button from "../components/Button";
import FormInput from "../components/FormInput";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/email/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage(
          `If an account with ${email} exists, a password reset link has been sent.`
        );
      } else {
        setError(
          data.error || "There was an issue sending the password reset link."
        );
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
        <h1 className="font-bold text-2xl mb-4">Forgot Your Password?</h1>
        <p className="text-sm leading-5 text-gray-700 mb-6">
          Enter your email address and we’ll send you a link to reset your
          password.
        </p>
        <form onSubmit={handleSubmit}>
          <FormInput
            type="email"
            name="email"
            placeholder="Email"
            icon="mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            name="password_reset_link"
            disabled={loading}
            className={`mt-4 rounded-[20px] border border-[#3a91a5] bg-[#3a91a5] text-white text-xs font-bold py-3 px-11 uppercase tracking-wider cursor-pointer transition-transform ${
              loading
                ? "opacity-50 cursor-not-allowed"
                : "hover:opacity-90 active:scale-95"
            }`}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
        {message && <p className="mt-4 text-green-600 text-sm">{message}</p>}
        {error && <p className="mt-4 text-red-600 text-sm">{error}</p>}
        <a
          href="/"
          className="block mt-6 text-sm text-gray-700 hover:underline"
        >
          Back to Sign In
        </a>
      </div>
    </div>
  );
}

export default ForgetPassword;
