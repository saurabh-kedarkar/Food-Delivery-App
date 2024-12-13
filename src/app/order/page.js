"use client";
import React, { useEffect, useState } from "react";
import {
  Check,
  Clock,
  MapPin,
  Truck,
  CreditCard,
  ChefHat,
  Pizza,
  Utensils,
  DollarSign,
} from "lucide-react";
import useFoodStore from "../_components/BannerSearchField";
import Header from "../_components/CustomerHeader";

const OrderConfirmationPage = () => {
  const [orderStatus, setOrderStatus] = useState("confirmed");
  const [totalPrice, setTotalPrice] = useState();
  const cardItem = localStorage.getItem("card")
    ? JSON.parse(localStorage.getItem("card"))
    : null;

  console.log("totalPrice", totalPrice);
  // Calculate total price whenever cart items change
  useEffect(() => {
    const total = cardItem.reduce(
      (acc, item) => acc + item.price * (item.quantity || 1),
      0
    );
    setTotalPrice(total);
  }, [cardItem]);
  // Sample order details
  const orderDetails = {
    orderNumber: "#RES-2024-5678",
    restaurant: "Gourmet Bites",
    items: cardItem,
    subtotal: 20,
    tax: 50,
    total: totalPrice + 50 + 20,
    deliveryAddress: "123 Foodie Lane, Culinary City, 12345",
    estimatedDeliveryTime: "30-45 mins",
  };

  // Order status stages
  const statusStages = [
    {
      stage: "confirmed",
      icon: <Check className="text-green-500" />,
      title: "Order Confirmed",
      description: "Your order has been received and is being prepared.",
    },
    {
      stage: "preparing",
      icon: <ChefHat className="text-yellow-500" />,
      title: "Preparing",
      description: "Our chefs are crafting your delicious meal.",
    },
    {
      stage: "out-for-delivery",
      icon: <Truck className="text-blue-500" />,
      title: "Out for Delivery",
      description: "Your order is on its way to you!",
    },
    {
      stage: "delivered",
      icon: <Utensils className="text-purple-500" />,
      title: "Delivered",
      description: "Enjoy your meal!",
    },
  ];

  return (
    <>
      <Header />
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen p-6 pt-[100px]">
        <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-6 text-center">
            <h1 className="text-3xl font-bold text-white">
              Order Confirmation
            </h1>
            <p className="text-white/80 mt-2">Thank you for your order!</p>
          </div>

          {/* Order Details */}
          <div className="grid md:grid-cols-2 gap-6 p-6">
            {/* Left Side: Order Summary */}
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold flex items-center">
                    <Pizza className="mr-2 text-purple-600" size={24} />
                    Order Details
                  </h2>
                  <span className="text-gray-600">
                    {orderDetails.orderNumber}
                  </span>
                </div>

                {orderDetails.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between py-2 border-b"
                  >
                    <div>
                      <span className="font-bold">{item.foodName}</span>
                    </div>
                    <span>${(item.price * 1).toFixed(2)}</span>
                  </div>
                ))}

                <div className="mt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${orderDetails.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${orderDetails.tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-xl border-t pt-2">
                    <span>Total</span>
                    <span className="text-purple-600">
                      ${orderDetails.total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Delivery Information */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-xl font-bold flex items-center mb-4">
                  <MapPin className="mr-2 text-purple-600" size={24} />
                  Delivery Details
                </h2>
                <div className="space-y-2">
                  <p className="flex items-center">
                    <MapPin className="mr-2 text-gray-500" size={20} />
                    {orderDetails.deliveryAddress}
                  </p>
                  <p className="flex items-center">
                    <Clock className="mr-2 text-gray-500" size={20} />
                    Estimated Delivery: {orderDetails.estimatedDeliveryTime}
                  </p>
                </div>
                <p className=" text-center mr-[120px] text-pink-500 cursor-pointer">
                  Add to new Address
                </p>
              </div>
            </div>

            {/* Right Side: Order Status Tracking */}
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-xl font-bold flex items-center mb-4">
                  <Truck className="mr-2 text-purple-600" size={24} />
                  Order Tracking
                </h2>
                <div className="space-y-4">
                  {statusStages.map((status, index) => (
                    <div
                      key={status.stage}
                      className={`flex items-center space-x-4 ${
                        orderStatus === status.stage ||
                        statusStages.findIndex((s) => s.stage === orderStatus) >
                          index
                          ? "opacity-100"
                          : "opacity-50"
                      }`}
                    >
                      <div
                        className={`
                      w-12 h-12 rounded-full flex items-center justify-center
                      ${
                        orderStatus === status.stage ||
                        statusStages.findIndex((s) => s.stage === orderStatus) >
                          index
                          ? "bg-purple-100"
                          : "bg-gray-200"
                      }
                    `}
                      >
                        {status.icon}
                      </div>
                      <div>
                        <h3 className="font-bold">{status.title}</h3>
                        <p className="text-sm text-gray-600">
                          {status.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-xl font-bold flex items-center mb-4">
                  <CreditCard className="mr-2 text-purple-600" size={24} />
                  Payment Details
                </h2>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="text-green-500" size={20} />
                    <span>Paid with Credit Card</span>
                  </div>
                  <span className="font-bold">**** **** **** 4567</span>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-gray-100 p-6 flex justify-between items-center">
            <button className="bg-white border border-purple-600 text-purple-600 px-6 py-2 rounded-full hover:bg-purple-50">
              Need Help?
            </button>
            <button className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700">
              Track Order
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderConfirmationPage;
