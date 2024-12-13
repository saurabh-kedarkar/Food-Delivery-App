import React, { useEffect, useState } from "react";
import { Star, Clock, ChefHat, Utensils, ShoppingCart } from "lucide-react";
import useFoodStore from "./BannerSearchField";

const RestaurantDetailFoodShow = ({ restoFood, restaurantInfo }) => {
  const [activeTab, setActiveTab] = useState("menu");
  const { addToCard, setAddToCard, removeCard, setRemoveCard } = useFoodStore();
  const [cardId, setCardId] = useState();
  useEffect(() => {
    const storedCard = localStorage.getItem("card");
    const parsedCard = storedCard ? JSON.parse(storedCard) : [];
    const ids = parsedCard.map((item) => item._id);
    console.log("Updated card IDs:", ids);
    setCardId(ids);
    setRemoveCard();
  }, [addToCard, removeCard]);

  // Tabs for navigation
  const tabs = [
    { id: "menu", icon: <Utensils />, label: "Menu" },
    { id: "about", icon: <ChefHat />, label: "About" },
    { id: "reviews", icon: <Star />, label: "Reviews" },
  ];

  return (
    <div className="bg-white shadow-2xl rounded-3xl overflow-hidden mx-auto">
      {/* Tabs Navigation */}
      <div className="flex border-b">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 p-4 ${
              activeTab === tab.id
                ? "border-b-2 border-black text-black"
                : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            {tab.icon}
            <span className="font-semibold">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content Sections */}
      {activeTab === "menu" && (
        <div className="p-8">
          <h2 className="text-3xl font-bold mb-6">Featured Dishes</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {restoFood.map((dish, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100 transform transition-all duration-300 hover:shadow-xl hover:scale-105"
              >
                <div className="relative">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-64 object-cover"
                  />
                  {dish.isNewItem && (
                    <span className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      New
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800">
                        {dish.name}
                      </h3>
                      <p className="text-gray-600 mt-1">{dish.description}</p>
                    </div>
                    <span className="text-green-600 text-xl font-semibold">
                      ${dish.price}
                    </span>
                  </div>

                  {/* Ingredients Section */}
                  {dish.ingredients && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-700 mb-2">
                        Key Ingredients
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {dish.ingredients.map((ingredient, idx) => (
                          <span
                            key={idx}
                            className="bg-gray-200 px-3 py-1 rounded-full text-xs text-gray-700"
                          >
                            {ingredient}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Add to Cart Section */}
                  <div className="flex items-center justify-between mt-4">
                    {cardId?.includes(dish?._id) ? (
                      <button
                        onClick={() => setRemoveCard(dish?._id)}
                        className="flex items-center space-x-2 bg-red-600 text-white px-6 py-3 rounded-full hover:bg-red-700 transition-colors"
                      >
                        <ShoppingCart className="w-5 h-5" />

                        <span className="font-semibold">Remove to Cart</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => setAddToCard(dish)}
                        className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors"
                      >
                        <ShoppingCart className="w-5 h-5" />

                        <span className="font-semibold">Add to Cart</span>
                      </button>
                    )}

                    <div className="flex items-center space-x-2 text-yellow-600">
                      <Star className="w-5 h-5 fill-yellow-600" />
                      <span className="font-semibold">
                        {dish.rating || "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Rest of the component remains the same */}
      {activeTab === "about" && restaurantInfo && (
        <div className="p-8 bg-gray-50">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-3xl font-bold mb-4">Our Story</h2>
              <p className="text-gray-700 leading-relaxed">
                {restaurantInfo.description ||
                  "Culinary Horizons is a celebration of global flavors and innovative cooking techniques."}
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <ChefHat className="text-amber-600 w-10 h-10" />
                <div>
                  <h3 className="font-bold text-xl">Executive Chef</h3>
                  <p className="text-gray-600">
                    {restaurantInfo.chef || "Unknown"}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Clock className="text-blue-600 w-10 h-10" />
                <div>
                  <h3 className="font-bold text-xl">Working Hours</h3>
                  <p className="text-gray-600">
                    {restaurantInfo.workingHours || "Not Available"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "reviews" && (
        <div className="p-8">
          <h2 className="text-3xl font-bold mb-6">Guest Reviews</h2>
          <p className="text-gray-600 text-center">Coming soon...</p>
        </div>
      )}
    </div>
  );
};

export default RestaurantDetailFoodShow;
