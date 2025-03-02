import { Link } from "react-router-dom";

export default function Success() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-white">
      <h2 className="text-3xl font-bold text-green-600 mb-4">Payment Successful 🎉</h2>
      <p className="text-lg text-gray-700 mb-6">
        Thank you for your purchase! Your order is being processed.
      </p>
      <Link
        to="/"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
