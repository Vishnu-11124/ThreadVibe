import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import MainLayout from '../layout/MainLayout'
import HomePage from '../pages/home/HomePage'
import { Divide } from 'lucide-react'
import CategoryPage from '../pages/category/CategoryPage'



 const route = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<MainLayout/>}>
           <Route index element={<HomePage/>}/>
           <Route path="/categories/:categoryName" element={<CategoryPage/>}/>
           
        </Route>
    )
)

export default route