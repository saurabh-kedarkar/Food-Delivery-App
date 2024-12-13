import React, { useState } from "react";
import { Twitter, Facebook, Linkedin, Whatsapp } from "lucide-react";
const SocialShareModal = ({ restaurant, onClose }) => {
  const shareUrl = `https://yourapp.com/restaurant/${restaurant.id}`;

  const shareLinks = {
    whatsapp: `https://wa.me/?text=${encodeURIComponent(
      `Check out ${restaurant.name} - ${shareUrl}`
    )}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      shareUrl
    )}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      `Check out ${restaurant.name}`
    )}&&url=${encodeURIComponent(shareUrl)}`,
    instagram: "https://www.instagram.com/", // Instagram doesn't allow direct sharing via URL
  };

  const handleShare = (platform) => {
    if (platform === "instagram") {
      // For Instagram, you might want to show a message or copy the text
      navigator.clipboard.writeText(
        `Check out ${restaurant.name} at ${shareUrl}`
      );
      alert(
        "Instagram link copied to clipboard. Please paste in Instagram app."
      );
      return;
    }
    window.open(shareLinks[platform], "_blank");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-6 w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Share Restaurant</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            ×
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            {
              icon: <Twitter className="w-6 h-6 text-blue-400" />,
              platform: "twitter",
              color: "hover:bg-blue-100",
            },
            {
              icon: <Facebook className="w-6 h-6 text-blue-600" />,
              platform: "facebook",
              color: "hover:bg-blue-100",
            },
            {
              icon: <Linkedin className="w-6 h-6 text-blue-700" />,
              platform: "linkedin",
              color: "hover:bg-blue-100",
            },
            {
              icon: (
                <img
                  src="data:image/jpeg;base64,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"
                  alt="WhatsApp"
                  className="w-6 h-6"
                />
              ),
              platform: "whatsapp",
              color: "hover:bg-green-100",
            },
          ].map((item) => (
            <button
              key={item.platform}
              onClick={() => handleShare(item.platform)}
              className={`flex items-center justify-center p-3 rounded-lg ${item.color} transition`}
            >
              {item.icon}
              <span className="ml-2 capitalize">{item.platform}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocialShareModal;
