import { useSelector, useDispatch } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { add, remove } from "../redux/slices/CartSlice";
import { useEffect, useState } from "react";
import { fetchProducts } from "../redux/slices/ProductSlice";
import { Spinner } from "../components/Spinner";


export default function SingleProduct() {
  const { cart } = useSelector((state) => state);
  const { selectedItem: product, status } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productId } = useParams();
  const [showMore, setShowMore] = useState(false);



  useEffect(() => {
    if (productId) {
      dispatch(fetchProducts({ id: Number(productId) }));
    }
  }, [productId, dispatch]);

  if (status === "loading") {
    return (
      <div className="h-screen w-full flex justify-center items-center text-2xl font-semibold text-[#50a060]">
        <Spinner />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="h-screen w-full flex justify-center items-center text-2xl font-semibold text-[#50a060]">
        Product not found
      </div>
    );
  }

  const addToCart = () => {
    dispatch(add(product));
    toast.success("Item added to Cart");
  };

  const removeFromCart = () => {
    dispatch(remove(product.id));
    toast.error("Item removed from Cart");
  };

  const handleBuyNow = () => {
    if (!cart.some((p) => p.id === product.id)) {
      dispatch(add(product));
      toast.success("Item Added")
    }
    navigate("/checkout");
  };

  return (
    <div className="max-w-4xl mx-auto p-4 mt-16">
      <div className="flex flex-col md:flex-row gap-6 bg-white shadow-lg rounded-lg p-4 border border-gray-200 hover:shadow-xl transition-shadow">

        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={product.image}
            alt={product.title}
            className="w-full max-h-[450px] object-contain rounded-lg"
          />
        </div>

        <div className="w-full md:w-1/2 flex flex-col gap-2">
          <h1 className="text-md font-bold text-gray-800">{product.title}</h1>
          <p className="text-gray-600 text-sm capitalize"><span className="font-semibold text-gray-700">Brand:</span> {product.brand}</p>
          <p className="text-gray-600 text-sm"><span className="font-semibold text-gray-700">Model:</span> {product.model}</p>
          <div className="flex gap-2">
            <p className="text-gray-600 text-sm capitalize"><span className="font-semibold text-gray-700">Category:</span> {product.category}</p>
            <p className="text-gray-600 text-sm capitalize"><span className="font-semibold text-gray-700">Color:</span> {product.color}</p>
          </div>

          <div className="flex items-center gap-3 mt-2">
            <p className="text-green-600 font-bold text-lg">
              ${product.discount > 0 ? (product.price * (1 - product.discount / 100)).toFixed(2) : product.price}
            </p>
            {product.discount > 0 && (
              <span className="text-red-500 font-semibold bg-red-100 px-2 py-1 rounded text-xs">
                -{product.discount}%
              </span>
            )}
            {product.discount > 0 && (
              <p className="text-gray-500 line-through text-sm">${product.price}</p>
            )}
          </div>

          <p className="text-gray-700 text-xs">
            {showMore ? product.description : `${product.description.substring(0, 80)}...`}
            <button
              className="text-blue-600 font-semibold ml-2"
              onClick={() => setShowMore(!showMore)}
            >
              {showMore ? "Show Less" : "Show More"}
            </button>
          </p>

          <div className="flex flex-row gap-4 mt-4 w-full">
            {cart.some((p) => p.id === product.id) ? (
              <button
                className="bg-red-600 text-white px-3 py-2 rounded-md text-xs font-semibold hover:bg-red-700 transition w-full max-w-[150px] h-10"
                onClick={removeFromCart}
              >
                Remove from Cart
              </button>
            ) : (
              <button
                className="bg-blue-600 text-white px-3 py-2 rounded-md text-xs font-semibold hover:bg-blue-700 transition w-full max-w-[150px] h-10"
                onClick={addToCart}
              >
                Add to Cart
              </button>
            )}

            <button
              className="bg-green-500 text-white px-3 py-2 rounded-md text-xs font-semibold hover:bg-green-700 transition w-full max-w-[150px] h-10"
              onClick={handleBuyNow}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link
          to={`/category/${product.category}`}
          className="text-blue-600 font-semibold hover:underline capitalize"
        >
          Explore More in {product.category}
        </Link>
      </div>
    </div>
  );
}