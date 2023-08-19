import { Container } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import Home from "./HomePage/Home";
import BookProductPage from "./BookProductPage/BookProductPage";
import CartPage from "./CartPage/CartPage";
import LoginPage from "./LoginPage/loginPage";
import RegisterPage from "./RegisterPage/registerPage";
import ProfilePage from "./ProfilePage/profilePage";
import ShippingPage from "./ShippingPage/shippingPage";
import PaymentPage from "./PaymentPage/paymentPage";
import PlaceOrderPage from "./PlaceOrderPage/placeOrderPage";
import OrderPage from "./OrderPage/OrderPage";
import UserListPage from "./UserListPage/userListPage";
import UserEditPage from "./UserEditPage/userEditPage";
import ProductListPage from "./ProductListPage/productListPage";
import ProductEditPage from "./ProductEditPage/productEditPage";
import OrderListPage from "./OrderListPage/orderListPage";
function App() {
  return (
    <Router>
      <Header />
      <main className="py-1">
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/shipping" element={<ShippingPage />} />
            <Route path="/placeorder" element={<PlaceOrderPage />} />
            <Route path="/orders/:id" element={<OrderPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/book-product/:id" element={<BookProductPage />} />
            <Route path="/cart/:id?" element={<CartPage />} />

            <Route path="/admin/userlist" element={<UserListPage />} />
            <Route path="/admin/user/:id/edit" element={<UserEditPage />} />

            <Route
              path="/admin/bookproductlist"
              element={<ProductListPage />}
            />
            <Route
              path="/admin/book-product/:id/edit"
              element={<ProductEditPage />}
            />

            <Route
              path="/admin/orderlist"
              element={<OrderListPage />}
            />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
