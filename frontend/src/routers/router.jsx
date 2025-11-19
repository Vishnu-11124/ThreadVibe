import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import MainLayout from '../layout/MainLayout'
import HomePage from '../pages/home/HomePage'
import { Divide } from 'lucide-react'



 const route = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<MainLayout/>}>
           <Route index element={<HomePage/>}/>
           <Route path="/categories/:categoryName" element={<h1>Hello</h1>}/>
           
        </Route>
    )
)

export default route