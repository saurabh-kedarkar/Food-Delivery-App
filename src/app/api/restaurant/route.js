import { connectionStr } from "@/app/lib/db";
import { RestaurantSchema } from "@/app/lib/restaurantModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function GET() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(`${connectionStr}`);
  }

  try {
    const data = await RestaurantSchema.find();
    return NextResponse.json({ result: true, data });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({ result: false, error: error.message });
  }
}

export async function POST(req) {
  const data = await req.json();
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(`${connectionStr}`);
  }
  try {
    if (data.login) {
      const result = await RestaurantSchema.findOne({
        email: data.email,
      });
      if (!result) {
        return NextResponse.json({
          sucess: false,
          error: "Invalid email Please try again",
        });
      }
      const isMatch = await bcrypt.compare(data.password, result.password);
      if (!isMatch) {
        return NextResponse.json({
          sucess: false,
          error: "Invalid password please try again",
        });
      }
      return NextResponse.json({ sucess: true, result });
    } else {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      if (!hashedPassword) {
        return NextResponse.json({
          sucess: false,
          error: "Error hashing password",
        });
      }
      const name = await RestaurantSchema.findOne({
        name: data.name,
      });
      if (name) {
        return NextResponse.json({
          sucess: false,
          error: "Restaurant name already exists",
        });
      }
      const email = await RestaurantSchema.findOne({
        email: data.email,
      });
      if (email) {
        return NextResponse.json({
          sucess: false,
          error: "Email already exists",
        });
      }
      const contactNo = await RestaurantSchema.findOne({
        contactNo: data.contactNo,
      });
      if (contactNo) {
        return NextResponse.json({
          sucess: false,
          error: "Contact number already exists",
        });
      }
      const restaurant = new RestaurantSchema({
        name: data.name,
        email: data.email,
        address: data.address,
        city: data.city,
        contactNo: data.contactNo,
        password: hashedPassword,
      });
      const result = await restaurant.save();
      return NextResponse.json({ sucess: true, result });
    }
  } catch (error) {
    console.error("Error saving data:", error);
    return NextResponse.json({ result: false, error: error.message });
  }
}
