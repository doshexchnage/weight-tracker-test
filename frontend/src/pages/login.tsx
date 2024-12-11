import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "sonner";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  async function handleLogin() {
    try {
      const response = await axios.get(`http://localhost:5000/users/${email}`);
      const user = response.data;

      if (user.password === password) {
        toast.success("Login successful!");
        navigate("/main", { state: { user } });
      } else {
        toast.error("Invalid credentials");
      }
    } catch (error) {
      toast.error("User not found or server error");
    }
  }

  return (
    <div className="h-screen flex justify-center items-center bg-stone-800">
      <div className="bg-stone-700 p-6 rounded-lg shadow-md w-80">
        <h1 className="text-2xl font-bold mb-4 text-stone-200">Login</h1>
        <div className="flex flex-col gap-2 text-stone-50">
          <label className="text-lg">Email</label>
          <input
            type="email"
            placeholder="Email"
            className="border p-2 mb-2 w-full rounded-sm text-stone-900"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="text-lg">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="border p-2 w-full rounded-sm pr-10 text-stone-900"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-2 flex items-center text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <AiOutlineEyeInvisible className="w-5 h-5" />
              ) : (
                <AiOutlineEye className="w-5 h-5" />
              )}
            </button>
          </div>

          <button
            onClick={handleLogin}
            className="bg-stone-500 text-stone-50 px-4 py-2 mt-6 rounded w-full"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
