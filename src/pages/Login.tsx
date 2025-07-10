import { useForm } from "react-hook-form";
import { supabase } from "../services/supabaseClient";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: any) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) toast.error("Login failed: " + error.message);
    else navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Account Login
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            {...register("email")}
            type="email"
            placeholder="Email"
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <div className="relative">
            <input
              {...register("password")}
              type={!showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10"
              required
            />
            <span
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded font-semibold hover:bg-blue-700 transition"
          >
            Sign In
          </button>
        </form>

        <div className="text-center text-sm text-gray-500 mt-4 space-y-1">
          <p>
            Forgot{" "}
            <span className="text-blue-600 cursor-pointer">Username</span> /{" "}
            <span className="text-blue-600 cursor-pointer">Password</span>?
          </p>
          <p>
            Create an account?{" "}
            <Link
              to="/signup"
              className="text-blue-600 font-medium hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
