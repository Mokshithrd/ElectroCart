import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {Spinner} from "../components/Spinner";
import {Product} from "../components/Product";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, setPage } from "../redux/slices/ProductSlice";
import Pagination from "../components/Pagination";

export  function Home() {
  const { items, status, currentPage } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    dispatch(setPage(page));
    dispatch(fetchProducts({ page }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page, dispatch]);

  return (
    <div className="min-h-screen flex flex-col items-center pt-24 md:pt-28 pb-4 px-4 sm:px-6 md:px-10 bg-gray-100">
      {status === "loading" ? (
        <Spinner />
      ) : items.length > 0 ? (
        <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-8 w-full max-w-6xl place-items-center">
          {items.map((item) => (
            <Product key={item.id} item={{ ...item, description: item.description.substring(0, 60) + "..." }} />
          ))}
        </div>
      ) : (
        <div className="h-screen w-full flex justify-center items-center text-2xl font-semibold text-[#50a060]">
          No Data Found
        </div>
      )}
      <Pagination currentPage={currentPage} setSearchParams={setSearchParams} />
    </div>
  );
}