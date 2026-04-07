import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import MainLayout from '../layout/MainLayout'
import HomePage from '../pages/home/HomePage'
import CategoryPage from '../pages/category/CategoryPage'
import ShopPage from '../pages/shop/ShopPage'
import SingleProduct from '../pages/shop/product/SingleProduct'
import Login from '../components/Login'
import Register from '../components/Register'
import PaymentSuccess from '../components/PaymentSuccess'



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

      {/* Dashboard */}
      <Route path="/dashboard" element={<h1>dashboard</h1>}>
        
        {/* user routes */}
        <Route path="" element={<h1>User dashboard</h1>} />
        <Route path="orders" element={<h1>Orders</h1>} />
        <Route path="payments" element={<h1>Payments</h1>} />
        <Route path="profile" element={<h1>profile</h1>} />
        <Route path="reviews" element={<h1>Reviews</h1>} />

        {/* admin routes */}
        <Route path="admin" element={<h1>Admin Dashboard</h1>} />
        <Route path="add-new-post" element={<h1>Add post</h1>} />
        <Route path="manage-products" element={<h1>Manage products</h1>} />
        <Route path="update-products/:id" element={<h1>Update product</h1>} />
        <Route path="users" element={<h1>Manage users</h1>} />
        <Route path="manage-orders" element={<h1>Manage orders</h1>} />

      </Route>

    </Route>
  )
)

export default route
