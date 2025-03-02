import { FaTrashAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { remove } from "../redux/slices/CartSlice";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";

export function CartItems({ item }) {
  const dispatch = useDispatch();

  const removeFromCart = () => {
    dispatch(remove(item.id));
    toast.error("Item removed from Cart");
  };

  const discountPercentage = item.discount || 0;
  const discountedPrice = (item.price * (1 - discountPercentage / 100)).toFixed(2);

  return (
    <div className="p-6 bg-gradient-to-r from-white to-blue-50 border border-gray-300 shadow-lg hover:shadow-xl rounded-xl w-full transition-all duration-300">
      {/* Image and Title Section */}
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <NavLink
          to={`/${item.id}`}
          className="w-full sm:w-32 h-40 sm:h-32 flex justify-center items-center bg-white rounded-lg overflow-hidden shadow-md hover:scale-105 transition-transform duration-300"
        >
          <img
            src={item.image}
            alt="cart item"
            className="w-full h-full object-contain"
          />
        </NavLink>

        <NavLink
          to={`/${item.id}`}
          className="text-base sm:text-xl font-semibold text-blue-700 hover:text-blue-800 hover:underline line-clamp-2 text-center sm:text-left"
        >
          {item.title.length > 60 ? item.title.substring(0, 60) + "..." : item.title}
        </NavLink>
      </div>

      {/* Price and Remove Button */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 sm:mt-3">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <span className="text-gray-500 line-through text-sm sm:text-base">${item.price.toFixed(2)}</span>
          <span className="text-lg sm:text-xl font-extrabold text-green-600">${discountedPrice}</span>
          {discountPercentage > 0 && (
            <span className="text-xs sm:text-sm text-red-600 font-semibold bg-red-100 px-2 py-1 rounded-full">-{discountPercentage}% OFF</span>
          )}
        </div>

        <button
          onClick={removeFromCart}
          className="group w-10 h-10 rounded-full border border-red-400 bg-red-100 flex justify-center items-center 
          hover:border-red-600 hover:bg-red-600 transition-all duration-300 mt-4 sm:mt-0"
        >
          <FaTrashAlt
            fontSize={20}
            className="text-red-600 group-hover:text-white transition-all duration-300"
          />
        </button>
      </div>
    </div>
  );
}