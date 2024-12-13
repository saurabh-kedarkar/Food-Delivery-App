import { connectionStr } from "@/app/lib/db";
import { FoodModel } from "@/app/lib/foodModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    if (!mongoose.connection.readyState) {
      await mongoose.connect(connectionStr);
    }
    const data = await req.json();
    const newFood = new FoodModel(data);
    const result = await newFood.save();
    return NextResponse.json({ status: true, result });
  } catch (error) {
    return NextResponse.json({ status: false, message: error.message });
  }
}
