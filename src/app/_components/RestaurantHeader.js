"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
const RestaurantHeader = () => {
  const [details, setDetails] = useState();
  const router = useRouter();
  const path = usePathname();
  useEffect(() => {
    const User = localStorage.getItem("restaurantUser");
    if (!User && path == "/restaurant/dashboard") {
      router.push("/restaurant");
    } else if (User && path == "/restaurant") {
      router.push("/restaurant/dashboard");
    } else {
      setDetails(User);
    }
  });
  return (
    <div className="header-wrapper">
      <div className="logo">
        <img
          src="https://png.pngtree.com/png-clipart/20220903/ourmid/pngtree-chef-restaurant-logo-png-image_6136204.png"
          alt="Logo"
          width={60}
        />
      </div>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        {details ? (
          <>
            <li>
              <Link href="/profile">Profile</Link>
            </li>
            <li
              onClick={() => {
                toast.success("Logged Out Successfully");
                localStorage.removeItem("restaurantUser");
                router.push("/restaurant");
              }}
            >
              <button>logout</button>
            </li>
          </>
        ) : (
          <li>
            <Link href="/restaurant">Login/Signup</Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default RestaurantHeader;
