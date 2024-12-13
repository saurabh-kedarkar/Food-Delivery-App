"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard.js";
import useFoodStore from "./BannerSearchField.js";

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { searchField } = useFoodStore();
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        let url = "http://localhost:3000/api/customer";

        if (searchField.location && searchField.restaurant) {
          url += `?location=${searchField.location}&restaurant=${searchField.restaurant}`;
        } else if (searchField.location) {
          url += `?location=${searchField.location}`;
        } else if (searchField.restaurant) {
          url += `?restaurant=${searchField.restaurant}`;
        }
        const response = await axios.get(url);
        setRestaurants(response.data.result);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch restaurants");
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, [searchField]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 mt-10">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Restaurants Near You
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
      {restaurants.length === 0 && (
        <div className="text-center text-gray-500 mt-10">
          No restaurants found
        </div>
      )}
    </div>
  );
};

export default RestaurantList;
