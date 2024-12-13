import { UserSchema } from "@/app/lib/userModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { connectionStr } from "@/app/lib/db";
export async function POST(req) {
  const data = await req.json();
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(`${connectionStr}`);
  }
  try {
    if (data.login == true) {
      const result = await UserSchema.findOne({ email: data.email });
      if (!result) {
        return NextResponse.json({ status: false, message: "User not found" });
      }
      const isMatch = await bcrypt.compare(data.password, result.password);
      if (!isMatch) {
        return NextResponse.json({
          status: false,
          message: "Invalid password",
        });
      }

      return NextResponse.json({ status: true, result });
    } else {
      const email = await UserSchema.findOne({ email: data.email });

      if (email) {
        return NextResponse.json({
          status: false,
          message: "Email already exists",
        });
      }
      const password = await bcrypt.hash(data.password, 10);

      const newUser = await UserSchema({
        Username: data.username,
        password: password,
        email: data.email,
      });
      const result = await newUser.save();
      return NextResponse.json({ status: true, result });
    }
  } catch (error) {
    return NextResponse.json({ status: false, message: error.message });
  }
}
