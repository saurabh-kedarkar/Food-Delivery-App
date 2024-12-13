"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import useFoodStore from "./BannerSearchField";

const CustomerBanner = () => {
  const [cities, setCities] = useState([]);
  const { addSearchField } = useFoodStore();
  const [searchPlace, setSearchPlace] = useState("");
  const [searchFood, setSearchFood] = useState("");
  const [placeSuggestions, setPlaceSuggestions] = useState([]);

  // Fetch city names on page load
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/customer/locations"
        );
        if (response.data.status) {
          setCities(response.data.result);
        } else {
          console.error("Error fetching cities");
          setCities([]);
        }
      } catch (error) {
        console.error("Error fetching city data:", error);
        setCities([]);
      }
    };

    fetchCities();
  }, []);

  const handlePlaceSearch = (e) => {
    const value = e.target.value;
    setSearchPlace(value);

    // Filter cities based on input
    if (value.trim() === "") {
      setPlaceSuggestions([]);
    } else {
      const filteredCities = cities.filter(
        (city) => city && city.toLowerCase().includes(value.toLowerCase())
      );
      setPlaceSuggestions(filteredCities);
    }
  };

  const handlePlaceSuggestionClick = (suggestion) => {
    setSearchPlace(suggestion);
    setPlaceSuggestions([]); // Clear suggestions after selection
  };

  const handleSearch = () => {
    // Implement search logic
    if (searchPlace || searchFood) {
      const bannerFiels = {
        location: searchPlace,
        restaurant: searchFood,
      };
      addSearchField(bannerFiels);
      setPlaceSuggestions([]);
    }
  };

  return (
    <div className="relative w-full h-[500px] bg-cover bg-center bg-[url('https://c8.alamy.com/comp/2C1A20G/banner-raw-uncooked-ingredients-for-cooking-pasta-cooking-background-food-banner-2C1A20G.jpg')]">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center">
        <h1 className="text-4xl font-bold mb-4">
          Find Your Favorite Food or Restaurant
        </h1>
        <p className="text-lg mb-8">Discover places and cuisines near you.</p>

        {/* Search boxes */}
        <div className="flex flex-col md:flex-row items-center gap-4 w-full max-w-2xl mx-auto relative">
          {/* Search Place */}
          <div className="w-full relative">
            <input
              type="text"
              placeholder="Search Place"
              value={searchPlace}
              onChange={handlePlaceSearch}
              className="w-full px-4 py-3 rounded-md text-gray-800 focus:ring focus:ring-blue-300 outline-none"
            />
            {/* Suggestions Dropdown */}
            {placeSuggestions.length > 0 && (
              <ul className="absolute top-full left-0 w-full bg-white text-gray-800 border border-gray-200 rounded-md mt-1 shadow-lg z-50">
                {placeSuggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handlePlaceSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Search Food or Restaurant */}
          <input
            type="text"
            placeholder="Search Food or Restaurant"
            value={searchFood}
            onChange={(e) => setSearchFood(e.target.value)}
            className="w-full px-4 py-3 rounded-md text-gray-800 focus:ring focus:ring-blue-300 outline-none"
          />
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="mt-6 px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md shadow-lg transition"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default CustomerBanner;
