import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { add, remove } from "../redux/slices/CartSlice";
import { NavLink } from "react-router-dom";


export  function Product({ item }) {
  const { cart } = useSelector((state) => state);
  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(add(item));
    toast.success("Item added to Cart");
  };

  const removeFromCart = () => {
    dispatch(remove(item.id));
    toast.error("Item removed from Cart");
  };

  const discountPercentage = item.discount || 0;
  const discountedPrice = (item.price * (1 - discountPercentage / 100)).toFixed(2);

  return (
    <div 
      className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg hover:shadow-blue-800 transition-transform transform hover:scale-105 p-4 
      w-full sm:w-[95%] max-w-[290px] min-[425px]:max-w-[300px] flex flex-col h-full">
      
      <NavLink to={`/${item.id}`} className="w-full h-48 flex justify-center items-center bg-white rounded-md overflow-hidden">
        <img src={item.image} alt="Not Available" className="w-full h-full object-contain hover:scale-105 transition-transform duration-300" />
      </NavLink>

      <div className="flex-grow flex flex-col">

        <NavLink to={`/${item.id}`} className="text-lg font-semibold text-gray-800 hover:text-green-700 hover:underline line-clamp-2">
          {item.title.length > 50 ? item.title.substring(0, 50) + "..." : item.title}
        </NavLink>
        <p className="text-sm text-gray-500 mt-1 flex-grow">{item.description.substring(0, 50) + "..." }</p>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex flex-col">
            <span className="text-gray-500 line-through text-sm">${item.price.toFixed(2)}</span>
            <span className="text-lg font-bold text-green-600">${discountedPrice}</span>
            {discountPercentage > 0 && <span className="text-xs text-red-600 font-semibold">-{discountPercentage}% OFF</span>}
          </div>

          {
          cart.some((p) => p.id === item.id) ?
          (<button
          className="text-gray-700 border-2 border-blue-700 rounded-full font-semibold 
          text-[12px] p-1 px-3 uppercase 
          hover:bg-blue-700
          hover:text-white transition duration-300 ease-in"
          onClick={removeFromCart}>
            Remove&nbsp;Item
          </button>) :
          (<button
          className="text-slate-500 border-2 border-blue-700 rounded-full font-semibold 
          text-[12px] p-1 px-3 uppercase 
          hover:bg-blue-700
          hover:text-white transition duration-300 ease-in"
          onClick={addToCart}>
            Add&nbsp;to&nbsp;Cart
          </button>)
        }
        
      </div>
    </div>
    </div>
  );
}