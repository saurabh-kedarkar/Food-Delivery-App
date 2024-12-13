import mongoose from "mongoose";

const foodSchema = new mongoose.Schema(
  {
    foodName: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
      required: true,
    },
    restoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "restaurants",
      required: true,
    },
  },
  { timestamps: true }
);

export const FoodModel =
  mongoose.models.foods || mongoose.model("foods", foodSchema);
