import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import register from "../assets/register.webp";
import { registerUser } from "../redux/slice/authSlice";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { userInfo, guestId, success, loading } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  //get redirect parameter
  const redirect = new URLSearchParams(location.search).get("redirect") || "/";
  const isCheckoutRedirect = redirect.includes("checkout");
  useEffect(() => {
    if (userInfo) {
      // User is logged in after registration
      if (cart?.products?.length > 0 && guestId) {
        // Handle cart merge if needed
        navigate(isCheckoutRedirect ? "/checkout" : "/profile");
      } else {
        navigate(isCheckoutRedirect ? "/checkout" : "/profile");
      }
    } else if (success && !userInfo) {
      // Registration successful but no auto-login, redirect to login
      navigate("/login");
    }
  }, [userInfo, guestId, cart, navigate, isCheckoutRedirect, success]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser({ name, email, password }));
    console.log("User Registered", { name, email, password });
  };

  return (
    <div className="flex">
      <div className="w-full flex md:1/2 flex-col justify-center items-center p-8 md:p-12">
        <form
          action=""
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white p-8 rounder-lg border shadow-sm"
        >
          <div className="flex justify-center mb-6">
            <h2 className="text-xl font-medium">Rabbit</h2>
          </div>
          <h2 className="text-2xl font-bold text-center mb-6">
            Hey There! 👋{" "}
          </h2>
          <p className="text-center mb-6">
            Enter your details to create an account
          </p>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Name</label>
            <input
              type="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter your Name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter your email address"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter your password"
            />
          </div>
          <button 
            className="w-full bg-black text-white fw-bold hover:bg-gray-800 p-2 rounded"
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign UP"}
          </button>
          <p className="mt-6 text-center text-sm">
            Already have an account?{" "}
            <Link to={`/login?redirect=${encodeURIComponent(redirect)}`} className="text-blue-500">
              Login
            </Link>
          </p>
        </form>
      </div>
      <div className="hidden md:block w-1/2 bg-gray-800">
        <div className="h-full flex flex-col justify-center items-center">
          <img
            src={register}
            alt="Register to account"
            className="h-[750px] w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
