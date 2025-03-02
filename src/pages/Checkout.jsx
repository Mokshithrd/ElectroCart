import { useSelector, useDispatch } from "react-redux";

import { useState } from "react";
import { clearCart } from "../redux/slices/CartSlice";
import { toast } from "react-hot-toast";

export default function Checkout() {
  const { cart } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [address, setAddress] = useState("");

  // Calculate total amount with safe defaults
  const totalAmount = cart.reduce((acc, item) => {
    const price = item.price || 0;
    const discount = item.discount || 0;
    const quantity = item.quantity || 1;
    return acc + price * (1 - discount / 100) * quantity;
  }, 0);

  const handlePayment = () => {
    if (!address.trim()) {
      toast.error("Please enter a valid address");
      return;
    }
    toast("🚀 Yet To Implement Payment Page", {
      duration: 4000,
    });
    dispatch(clearCart());
  };

  return (
    <div className="min-h-screen pt-24 p-6 bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6">Checkout</h2>

        {/* Address Input */}
        <div className="mb-4">
          <label htmlFor="address" className="block mb-2 font-medium">
            Delivery Address:
          </label>
          <textarea
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your delivery address..."
            className="w-full border p-3 rounded-lg focus:outline-blue-500"
            rows="3"
          />
        </div>

        {/* Order Summary */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
          <ul>
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between mb-2">
                <span>{item.title} (x{item.quantity || 1})</span>
                <span>
                  $
                  {(
                    (item.price || 0) *
                    (1 - (item.discount || 0) / 100)
                  ).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-lg font-bold">
            Total: ${totalAmount.toFixed(2)}
          </p>
        </div>

        {/* Payment Button */}
        <button
          onClick={handlePayment}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition duration-300"
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
}
