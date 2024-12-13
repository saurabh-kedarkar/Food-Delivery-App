"use client";
import axios from "axios";
import { use } from "react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const EditFoodItem = ({ params }) => {
  const [foodItem, setFoodItem] = useState(null);
  const { id: foodId } = use(params); // Destructure params directly
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const url = `http://localhost:3000/api/restaurant/food/${foodId}`;
      const response = await axios.put(url, data);
      if (response.data.status) {
        toast.success("Food Item updated successfully!");
        router.push("../dashboard"); // Navigate back after success
      } else {
        toast.error("Failed to update Food Item!");
      }
    } catch (error) {
      console.error("Error updating food item:", error);
      toast.error("An error occurred!");
    }
  };

  useEffect(() => {
    const loginUser = localStorage.getItem("restaurantUser");
    if (!loginUser) {
      toast.error("User not logged in!");
      router.push("/login");
      return;
    }

    const { _id: restoId } = JSON.parse(loginUser);
    const fetchFood = async () => {
      try {
        const url = `http://localhost:3000/api/restaurant/food/${restoId}`;
        const response = await axios.get(url);
        if (response.data.status) {
          const food = response.data.result.find((f) => f._id === foodId);
          if (food) {
            setFoodItem(food);
            reset(food); // Populate the form with existing food data
          } else {
            toast.error("Food Item not found!");
          }
        } else {
          toast.error("Failed to fetch Food Item!");
        }
      } catch (error) {
        console.error("Error fetching food item:", error);
        toast.error("An error occurred!");
      }
    };

    fetchFood();
  }, [foodId, reset, router]);

  return (
    <div className="container-form">
      <h1>Edit Food Item</h1>
      {foodItem ? (
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
              type="number"
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
            <textarea
              placeholder="Enter Description"
              className="input-field"
              {...register("description", { required: true })}
            />
            {errors.description && (
              <span className="errorShow">This field is required</span>
            )}
          </div>
          <div className="input-wrapper">
            <button className="button" type="submit">
              Edit Food
            </button>
          </div>
          <a
            className="back-button"
            onClick={() => router.push("../dashboard")}
          >
            Back to Food List
          </a>
        </form>
      ) : (
        <p>Loading food item details...</p>
      )}
    </div>
  );
};

export default EditFoodItem;
