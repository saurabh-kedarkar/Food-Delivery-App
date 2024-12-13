"use client";
import { useState } from "react";

import "./style.css";
import RestaurantHeader from "../_components/RestaurantHeader";
import RestaurantSingUp from "../_components/RestaurantSingUp";
import RestaurantLogin from "../_components/RestaurantLogin";
import Footer from "../_components/Footer";
import { Toaster } from "react-hot-toast";
const restaurant = () => {
  const [login, setLogin] = useState(true);
  return (
    <>
      <div className="container">
        <RestaurantHeader />
        <div className="container-form">
          {login ? <RestaurantLogin /> : <RestaurantSingUp />}
          <button className="button-link" onClick={() => setLogin(!login)}>
            {login ? "Do not have account? SignUp" : "Already have account?"}
          </button>
        </div>
        <Footer />
        <Toaster />
      </div>
    </>
  );
};

export default restaurant;
