import axios from "axios";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const RestaurantSingUp = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const url = "http://localhost:3000/api/restaurant";
      const res = await axios.post(url, data);
      if (res.data.sucess) {
        const data = res.data.result;
        toast.success("Restaurant created successfully!");
        localStorage.setItem("restaurantUser", JSON.stringify(data));
        router.push("/restaurant/dashboard");
      } else {
        toast.error(res.data.error);
      }
    } catch (error) {
      toast.error("Failed to create restaurant. Please try again.");
      console.error("Error submitting form:", error);
    }
  };
  return (
    <>
      <h1>Restaurant Sign-Up</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Restaurant Name"
            className="input-field"
            {...register("name", { required: true })}
          />
          {errors.name && (
            <span className="errorShow">Restaurant name is required</span>
          )}
        </div>
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Email Address"
            className="input-field"
            {...register("email", { required: true })}
          />
          {errors.email && <span className="errorShow">Email is required</span>}
        </div>
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="City"
            className="input-field"
            {...register("city", { required: true })}
          />
          {errors.city && <span className="errorShow">City is required</span>}
        </div>
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Address"
            className="input-field"
            {...register("address", { required: true })}
          />
          {errors.address && (
            <span className="errorShow">Address is required</span>
          )}
        </div>
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Contact Number"
            className="input-field"
            {...register("contactNo", { required: true })}
          />
          {errors.contactNo && (
            <span className="errorShow">Contact number is required</span>
          )}
        </div>
        <div className="input-wrapper">
          <input
            type="password"
            placeholder="Password"
            className="input-field"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <span className="errorShow">Password is required</span>
          )}
        </div>
        <div className="input-wrapper">
          <input
            type="password"
            placeholder="Confirm Password"
            className="input-field"
            {...register("cpassword", {
              required: true,
              validate: (value) =>
                value === watch("password") || "Passwords must match",
            })}
          />
          {errors.cpassword && (
            <span className="errorShow">
              {errors.cpassword.message || "Confirm password is required"}
            </span>
          )}
        </div>
        <div className="input-wrapper">
          <button type="submit" className="button">
            Sign Up
          </button>
        </div>
      </form>
    </>
  );
};

export default RestaurantSingUp;
