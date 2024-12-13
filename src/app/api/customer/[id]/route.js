import mongoose from "mongoose";
import { connectionStr } from "@/app/lib/db";
import { NextResponse } from "next/server";
import { RestaurantSchema } from "@/app/lib/restaurantModel";
import { FoodModel } from "@/app/lib/foodModel";

export async function GET(req, content) {
  try {
    if (!mongoose.connection.readyState) {
      await mongoose.connect(connectionStr);
    }
    const id = content.params.id;
    const restaurant = await RestaurantSchema.findById(id);
    if (!restaurant) {
      return NextResponse.json({
        status: false,
        message: "Restaurant not found",
      });
    }
    const foods = await FoodModel.find({ restoId: id });
    return NextResponse.json({ status: true, restaurant, foods });
    // console.log("id: " + id);
    // return NextResponse.json({ status: true, message: content.params.id });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ status: false, message: error.message });
  }
}
