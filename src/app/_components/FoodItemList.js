import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const FoodItemList = () => {
  const [foodItems, setFoodItems] = useState([]);
  const router = useRouter();
  useEffect(() => {
    const loginUser = localStorage.getItem("restaurantUser");
    if (!loginUser) {
      toast.error("User not logged in!");
      router.push("/restaurant");
      return;
    }
    const { _id: restoId } = JSON.parse(loginUser);
    const getFoodItem = async () => {
      try {
        const url = `http://localhost:3000/api/restaurant/food/${restoId}`;
        const response = await axios.get(url);
        if (response.data.status == true) {
          setFoodItems(response.data.result);
        } else {
          setFoodItems([]);
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    getFoodItem();
  }, [setFoodItems]);

  // delete food items handlers
  const handleDeleteFoodItem = async (foodId) => {
    try {
      console.log("foodId", foodId);
      const url = `http://localhost:3000/api/restaurant/food/${foodId}`;
      const response = await axios.delete(url, foodId);
      if (response.data.status == true) {
        console.log("response", response.data);
        toast.success("Food item is deleted!");
        const deletedFood = foodItems.filter((food) => food._id !== foodId);
        console.log("deletedFood", deletedFood);
        setFoodItems(deletedFood);
      } else {
        toast.error(response.data.message);
      }
    } catch {
      console.log("Error deleting food item");
    }
  };

  return (
    <div className="food-item-container">
      <h1>Restaurant Food Item List</h1>
      <div className="food-item-grid">
        {foodItems ? (
          foodItems.map((item, index) => (
            <div className="food-item-card" key={index}>
              <img
                src={item.image}
                alt={item.foodName}
                className="food-image"
              />
              <div className="food-details">
                <h2>{item.foodName}</h2>
                <p className="food-description">{item.description}</p>
                <div className="food-button">
                  <p className="food-price">Price: ₹{item.price}</p>
                  <div>
                    <button
                      onClick={() => handleDeleteFoodItem(item._id)}
                      className="food-delete"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => router.push(`dashboard/${item._id}`)}
                      className="food-edit"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Loading food item details...</p>
        )}
      </div>
    </div>
  );
};

export default FoodItemList;
