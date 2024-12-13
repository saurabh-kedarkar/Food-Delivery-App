import { connectionStr } from "@/app/lib/db";
import { RestaurantSchema } from "@/app/lib/restaurantModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req) {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(connectionStr);
  }
  let result = await RestaurantSchema.find();
  result = result
    .filter((item) => item.city) // Ensure 'city' exists
    .map(
      (item) =>
        item.city.charAt(0).toUpperCase() + item.city.slice(1).toLowerCase()
    );
  result = [...new Set(result.map((item) => item))];
  return NextResponse.json({ status: true, result });
}
