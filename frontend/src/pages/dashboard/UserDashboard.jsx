import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useLogoutUserMutation } from '../../redux/features/auth/authApi'
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/features/auth/authSlice'

const navItems = [
  { path: '/dashboard',          label: 'Dashboard', icon: '▦' },
  { path: '/dashboard/orders',   label: 'Orders',    icon: '⊟' },
  { path: '/dashboard/payments', label: 'Payments',  icon: '◈' },
  { path: '/dashboard/profile',  label: 'Profile',   icon: '⊕' },
  { path: '/dashboard/reviews',  label: 'Reviews',   icon: '✦' },
]

const UserDashboard = () => {
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
    <div className="flex flex-col h-full bg-white text-gray-700">

      {/* ── Brand ── */}
      <div className="px-2 pt-1 pb-0">
        <Link to="/" className="block">
          <span className="text-xl font-extrabold tracking-tight text-gray-900">
            Thread<span className="text-violet-500">Vibe</span>
          </span>
        </Link>
        <p className="flex items-center gap-2 mt-1.5 text-xs font-medium tracking-widest uppercase text-gray-400">
          <span className="inline-block w-4 h-0.5 bg-violet-400 rounded-full" />
          User Dashboard
        </p>
      </div>

      <hr className="border-gray-100 my-4" />

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
                    ? 'relative flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-violet-700 bg-violet-50 before:absolute before:left-0 before:top-2 before:bottom-2 before:w-0.5 before:bg-violet-500 before:rounded-r-full'
                    : 'flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-gray-800 hover:bg-gray-50 transition-colors duration-150'
                }
              >
                <span className="w-5 text-center text-sm shrink-0 opacity-60">{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* ── Logout ── */}
      <div className="pt-2">
        <hr className="border-gray-100 mb-4" />
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-400 hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-all duration-200 cursor-pointer"
        >
          <span className="text-base leading-none">⏻</span>
          <span>Logout</span>
        </button>
      </div>
    </div>
  )
}

export default UserDashboard