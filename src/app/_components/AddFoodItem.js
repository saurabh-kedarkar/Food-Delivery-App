import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const AddFoodItem = (props) => {
  const data = localStorage.getItem("restaurantUser");
  // const [addToFood, setAddToFood] = useState(false);
  const { _id: restoId } = JSON.parse(data);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    data.restoId = restoId;
    try {
      const url = "http://localhost:3000/api/restaurant/food";
      const response = await axios.post(url, data);
      if (response.data.status) {
        toast.success("Food is Added!");
        props.setAddToFood(false);
      } else {
        toast.error("Food is not Added!");
      }
    } catch (error) {
      console.log("error", error);
      toast.error("Food is not Added!");
    }
  };
  return (
    <div className="container-form">
      <h1>Add To Food Item</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Enter your Food Name"
            className="input-field"
            {...register("foodName", { required: true })}
          />
          {errors.foodName && (
            <span className="errorShow">This field is required</span>
          )}
        </div>
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Enter Price"
            className="input-field"
            {...register("price", { required: true })}
          />
          {errors.price && (
            <span className="errorShow">This field is required</span>
          )}
        </div>
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Enter Image Path"
            className="input-field"
            {...register("image", { required: true })}
          />
          {errors.image && (
            <span className="errorShow">This field is required</span>
          )}
        </div>
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Enter Description"
            className="input-field"
            {...register("description", { required: true })}
          />
          {errors.description && (
            <span className="errorShow">This field is required</span>
          )}
        </div>
        <div className="input-wrapper">
          <button className="button">Login</button>
        </div>
      </form>
    </div>
  );
};

export default AddFoodItem;
