import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
const RestaurantLogin = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    // Here you can send the data to your server
    const loginUser = {
      email: data.email,
      password: data.password,
      login: true,
    };
    try {
      const url = "http://localhost:3000/api/restaurant";
      const res = await axios.post(url, loginUser);

      if (res.data.sucess) {
        toast.success("Login successful!");
        const data = res.data.result;
        localStorage.setItem("restaurantUser", JSON.stringify(data));
        router.push("/restaurant/dashboard");
      } else {
        toast.error(res.data.error);
      }
    } catch (error) {
      console.log("error", error);
      toast.error("Invalid email or password!");
    }
  };

  return (
    <>
      <h1>Restaurant Login</h1>
      <div className="login-form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Enter your Email Address"
              className="input-field"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="errorShow">This field is required</span>
            )}
          </div>
          <div className="input-wrapper">
            <input
              type="password"
              placeholder="Enter your Password"
              className="input-field"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <span className="errorShow">This field is required</span>
            )}
          </div>
          <div className="input-wrapper">
            <button className="button">Login</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default RestaurantLogin;
