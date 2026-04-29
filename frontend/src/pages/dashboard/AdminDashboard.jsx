import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useLogoutUserMutation } from '../../redux/features/auth/authApi'
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/features/auth/authSlice'

const navItems = [
  { path: '/dashboard/admin',           label: 'Dashboard',       icon: '▦' },
  { path: '/dashboard/add-product',     label: 'Add Product',     icon: '+' },
  { path: '/dashboard/manage-products', label: 'Manage Products', icon: '⊞' },
  { path: '/dashboard/users',           label: 'Users',           icon: '◈' },
  { path: '/dashboard/manage-orders',   label: 'Manage Orders',   icon: '⊟' },
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
      console.error('Logout failed:', error)
    }
  }

  return (
    <div className="flex flex-col h-full bg-gray-950 text-gray-300">

      {/* ── Brand ── */}
      <div className="px-2 pt-1 pb-0">
        <Link to="/" className="block no-underline">
          <span className="text-xl font-extrabold tracking-tight text-white">
            Thread<span className="text-violet-400">Vibe</span>
          </span>
        </Link>
        <p className="flex items-center gap-2 mt-1.5 text-xs font-medium tracking-widest uppercase text-gray-600">
          <span className="inline-block w-4 h-0.5 bg-violet-500 rounded-full" />
          Admin Panel
        </p>
      </div>

      <hr className="border-gray-800 my-4" />

      {/* ── Nav ── */}
      <nav className="flex-1 overflow-y-auto">
        <ul className="flex flex-col gap-0.5 list-none p-0 m-0">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                end
                className={({ isActive }) =>
                  isActive
                    ? 'relative flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-violet-300 bg-violet-950 before:absolute before:left-0 before:top-2 before:bottom-2 before:w-0.5 before:bg-violet-400 before:rounded-r-full'
                    : 'flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:text-gray-200 hover:bg-gray-800 transition-colors duration-150'
                }
              >
                <span className="w-5 text-center text-sm shrink-0 opacity-70">{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* ── Logout ── */}
      <div className="pt-2">
        <hr className="border-gray-800 mb-4" />
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-gray-800 text-sm font-semibold text-gray-500 hover:bg-red-950 hover:text-red-400 hover:border-red-900 transition-all duration-200 cursor-pointer"
        >
          <span className="text-base leading-none">⏻</span>
          <span>Logout</span>
        </button>
      </div>
    </div>
  )
}

export default AdminDashboard