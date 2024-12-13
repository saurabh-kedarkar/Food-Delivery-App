"use client";
import React, { useState } from "react";
import { CreditCard, MapPin, Truck, Tag, PercentIcon } from "lucide-react";
import Link from "next/link";
import Header from "../_components/CustomerHeader";

const CheckoutPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    country: "",
    zipCode: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Gourmet Truffle Burger",
      description: "Wagyu beef with black truffle aioli",
      price: 24.99,
      quantity: 1,
      image: "/api/placeholder/300/300",
    },
    {
      id: 2,
      name: "Margherita Artisan Pizza",
      description: "San Marzano tomatoes, fresh mozzarella, basil",
      price: 18.5,
      quantity: 1,
      image: "/api/placeholder/300/300",
    },
  ]);

  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [deliveryOption, setDeliveryOption] = useState("standard");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Calculate totals
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const deliveryFee = deliveryOption === "express" ? 5.99 : 2.99;
  const totalBeforeDiscount = subtotal + deliveryFee;
  const finalTotal = totalBeforeDiscount * (1 - discount);

  // Promo code handler
  const applyPromoCode = () => {
    const validPromos = {
      FIRST20: 0.2,
      HUNGRY30: 0.3,
    };
    setDiscount(validPromos[promoCode.toUpperCase()] || 0);
  };

  return (
    <>
      <Header />
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen p-6 pt-[100px]">
        <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden">
          {/* Animated Header */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-6 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <CreditCard size={36} className="text-white" />
              <h1 className="text-3xl font-bold text-white">Checkout</h1>
            </div>
          </div>

          {/* Checkout Content */}
          <div className="grid md:grid-cols-3 gap-6 p-6">
            {/* Shipping & Payment Details */}
            <div className="md:col-span-2 space-y-6">
              {/* Shipping Information */}
              <div className="bg-white shadow-md rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <MapPin className="mr-2 text-purple-600" size={24} />
                  <h3 className="font-bold text-lg">Shipping Information</h3>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-lg"
                      placeholder="John"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-lg"
                      placeholder="Doe"
                      required
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg"
                    placeholder="john.doe@example.com"
                    required
                  />
                </div>

                <div className="mt-4">
                  <label className="block mb-2">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg"
                    placeholder="123 Main St"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-4 mt-4">
                  <div>
                    <label className="block mb-2">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-lg"
                      placeholder="New York"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2">Country</label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-lg"
                      required
                    >
                      <option value="">Select Country</option>
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-2">Zip Code</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-lg"
                      placeholder="10001"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Payment Details */}
              <div className="bg-white shadow-md rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <CreditCard className="mr-2 text-purple-600" size={24} />
                  <h3 className="font-bold text-lg">Payment Details</h3>
                </div>

                <div>
                  <label className="block mb-2">Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg"
                    placeholder="1234 5678 9012 3456"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block mb-2">Expiry Date</label>
                    <input
                      type="text"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-lg"
                      placeholder="MM/YY"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2">CVV</label>
                    <input
                      type="text"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-lg"
                      placeholder="123"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary & Extras */}
            <div className="bg-gray-50 p-6 rounded-lg space-y-6">
              {/* Promo Code Section */}
              <div className="bg-white shadow-md rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Tag className="mr-2 text-purple-600" size={24} />
                  <h3 className="font-bold text-lg">Promo Code</h3>
                </div>
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Enter promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-grow p-2 border rounded-l-lg"
                  />
                  <button
                    onClick={applyPromoCode}
                    className="bg-purple-600 text-white px-4 rounded-r-lg hover:bg-purple-700"
                  >
                    Apply
                  </button>
                </div>
              </div>

              {/* Delivery Options */}
              <div className="bg-white shadow-md rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <MapPin className="mr-2 text-purple-600" size={24} />
                  <h3 className="font-bold text-lg">Delivery</h3>
                </div>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="delivery"
                      value="standard"
                      checked={deliveryOption === "standard"}
                      onChange={() => setDeliveryOption("standard")}
                    />
                    <span>Standard Delivery ($2.99)</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="delivery"
                      value="express"
                      checked={deliveryOption === "express"}
                      onChange={() => setDeliveryOption("express")}
                    />
                    <span>Express Delivery ($5.99)</span>
                  </label>
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-white shadow-md rounded-lg p-4">
                <h3 className="font-bold text-lg mb-3 flex items-center">
                  <PercentIcon className="mr-2 text-purple-600" size={24} />
                  Order Summary
                </h3>
                <div className="space-y-2">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <div>
                        <span className="font-medium">{item.name}</span>
                        <span className="text-gray-500 ml-2">
                          x{item.quantity}
                        </span>
                      </div>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="border-t pt-2"></div>
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>${deliveryFee.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>
                        -${(totalBeforeDiscount * discount).toFixed(2)}
                      </span>
                    </div>
                  )}
                  <div className="border-t pt-2 flex justify-between font-bold text-xl">
                    <span>Total</span>
                    <span className="text-purple-600">
                      ${finalTotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <Link href="/order">
                <button className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 rounded-full text-xl font-bold hover:from-purple-700 hover:to-pink-600 transition">
                  Place Order
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
