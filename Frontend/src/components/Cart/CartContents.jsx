import React from "react";
import { RiDeleteBin3Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { updateCartItemQuantity, removeFromCart } from "../../redux/slice/cartSlice";

const CartContents = ({ cart, userId, guestId }) => {
  const dispatch = useDispatch();
  //  handle adding subtracting
  const handleAddToCart = (productId, delta, quntity, size, color) => {
    const newQuantity = quntity + delta;
    if (newQuantity >= 1) {
      dispatch(
        updateCartItemQuantity({
          userId,
          guestId,
          productId,
          size,
          color,
          quantity: newQuantity,
        })
      )
        .then(() => {
          console.log("Cart updated successfully");
        })
        .catch((error) => {
          console.error("Failed to update cart:", error);
        });
    }
  };
  const handleRemoveFromCart = (productId, size, color) => {
    dispatch(
      removeFromCart({
        userId,
        guestId,
        productId,
        size,
        color,
      })
    )
      .then(() => {
        console.log("Item removed from cart successfully");
      })
      .catch((error) => {
        console.error("Failed to remove from cart:", error);
      });
  };
  return (
    <div>
      {cart.products.map((product, index) => (
        <div
          key={index}
          className="flex items-start justify-between py-4 border-b"
        >
          <div className="flex items-start">
            <img
              src={product.image}
              alt={product.name}
              className="w-20 h-24 object-cover mr-4 rounded"
            />
            <div>
              <h3>{product.name} </h3>
              <p className="text-sm text-gray-500">
                size:{product.size}| color:{product.color}
              </p>
              <div className="flex items-center mt-2">
                <button onClick={()=>{handleAddToCart(product.productId,1,product.quantity,product.size,product.color)}} className="border rounded px-2 py-1 text-xl font-medium">
                  +
                </button>
                <span className="mx-4">{product.quantity}</span>
                <button onClick={()=>{handleAddToCart(product.productId,-1,product.quantity,product.size,product.color)}} className="border rounded px-2 py-1 text-xl font-medium">
                  -
                </button>
              </div>
            </div>
          </div>
          <div>
            <p>${product.price.toLocaleString()}</p>
            <button onClick={()=>{handleRemoveFromCart(product.productId,product.size,product.color)}}>
              <RiDeleteBin3Line className="h-6 w-6 mt-2 text-red-600" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartContents;
