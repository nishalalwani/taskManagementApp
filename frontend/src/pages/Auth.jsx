import React, { useState } from "react";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react"; 
import { useNavigate } from "react-router-dom";
import { loginUser, signupUser } from "../services/authService"; 

// Test credentials for demo/login
const TEST_EMAIL = "testUser@gmail.com";
const TEST_PASSWORD = "testPassword";

const Auth = () => {
  // State management
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // For button disable/loading state
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
  const [useTestUser, setUseTestUser] = useState(false); // Use test credentials checkbox

  const navigate = useNavigate();

  // Toggle test credentials
  const handleUseTestUserToggle = () => {
    if (!useTestUser) {
      setEmail(TEST_EMAIL);
      setPassword(TEST_PASSWORD);
    } else {
      setEmail("");
      setPassword("");
    }
    setUseTestUser(!useTestUser);
  };

  // Handle Sign Up
  const handleSignUp = async () => {
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    setLoading(true);
    try {
      const data = await signupUser(email, password);
      toast.success(data.message);
    } catch (err) {
      toast.error(err.response?.data?.error || "Sign up failed");
    } finally {
      setLoading(false);
    }
  };

  // Handle Login
  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    setLoading(true);
    try {
      const data = await loginUser(email, password);
      localStorage.setItem("token", data.token); // Save token to localStorage
      localStorage.setItem("userEmail", email); // Save email for UI use
      toast.success("Login successful!");
      navigate("/dashboard"); // Navigate to dashboard
    } catch (err) {
      toast.error(err.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      {/* App Title */}
      <h1 className="text-4xl font-bold mb-8 text-black-700">Task Management App</h1>

      {/* Auth Form Card */}
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700">
          Login / Sign Up
        </h2>

        {/* Email Input */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (useTestUser) setUseTestUser(false);
          }}
          className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        {/* Password Input with Eye toggle */}
        <div className="relative mb-6">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (useTestUser) setUseTestUser(false);
            }}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-purple-700"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Test User Checkbox */}
        <label className="flex items-center mb-6 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={useTestUser}
            onChange={handleUseTestUserToggle}
            className="mr-2"
          />
          Use test user credentials
        </label>

        {/* Buttons: Sign Up & Login */}
        <div className="flex justify-between gap-4">
          <button
            onClick={handleSignUp}
            disabled={loading}
            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md transition disabled:opacity-50"
          >
            {loading ? "Processing..." : "Sign Up"}
          </button>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 rounded-md transition disabled:opacity-50"
          >
            {loading ? "Processing..." : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
