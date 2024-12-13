import { connectionStr } from "@/app/lib/db";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { RestaurantSchema } from "@/app/lib/restaurantModel";

export async function GET(request) {
  const queryParams = request.nextUrl.searchParams;

  // Extract query parameters
  const city = queryParams.get("location");
  const restaurant = queryParams.get("restaurant");

  let filter = {};

  if (city && restaurant) {
    // Match both city and restaurant
    filter = {
      $and: [
        { city: { $regex: new RegExp(city, "i") } }, // Case-insensitive match for city
        { name: { $regex: new RegExp(restaurant, "i") } }, // Case-insensitive match for name
      ],
    };
  } else if (city) {
    // Match city only
    filter.city = { $regex: new RegExp(city, "i") };
  } else if (restaurant) {
    // Match restaurant only
    filter.name = { $regex: new RegExp(restaurant, "i") };
  }

  try {
    if (!mongoose.connection.readyState) {
      await mongoose.connect(connectionStr);
    }
    const food = await RestaurantSchema.find(filter);
    return NextResponse.json({
      status: true,
      result: food,
    });
  } catch (error) {
    console.log("error", error);
  }
}
