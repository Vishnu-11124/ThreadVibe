import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import HomePage from "../pages/home/HomePage";
import CategoryPage from "../pages/category/CategoryPage";
import ShopPage from "../pages/shop/ShopPage";
import SingleProduct from "../pages/shop/product/SingleProduct";
import Login from "../components/Login";
import Register from "../components/Register";
import PaymentSuccess from "../components/PaymentSuccess";
import PrivateRoute from "./privateRoute";
import DashboardLayout from "../pages/dashboard/Dashboard";
import UserDMain from "../pages/dashboard/user/UserDMain";
import UserOrders from "../pages/dashboard/user/UserOrders"
import OrderDetails from "../pages/dashboard/user/OrderDetails";
import UserPayments from "../pages/dashboard/user/UserPayments";
import UserReiews from "../pages/dashboard/user/UserReiews";
import UserProfile from "../pages/dashboard/user/UserProfile";
import AdminDMain from "../pages/dashboard/admin/AdminDMain";
import AddProduct from "../pages/dashboard/admin/AddProduct";

const route = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route path="/categories/:categoryName" element={<CategoryPage />} />
      <Route path="/shop" element={<ShopPage />} />
      <Route path="/shop/:id" element={<SingleProduct />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/success" element={<PaymentSuccess />} />
      <Route path="/orders/:orderId" element={<OrderDetails />}/>

      {/* Dashboard */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      >
        {/* user routes */}
        <Route index element={<UserDMain />} />
        <Route path="orders" element={<UserOrders />} />
        <Route path="payments" element={<UserPayments />} />
        <Route path="profile" element={<UserProfile />} />
        <Route path="reviews" element={<UserReiews />} />

        {/* admin routes */}
        <Route
          path="admin"
          element={
            <PrivateRoute role="admin">
              <AdminDMain />
            </PrivateRoute>
          }
        />
        <Route
          path="add-product"
          element={
            <PrivateRoute role="admin">
              <AddProduct />
            </PrivateRoute>
          }
        />
        <Route
          path="manage-products"
          element={
            <PrivateRoute role="admin">
              <h1>Manage products</h1>
            </PrivateRoute>
          }
        />
        <Route
          path="update-products/:id"
          element={
            <PrivateRoute role="admin">
              <h1>Update product</h1>
            </PrivateRoute>
          }
        />
        <Route
          path="users"
          element={
            <PrivateRoute role="admin">
              <h1>Manage users</h1>
            </PrivateRoute>
          }
        />
        <Route
          path="manage-orders"
          element={
            <PrivateRoute role="admin">
              <h1>Manage orders</h1>
            </PrivateRoute>
          }
        />
      </Route>
    </Route>,
  ),
);

export default route;
