"use client";
import React, { useState, useEffect } from "react";
import { Trash2, Plus, Minus } from "lucide-react";
import Header from "../_components/CustomerHeader";
import useFoodStore from "../_components/BannerSearchField";
import Footer from "../_components/Footer";
import Link from "next/link";

// Sample initial cart data (you'll replace this with your actual cart state management)

const initialCartItems = [
  {
    id: 1,
    name: "Classic Burger",
    price: 12.99,
    quantity: 2,
    image: "/api/placeholder/200/200",
  },
  {
    id: 2,
    name: "Margherita Pizza",
    price: 15.5,
    quantity: 1,
    image: "/api/placeholder/200/200",
  },
];

const CartPage = () => {
  const addtocard = JSON.parse(localStorage.getItem("card"));
  const [cartItems, setCartItems] = useState(addtocard);
  const [totalPrice, setTotalPrice] = useState(0);
  const { removeCard, setRemoveCard } = useFoodStore();

  // Calculate total price whenever cart items change
  useEffect(() => {
    const total = cartItems.reduce(
      (acc, item) => acc + item.price * (item.quantity || 1),
      0
    );
    setTotalPrice(total);
  }, [cartItems, removeCard]);

  // Function to increase item quantity
  const increaseQuantity = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Function to decrease item quantity
  const decreaseQuantity = (id) => {
    setCartItems(
      cartItems
        .map((item) =>
          item.id === id && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Function to remove item from cart
  const removeItem = (id) => {
    // setCartItems(cartItems.filter((item) => item.id !== id));
    setRemoveCard(id);
  };

  return (
    <>
      <Header />
      <div className="bg-gray-200 min-h-screen p-6 pt-[100px]">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-6">
            <h1 className="text-3xl font-bold text-white text-center">
              Your Cart
            </h1>
          </div>

          {addtocard.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-2xl text-gray-500">Your cart is empty</p>
              <button className="mt-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-500 transition">
                Continue Ordering
              </button>
            </div>
          ) : (
            <>
              <div className="divide-y divide-gray-200">
                {addtocard?.map((item) => (
                  <div
                    key={item?._id}
                    className="flex items-center p-4 hover:bg-gray-50 transition"
                  >
                    {/* Item Image */}
                    <img
                      src={item?.image}
                      alt={item?.foodName}
                      className="w-24 h-24 object-cover rounded-lg mr-6"
                    />

                    {/* Item Details */}
                    <div className="flex-grow">
                      <h3 className="text-xl font-semibold">
                        {item?.foodName}
                      </h3>
                      <p className="text-gray-600">{item?.description}</p>
                      {/* <p className="text-gray-600">${item?.price.toFixed(2)}</p> */}
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-3">
                      {/* <button
                        onClick={() => decreaseQuantity(item?._id)}
                        className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition"
                      >
                        <Minus size={20} />
                      </button>
                      <span className="font-bold text-lg">
                        {item?.quantity || 1}
                      </span>
                      <button
                        onClick={() => increaseQuantity(item?._id)}
                        className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition"
                      >
                        <Plus size={20} />
                      </button> */}
                      <h3 className="text-xl font-semibold text-pink-500">
                        ${item?.price.toFixed(2)}
                      </h3>
                    </div>

                    {/* Remove Item */}
                    <button
                      onClick={() => removeItem(item?._id)}
                      className="ml-4 text-red-500 hover:text-red-700 transition"
                    >
                      <Trash2 size={24} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="bg-gray-100 p-6 divide-y divide-gray-400">
                <div className="flex justify-between items-center p-4">
                  <h2 className="text-2xl font-bold">Food Charges</h2>
                  <p className="text-3xl font-bold text-pink-400">
                    ${totalPrice.toFixed(2)}
                  </p>
                </div>
                <div className="flex justify-between items-center p-4">
                  <h2 className="text-2xl font-bold">Delivery Charges</h2>
                  <p className="text-3xl font-bold text-pink-400">$50.00</p>
                </div>
                <div className="flex justify-between items-center p-4">
                  <h2 className="text-2xl font-bold">Total</h2>
                  <p className="text-3xl font-bold text-pink-400">
                    ${totalPrice + 50 + ".00"}
                  </p>
                </div>
                <Link href="/checkout">
                  <button className="w-full mt-6 bg-purple-500 text-white py-3 rounded-full text-xl font-bold hover:bg-purple-600 transition">
                    Proceed to Checkout
                  </button>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CartPage;
