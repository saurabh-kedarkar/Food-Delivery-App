import { connectionStr } from "@/app/lib/db";
import { FoodModel } from "@/app/lib/foodModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(res, content) {
  const id = await content.params.id;
  if (!mongoose.connection.readyState) {
    await mongoose.connect(connectionStr);
  }
  try {
    const result = await FoodModel.find({ restoId: id });
    if (!result) {
      return NextResponse.json({
        status: true,
        result: "Restaurant not found",
      });
    }
    return NextResponse.json({ status: true, result });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ status: false, result: error.message });
  }
}

export async function DELETE(res, content) {
  const id = await content.params.id;
  try {
    if (!mongoose.connection.readyState) {
      await mongoose.connect(connectionStr);
    }
    const result = await FoodModel.findByIdAndDelete(id);
    if (!result) {
      return NextResponse.json({
        status: false,
        message: "Food not found",
      });
    }

    return NextResponse.json({ status: true, result });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ status: false, result: error.message });
  }
}

export async function PUT(res) {
  const data = await res.json();
  // return NextResponse.json({ status: false, data });

  try {
    if (!mongoose.connection.readyState) {
      await mongoose.connect(connectionStr);
    }
    const result = await FoodModel.findByIdAndUpdate(data._id, data, {
      new: true,
    });
    if (!result) {
      return NextResponse.json({
        status: false,
        message: "Food not found",
      });
    }
    return NextResponse.json({ status: true, result });
  } catch (error) {
    console.log("Failed to getFood", error);
    return NextResponse.json({ status: false, error });
  }
}
