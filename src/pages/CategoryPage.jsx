import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/slices/ProductSlice";
import { useParams } from "react-router-dom";
import { Spinner } from "../components/Spinner";
import { Product } from "../components/Product";

export default function CategoryPage() {
    const { category } = useParams();
    const dispatch = useDispatch();
    const { items, status } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchProducts({ category: category.toLowerCase() }));
    }, [category, dispatch]);

    return (
        <div className="min-h-screen flex flex-col items-center pt-20 pb-4 px-4 bg-white">
            {
                status === "loading" ? (
                    <Spinner />
                ) : items.length > 0 ? (
                    <div className="w-full max-w-6xl">
                        <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-6">
                            Explore our <span className="text-blue-600 lowercase">{category}</span> collection
                        </h2>

                        <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center">
                            {items.map((item) => (
                                <Product key={item.id} item={item} />
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="h-screen w-full flex justify-center items-center text-lg font-semibold text-red-500">
                        Sorry, no products available.
                    </div>
                )
            }
        </div>
    );
}