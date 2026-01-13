import React from "react";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import CartContents from "../Cart/CartContents";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CartDrawer = ({ drawerOpen, toggleCartDrawer }) => {
  const navigate = useNavigate();
  const { userInfo, guestId } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const userId = userInfo?._id || guestId;

  const handleCheckout = () => {
    toggleCartDrawer();
    if (!userInfo) {
      navigate("/login");
    } else if (cart?.products?.length > 0) {
      navigate("/checkout");
    }
  };
  return (
    <div
      className={`fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-120 h-full bg-white shadow-lg transform transition-transform duration-300 flex flex-col z-50 ${
        drawerOpen ? "traslate-x-0" : "translate-x-full"
      }`}
    >
      {/* close button */}
      <div className="flex justify-end">
        <button onClick={toggleCartDrawer} className="">
          <IoMdClose className="h-6 w-6 text-gray-600" />
        </button>
      </div>
      {/* Cart content with scrollable area */}
      <div className="grow p-4 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
        {/* Components for cart components */}
        {cart && cart?.products?.length > 0 ? (
          <CartContents cart={cart} userId={userInfo} guestId={guestId} />
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
      {/* Checkout button fixed at bottom */}
      {cart && cart?.products?.length > 0 && (
        <button
          onClick={handleCheckout}
          className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
        >
          Checkout
        </button>
      )}
      <p className="text-sm tracking-tighter text-gray-500 mt-2 text-center">
        Shipping, Taxes, and Discount codes calculated at checkout.
      </p>
    </div>
  );
};

export default CartDrawer;