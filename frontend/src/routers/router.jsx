import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import MainLayout from '../layout/MainLayout'
import HomePage from '../pages/home/HomePage'


 const route = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<MainLayout/>}>
           <Route index element={<HomePage/>}/>
        </Route>
    )
)

export default route