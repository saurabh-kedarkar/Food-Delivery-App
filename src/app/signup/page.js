"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Lock,
  Check,
  X,
  AlertCircle,
  Smile,
  Zap,
  ShieldCheck,
  Trophy,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import Header from "../_components/CustomerHeader";
import useFoodStore from "../_components/BannerSearchField";

const PasswordStrengthIndicator = ({ password }) => {
  const getPasswordStrength = (pass) => {
    let strength = 0;
    if (pass.length >= 8) strength++;
    if (/[A-Z]/.test(pass)) strength++;
    if (/[a-z]/.test(pass)) strength++;
    if (/[0-9]/.test(pass)) strength++;
    if (/[^A-Za-z0-9]/.test(pass)) strength++;
    return strength;
  };

  const strength = getPasswordStrength(password);
  const strengthLabels = ["Weak", "Fair", "Good", "Strong", "Very Strong"];
  const strengthColors = [
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-green-500",
    "bg-green-700",
  ];

  return (
    <div className="flex items-center space-x-2 mt-2">
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className={`h-1 w-full rounded-full ${
            index < strength ? strengthColors[strength - 1] : "bg-gray-200"
          } transition-all duration-300`}
        />
      ))}
      <span className={`text-sm font-medium ${strengthColors[strength - 1]}`}>
        {strengthLabels[strength]}
      </span>
    </div>
  );
};

const AdvancedSignUpForm = () => {
  const router = useRouter();
  const { setLoginUser } = useFoodStore();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

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
      case "username":
        return value.trim().length >= 3;
      case "email":
        return /\S+@\S+\.\S+/.test(value);
      case "password":
        return value.length >= 8;
      case "confirmPassword":
        return value === formData.password;
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
      console.log("Form submitted", formData);
      try {
        const url = "http://localhost:3000/api/user";
        const response = await axios.post(url, formData);
        console.log("Response", response.data);
        if (response.data.status) {
          const data = res.data.result;
          toast.success("User created successfully!");
          localStorage.setItem("User", JSON.stringify(data));
          setLoginUser(data);
          router.push("/");
        } else {
          toast.success("Failed to sign up!");
        }
      } catch (error) {
        console.log("Error", error);
      }
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
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
          type={isPassword ? (showPassword[name] ? "text" : "password") : type}
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
            onClick={() => togglePasswordVisibility(name)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            {showPassword[name] ? (
              <X className="h-5 w-5 text-gray-400" />
            ) : (
              <Check className="h-5 w-5 text-gray-400" />
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
              <AlertCircle className="mr-2 h-4 w-4" />
              Invalid {label.toLowerCase()}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center p-4">
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
                className="bg-blue-500 text-white p-4 rounded-full"
              >
                <Trophy className="h-8 w-8" />
              </motion.div>
            </div>

            <h2 className="text-3xl font-bold text-center mb-2 text-gray-800">
              Create Your Account
            </h2>
            <p className="text-center text-gray-500 mb-6">
              Join our platform and unlock amazing features!
            </p>

            <form onSubmit={handleSubmit}>
              {renderInputField("username", "Username", User)}
              {renderInputField("email", "Email", Mail, "email")}

              {renderInputField("password", "Password", Lock, "password", true)}
              {formData.password && (
                <PasswordStrengthIndicator password={formData.password} />
              )}

              {renderInputField(
                "confirmPassword",
                "Confirm Password",
                Lock,
                "password",
                true
              )}

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg 
                         hover:from-blue-600 hover:to-purple-700 transition-all duration-300 
                         flex items-center justify-center space-x-2 mt-6"
              >
                <Zap className="h-5 w-5" />
                <span>Sign Up</span>
              </motion.button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-blue-500 hover:underline font-semibold"
                >
                  Log In
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default AdvancedSignUpForm;
