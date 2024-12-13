import { MapPin, Phone, Star, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const RestaurantCard = ({ restaurant }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  if (loading) {
    return (
      <div className="flex justify-center items-center ">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }
  return (
    // <Link href={`/explore/${restaurant.name}`}>
    <div
      onClick={() => {
        setLoading(!loading);
        router.push(`/explore/${restaurant._id}`);
      }}
      className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
    >
      <div className="relative h-48 w-full">
        <img
          src={
            restaurant.image ||
            "https://b.zmtcdn.com/data/collections/684397cd092de6a98862220e8cc40aca_1724236728.png"
          }
          alt={restaurant.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {restaurant && (
          <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-full flex items-center">
            <Star className="w-4 h-4 mr-1" />
            {restaurant.rating || 3}
          </div>
        )}
      </div>
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          {restaurant.name}
        </h2>
        <div className="space-y-1 text-gray-600">
          <div className="flex items-center">
            <MapPin className="w-5 h-5 mr-2 text-blue-500" />
            <span>
              {restaurant.address}, {restaurant.city}
            </span>
          </div>
          <div className="flex items-center">
            <Phone className="w-5 h-5 mr-2 text-green-500" />
            <span>{restaurant.contactNo}</span>
          </div>
          <div className="flex items-center">
            <Mail className="w-5 h-5 mr-2 text-red-500" />
            <span>{restaurant.email}</span>
          </div>
        </div>
        {restaurant.cuisine && (
          <div className="mt-2 flex flex-wrap gap-2">
            {restaurant.cuisine.map((type, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
              >
                {type}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantCard;
