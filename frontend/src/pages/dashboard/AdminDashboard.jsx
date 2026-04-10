import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useLogoutUserMutation } from '../../redux/features/auth/authApi'
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/features/auth/authSlice'

const navItems = [
    { path: '/dashboard/admin', label: 'Dashboard'},
    { path: '/dashboard/add-new-post', label: 'Add New Product' },
    { path: '/dashboard/manage-products', label: 'Manage Products' },
    { path: '/dashboard/users', label: 'Users' },
    { path: '/dashboard/manage-orders', label: 'Manage Orders' },
]

const AdminDashboard = () => {
    const [logoutUser] = useLogoutUserMutation()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            await logoutUser().unwrap()   
            dispatch(logout())
            navigate('/')
            
        } catch (error) {
            console.error('Logout failed:', error);
        }
        
    }
  return (
    <div className="flex flex-col h-screen px-4 py-2">
        <div className="flex-1">
            <div className="mb-4 px-3">
                <Link to="/" className="text-2xl font-extrabold tracking-tight text-gray-900">ThreadVibe</Link>
                <p className="text-sm text-gray-400 mt-1 font-medium">User Dashboard</p>
            </div>
            <hr className="border-gray-100 mb-6" />
            <div>
                <ul className="flex flex-col gap-2">
                {
                    navItems.map((item) => (
                        <li key={item.path}>
                            <NavLink
                            className={({isActive}) => isActive 
                                ? "flex items-center text-base font-semibold text-white bg-gray-900 rounded-xl px-4 py-2" 
                                : "flex items-center text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-xl px-4 py-2 transition-all duration-200"}
                            end
                            to={item.path}>{item.label}</NavLink>
                        </li>
                    ))
                }
                </ul>
            </div>
        </div>
        <div>
            <hr className="border-gray-100 mb-4" />
            <button
            onClick={handleLogout}
            className="w-full text-base font-semibold text-white bg-violet-800 border border-gray-200 rounded-xl px-4 py-3 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-200"
            >Logout</button>
        </div>
    </div>
  )
}

export default AdminDashboard