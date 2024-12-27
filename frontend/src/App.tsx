import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Error from "./pages/Error";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Products from "./pages/Products";
import Product from "./pages/Product";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ConfirmEmail from "./pages/ConfirmEmail";
import WriteOTP from "./pages/WriteOTP";
import Profile from "./pages/Profile";
import ProfileFavorites from "./pages/ProfileFavorites";
import ProfileCart from "./pages/ProfileCart";
import ProfileOrder from "./pages/ProfileOrder";
import UpdatePassword from "./pages/UpdatePassword";
import AllUsers from "./pages/AllUsers";
import AllOrders from "./pages/AllOrders";
import AddProduct from "./pages/AddProduct";
import AllProducts from "./pages/AllProducts";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Products" element={<Products />} />
          <Route path="/Products/:id" element={<Product />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/ConfirmEmail" element={<ConfirmEmail />} />
          <Route path="/WriteOTP" element={<WriteOTP />} />
          <Route path="/UpdatePassword" element={<UpdatePassword />} />
          <Route path="/Profile" element={<Profile />}>
            <Route path="/Profile/Favorites" element={<ProfileFavorites />} />
            <Route path="/Profile/Cart" element={<ProfileCart />} />
            <Route path="/Profile/Order" element={<ProfileOrder />} />
            <Route path="/Profile/AllUsers" element={<AllUsers />} />
            <Route path="/Profile/AllOrders" element={<AllOrders />} />
            <Route path="/Profile/AllProducts" element={<AllProducts />} />
            <Route path="/Profile/AddProduct" element={<AddProduct />} />
          </Route>
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
