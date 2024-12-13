"use client";
import RestaurantHeader from "@/app/_components/RestaurantHeader";
// import { useRouter } from "next/navigation";
import React, { useState } from "react";
import "../style.css";
import "./dashboard.css";
import AddFoodItem from "@/app/_components/AddFoodItem";
import { Toaster } from "react-hot-toast";
import FoodItemList from "@/app/_components/FoodItemList";

const page = () => {
  const [addToFood, setAddToFood] = useState(false);
  return (
    <>
      <RestaurantHeader />
      <button onClick={() => setAddToFood(true)}>Add Food</button>
      <button onClick={() => setAddToFood(false)}>Dashboard</button>
      {addToFood ? (
        <AddFoodItem setAddToFood={setAddToFood} />
      ) : (
        <FoodItemList />
      )}

      <Toaster />
    </>
  );
};

export default page;
