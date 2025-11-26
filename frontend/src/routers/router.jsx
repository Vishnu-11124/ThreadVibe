import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import MainLayout from '../layout/MainLayout'
import HomePage from '../pages/home/HomePage'
import { Divide } from 'lucide-react'
import CategoryPage from '../pages/category/CategoryPage'
import ShopPage from '../pages/shop/ShopPage'
import SingleProduct from '../pages/shop/product/SingleProduct'
import Login from '../components/Login'
import Register from '../components/Register'



 const route = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<MainLayout/>}>
           <Route index element={<HomePage/>}/>
           <Route path="/categories/:categoryName" element={<CategoryPage/>}/>
           <Route path="/shop" element={<ShopPage/>} />
           <Route path="/shop/:id" element={<SingleProduct/>} />  
           <Route path="/login" element={<Login/>}/> 
           <Route path='/register' element={<Register/>}/>
        </Route>
        
    )
)

export default route