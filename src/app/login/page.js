"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Lock,
  LogIn,
  EyeOff,
  Eye,
  Zap,
  ShieldCheck,
  Gitlab,
} from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import axios from "axios";
import Header from "../_components/CustomerHeader";
import useFoodStore from "../_components/BannerSearchField";
import { useRouter } from "next/navigation";

const AdvancedLoginForm = () => {
  const { setLoginUser } = useFoodStore();
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  const validateField = (name, value) => {
    switch (name) {
      case "email":
        return /\S+@\S+\.\S+/.test(value);
      case "password":
        return value.length >= 8;
      default:
        return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = Object.keys(formData).every((key) =>
      validateField(key, formData[key])
    );

    if (isValid) {
      formData.login = true;
      try {
        const url = "http://localhost:3000/api/user";
        const response = await axios.post(url, formData);
        if (response.data.status == true) {
          toast.success("Login successful!");
          const data = response.data.result;
          localStorage.setItem("User", JSON.stringify(data));
          setLoginUser(data);
          router.push("/");
        } else {
          toast.error(response.data.message);
          console.log(response.data.message);
        }
      } catch (error) {
        console.log("Error", error);
      }
      // Add your login submission logic here
    }
  };

  const renderInputField = (
    name,
    label,
    icon,
    type = "text",
    isPassword = false
  ) => {
    const isInvalid = touched[name] && !validateField(name, formData[name]);

    return (
      <>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="relative mb-4"
        >
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {React.createElement(icon, {
              className: `h-5 w-5 ${
                isInvalid
                  ? "text-red-500"
                  : touched[name]
                  ? "text-green-500"
                  : "text-gray-400"
              }`,
            })}
          </div>

          <input
            type={isPassword ? (showPassword ? "text" : "password") : type}
            name={name}
            placeholder={label}
            value={formData[name]}
            onChange={handleChange}
            className={`
            w-full pl-10 pr-10 py-3 border-2 rounded-lg 
            focus:outline-none transition-all duration-300
            ${
              isInvalid
                ? "border-red-500 bg-red-50 focus:ring-2 focus:ring-red-300"
                : touched[name]
                ? "border-green-500 bg-green-50 focus:ring-2 focus:ring-green-300"
                : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            }`}
          />

          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400" />
              )}
            </button>
          )}

          <AnimatePresence>
            {isInvalid && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center text-red-500 text-sm mt-1"
              >
                Invalid {label.toLowerCase()}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </>
    );
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="bg-white shadow-2xl rounded-2xl overflow-hidden w-full max-w-md mt-[80px]"
        >
          <div className="p-8">
            <div className="flex justify-center mb-6">
              <motion.div
                initial={{ rotate: -10, scale: 0.8 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-purple-500 text-white p-4 rounded-full"
              >
                <ShieldCheck className="h-8 w-8" />
              </motion.div>
            </div>

            <h2 className="text-3xl font-bold text-center mb-2 text-gray-800">
              Welcome Back
            </h2>
            <p className="text-center text-gray-500 mb-6">
              Log in to access your account
            </p>

            <form onSubmit={handleSubmit}>
              {renderInputField("email", "Email", Mail, "email")}
              {renderInputField("password", "Password", Lock, "password", true)}

              <div className="flex justify-between items-center mb-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2 text-gray-700">Remember me</span>
                </label>
                <a
                  href="/forgot-password"
                  className="text-blue-500 hover:underline text-sm"
                >
                  Forgot Password?
                </a>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-gradient-to-r from-purple-500 to-blue-600 text-white py-3 rounded-lg 
                         hover:from-purple-600 hover:to-blue-700 transition-all duration-300 
                         flex items-center justify-center space-x-2"
              >
                <LogIn className="h-5 w-5" />
                <span>Log In</span>
              </motion.button>
            </form>

            <div className="mt-6 text-center">
              <div className="flex items-center justify-center space-x-4 mb-4">
                <div className="h-px bg-gray-300 w-full"></div>
                <span className="text-gray-500">or</span>
                <div className="h-px bg-gray-300 w-full"></div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {[Gitlab, Zap, Mail].map((Icon, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-gray-100 p-3 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
                  >
                    <Icon className="h-6 w-6 text-gray-600" />
                  </motion.button>
                ))}
              </div>

              <p className="mt-6 text-gray-600">
                Don't have an account?{" "}
                <Link
                  href="/signup"
                  className="text-blue-500 hover:underline font-semibold"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default AdvancedLoginForm;
