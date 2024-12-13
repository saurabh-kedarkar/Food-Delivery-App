"use client";
import CustomerHeader from "./_components/CustomerHeader";
import CustomerBanner from "./_components/CustomerBanner";
import RestaurantList from "./_components/RestaurantList";
import { useState } from "react";
import useFoodStore from "./_components/BannerSearchField";

export default function Home() {
  return (
    <div className="">
      <CustomerHeader />
      <div>
        <CustomerBanner />
      </div>
      <RestaurantList />
    </div>
  );
}
