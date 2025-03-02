import { Routes } from "react-router-dom";
import {Navbar} from "./components/Navbar"
import { Route } from "react-router-dom";
import {Home} from "./pages/Home"
import {Cart} from "./pages/Cart"
import SingleProduct from "./pages/SingleProduct";
import CategoryPage from "./pages/CategoryPage";
import Success from "./pages/Success";
import Checkout from "./pages/Checkout";

const App = () => {
  return (
    <div>
      <div className="bg-[#053262] fixed top-0 w-full z-10">
        <Navbar></Navbar>
      </div>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/:productId" element={<SingleProduct/>}/>
        <Route path="/category/:category" element={<CategoryPage/>}/>
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </div>
  );
};

export default App;