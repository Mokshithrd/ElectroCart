import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import {CartItems} from "../components/CartItems";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { setSelectedCategory } from "../redux/slices/CategorySlice";
import { useNavigate } from "react-router-dom";

export  function Cart() {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state);
  const [totalAmt, setTotalAmt] = useState(0);
  const navigate=useNavigate();

  useEffect(() => {
    setTotalAmt(cart.reduce((sum, item) => sum + (item.price * (1 - (item.discount || 0) / 100)), 0));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [cart]);

  function handleCheckOut() {
    toast.success("Enter Your Address")
    navigate("/checkout");
    
  }

  return (
    <div className={`${cart.length > 0 ? "mt-24 mb-10 px-4 md:px-10" : "h-screen flex justify-center items-center text-center"}`}>
      {cart.length > 0 ? (
        <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row gap-10 md:gap-16">

          <div className="w-full md:w-2/3 flex flex-col gap-4">
            {cart.map((item, index) => (
              <CartItems key={item.id} item={item} itemIdx={index} />
            ))}
          </div>

          <div className="w-full md:w-1/3 bg-white shadow-lg rounded-lg p-6 self-start sticky top-24">
            <h2 className="md:text-xl font-semibold text-gray-800 uppercase">Your Cart</h2>
            <p className="text-2xl font-bold text-green-700 uppercase my-3">Summary</p>
            <p className="md:text-lg font-medium text-gray-700">
              Total Items: <span className="font-bold">{cart.length}</span>
            </p>
            <p className="md:text-xl font-semibold text-gray-700 mt-4">
              Total Amount: <span className="font-bold text-black">${totalAmt.toFixed(2)}</span>
            </p>

            <button
              onClick={handleCheckOut}
              className="mt-6 w-full py-3 rounded-lg font-bold text-white bg-green-600 border-2 border-green-600 
              hover:bg-white hover:text-green-600 transition-all duration-300 cursor"
            >
              Checkout Now
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center h-screen text-center space-y-4">
          <h2 className="font-semibold text-lg md:text-xl text-gray-700">Your Cart is Empty</h2>
          <NavLink to="/" onClick={() => dispatch(setSelectedCategory("Categories"))}>
            <button className="bg-green-600 text-white text-md uppercase font-semibold py-3 px-6 rounded-lg 
      border-green-600 border-2 hover:bg-white hover:text-green-600 transition-all duration-300">
              Shop Now
            </button>
          </NavLink>
        </div>
      )}
    </div>
  );
}