import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import MainLayout from '../layout/MainLayout'
import HomePage from '../pages/home/HomePage'
import { Divide } from 'lucide-react'
import CategoryPage from '../pages/category/CategoryPage'
import ShopPage from '../pages/shop/ShopPage'



 const route = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<MainLayout/>}>
           <Route index element={<HomePage/>}/>
           <Route path="/categories/:categoryName" element={<CategoryPage/>}/>
           <Route path="/shop" element={<ShopPage/>} />
           
        </Route>
    )
)

export default route