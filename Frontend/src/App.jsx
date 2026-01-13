import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import UserLayout from "./components/Layout/UserLayout";
import AdminLayout from "./components/Admin/AdminLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import CollectionPage from "./pages/CollectionPage";
import { Toaster } from "sonner";
import ProductDetails from "./components/Products/ProductDetails";
import Checkout from "./components/Cart/Checkout";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import MyOrderPage from "./pages/MyOrderPage";
import AdminHomePage from "./pages/AdminHomePage";
import Usermanagement from "./components/Admin/Usermanagement";
import Productmanagement from "./components/Admin/Productmanagement";
import EditProductPage from "./components/Admin/EditProductPage";
import OrderManagement from "./components/Admin/OrderManagement";

import { Provider } from "react-redux";
import store from "./redux/store";
import ProtectedRoute from "./components/Common/ProtectedRoute";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Toaster postion="top-right" />
        <Routes>
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Home />}></Route>
            <Route path="login" element={<Login />}></Route>
            <Route path="register" element={<Register />}></Route>
            <Route path="profile" element={<Profile />}></Route>
            <Route
              path="collections/:collection"
              element={<CollectionPage />}
            ></Route>
            <Route path="product/:id" element={<ProductDetails />}></Route>
            <Route path="checkout" element={<Checkout />}></Route>
            <Route
              path="order-confirmation"
              element={<OrderConfirmationPage />}
            ></Route>
            <Route path="/my-orders" element={<MyOrderPage />}></Route>
            <Route path="order/:id" element={<OrderDetailsPage />}></Route>
          </Route>

          <Route path="/admin" element={<ProtectedRoute role="admin"><AdminLayout /></ProtectedRoute>}>
            <Route index element={<AdminHomePage />}></Route>
            <Route path="users" element={<Usermanagement />}></Route>
            <Route path="products" element={<Productmanagement />}></Route>
            <Route
              path="products/:id/edit"
              element={<EditProductPage />}
            ></Route>
            <Route path="orders" element={<OrderManagement />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
