import { useSelector } from "react-redux";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function Pagination({ currentPage, setSearchParams }) {
  const { status } = useSelector((state) => state.products);
  const totalPages = 3;

  const changePage = (newPage) => {
    setSearchParams({ page: newPage });
  };

  return (
    <div className="py-6 flex justify-center items-center">
      {status !== "loading" && (
        <div className="flex items-center space-x-4 bg-gradient-to-r from-indigo-500 to-blue-500 shadow-lg rounded-full px-6 py-3 border border-indigo-300">
          {/* Previous Button */}
          <button
            onClick={() => changePage(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
            className={`p-3 rounded-full flex items-center justify-center text-lg transition-all duration-300 
              ${currentPage === 1 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-white text-indigo-600 hover:bg-indigo-600 hover:text-white"}`}
          >
            <FaChevronLeft />
          </button>

          {/* Page Numbers */}
          <div className="flex items-center space-x-2">
            {[...Array(totalPages)].map((_, index) => {
              const pageNum = index + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => changePage(pageNum)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 
                    ${currentPage === pageNum ? "bg-white text-indigo-600 shadow-md" : "bg-indigo-600 text-white hover:bg-white hover:text-indigo-600"}`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          {/* Next Button */}
          <button
            onClick={() => changePage(Math.min(currentPage + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`p-3 rounded-full flex items-center justify-center text-lg transition-all duration-300 
              ${currentPage === totalPages ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-white text-indigo-600 hover:bg-indigo-600 hover:text-white"}`}
          >
            <FaChevronRight />
          </button>
        </div>
      )}
    </div>
  );
}