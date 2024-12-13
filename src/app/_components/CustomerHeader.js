import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingCart, Plus, User } from "lucide-react";
import useFoodStore from "./BannerSearchField";
import { useRouter } from "next/navigation";

const Header = () => {
  const cardStorage =
    localStorage.getItem("card") && JSON.parse(localStorage.getItem("card"));
  const [cardNumber, setCardNumber] = useState(cardStorage?.length);
  const [cardItem, setCardItem] = useState(cardStorage);
  const router = useRouter();

  const { addToCard, removeCard, setAddToCard, loginUser, setLoginUser } =
    useFoodStore();
  // if (cardStorage.length > 0) {
  //   setAddToCard(cardStorage);
  // }
  useEffect(() => {
    if (addToCard) {
      if (cardNumber) {
        if (cardItem[0]?.restoId !== addToCard.restoId) {
          // If restoId doesn't match, clear existing items and add the new one
          localStorage.removeItem("card");
          setCardNumber(1);
          setCardItem([addToCard]);
          localStorage.setItem("card", JSON.stringify([addToCard]));
        } else {
          const ids = cardStorage?.map((item) => item._id);
          if (!ids.includes(addToCard._id)) {
            const updatedCardItems = [...cardItem, addToCard];
            localStorage.setItem("card", JSON.stringify(updatedCardItems));
            setCardItem(updatedCardItems);
            setCardNumber(updatedCardItems.length);
          }
        }
      } else {
        // If the card is empty, add the first item
        setCardNumber(1);
        setCardItem([addToCard]);
        localStorage.setItem("card", JSON.stringify([addToCard]));
      }
    }
  }, [addToCard]);

  useEffect(() => {
    const localCard = cardItem.filter((item) => item._id !== removeCard);
    setCardItem(localCard);
    setCardNumber(cardNumber - 1);
    localStorage.setItem("card", JSON.stringify(localCard));
    setAddToCard();
  }, [removeCard]);
  return (
    <header className="bg-white shadow-md pr-10 ">
      <div className="container mx-auto flex justify-between items-center py-4 px-6 bg-white z-[1000] fixed">
        {/* Logo or Restaurant Name */}
        <div className="text-2xl font-bold text-green-600">
          <img
            src="https://png.pngtree.com/png-clipart/20220903/ourmid/pngtree-chef-restaurant-logo-png-image_6136204.png"
            alt="Logo"
            width={60}
          />
        </div>

        {/* Navigation Links */}
        <nav>
          <ul className="flex space-x-6 items-center">
            <li>
              <Link
                href="/"
                className="flex items-center text-gray-700 hover:text-green-600 transition"
              >
                {/* < className="mr-2" size={20} /> */}
                Home
              </Link>
            </li>

            <li>
              <Link
                href="/cart"
                className="flex items-center text-gray-700 hover:text-green-600 transition"
              >
                <ShoppingCart className="mr-2" size={20} />
                Cart (
                {cardItem?.length > 0 ? <span>{cardItem.length} </span> : 0})
              </Link>
            </li>
            <li>
              <Link
                href="/add-restaurant"
                className="flex items-center text-gray-700 hover:text-green-600 transition"
              >
                <Plus className="mr-2" size={20} />
                Add Restaurant
              </Link>
            </li>
            {loginUser?.email ? (
              <li>
                <button
                  onClick={() => {
                    localStorage.removeItem("User");
                    setLoginUser(null);
                    router.push("/login");
                  }}
                  className="flex items-center text-gray-700 hover:text-green-600 transition"
                >
                  <Plus className="mr-2" size={20} />
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li>
                  <Link
                    href="/login"
                    className="flex items-center text-gray-700 hover:text-green-600 transition"
                  >
                    <User className="mr-2" size={20} />
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    href="/signup"
                    className="flex items-center text-gray-700 hover:text-green-600 transition"
                  >
                    <Plus className="mr-2" size={20} />
                    SignUp
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
