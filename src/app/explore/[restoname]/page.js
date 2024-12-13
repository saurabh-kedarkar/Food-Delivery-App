"use client";
import React, { useState, use, useEffect } from "react";
import {
  Heart,
  Star,
  Share2,
  Clock,
  MapPin,
  Utensils,
  Phone,
} from "lucide-react";
import Header from "@/app/_components/CustomerHeader";
import axios from "axios";
import SocialShareModal from "@/app/_components/SocialShareModal";
import RestaurantDestailFoodShow from "@/app/_components/RestaurantDestailFoodShow";
const page = ({ params }) => {
  const { restoname } = use(params);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);
  const [resto, setResto] = useState([]);
  const [restoFood, setRestoFood] = useState([]);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
  };

  useEffect(() => {
    const handleResto = async () => {
      try {
        const url = `http://localhost:3000/api/customer/${restoname}`;
        const response = await axios.get(url);
        if (response.data.status) {
          setResto(response.data.restaurant);
          setRestoFood(response.data.foods);
          setLoading(false);
        } else {
          console.error("Error fetching resto");
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    handleResto();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }
  return (
    <>
      <Header />
      {isShareModalOpen && (
        <SocialShareModal
          restaurant={resto}
          onClose={() => setIsShareModalOpen(false)}
        />
      )}
      <div className="relative w-full h-[700px] overflow-hidden">
        {/* Gradient Overlay Background */}
        <div
          className="absolute inset-0 bg-cover bg-center filter shadow-2xl "
          style={{
            backgroundImage: `url(${
              "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D" ||
              "/api/placeholder/1200/700"
            })`,
            background: `linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.4)), url(${
              "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D" ||
              "/api/placeholder/1200/700"
            })`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.8,
          }}
        />

        {/* Content Container */}
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Restaurant Logo and Basic Info */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white/30">
                  <img
                    src={
                      "https://b.zmtcdn.com/data/collections/684397cd092de6a98862220e8cc40aca_1724236728.png" ||
                      "/api/placeholder/150/150"
                    }
                    alt={`${resto.name} logo`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-white mb-2">
                    {resto.name}
                  </h1>
                  <div className="flex items-center space-x-2 text-white/80">
                    <Star className="w-5 h-5 text-yellow-400" />
                    <span>
                      {/* {restaurant.rating} ({restaurant.reviewCount} reviews) */}
                      5 (216 reviews)
                    </span>
                  </div>
                </div>
              </div>

              {/* Restaurant Details */}
              <div className="space-y-4 text-white">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-6 h-6 text-red-400" />
                  <span>{resto?.address + "," + resto?.city}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-6 h-6 text-green-400" />
                  <span>Open: 10AM - 8PM</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Utensils className="w-6 h-6 text-blue-400" />
                  <span>Pure Veg</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-6 h-6 text-purple-400" />
                  <span>9565859563</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex space-x-4">
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`p-3 rounded-full transition ${
                    isFavorite
                      ? "bg-red-500 text-white"
                      : "bg-white/20 hover:bg-white/40 text-white"
                  }`}
                >
                  <Heart className="w-6 h-6" />
                </button>
                <button
                  onClick={() => setIsShareModalOpen(true)}
                  className="p-3 bg-white/20 hover:bg-white/40 rounded-full text-white"
                >
                  <Share2 className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Booking and Order Section */}
            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Quick Actions
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-lg transition transform hover:scale-105 flex items-center justify-center space-x-2">
                    <Clock className="w-5 h-5" />
                    <span className="text-sm">Book a Table</span>
                  </button>
                  <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-4 rounded-lg transition transform hover:scale-105 flex items-center justify-center space-x-2">
                    <Utensils className="w-5 h-5" />
                    <span className="text-sm">Order Online</span>
                  </button>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Special Offers
                </h2>
                <div className="text-white/80">
                  <p>🍽️ 20% off on first online order</p>
                  <p>🎉 Free dessert with table bookings</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <RestaurantDestailFoodShow restoFood={restoFood} />
    </>
  );
};

export default page;
