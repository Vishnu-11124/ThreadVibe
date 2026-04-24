import React, { useState } from 'react'
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"
import { useUpdateUserRoleMutation } from '../../../redux/features/auth/authApi'

const UpdateModel = ({ user, closeModel }) => {
  const [role, setRole] = useState(user?.role || 'user')
  const [updateUserRole] = useUpdateUserRoleMutation()

  const handleUpdateRole = async () => {
    try {
      await updateUserRole({ id: user._id, role }).unwrap()
      Toastify({
        text: "User role updated successfully!",
        duration: 3000,
        gravity: "top",
        position: "right",
        style: { background: "#22c55e" },
      }).showToast()
      closeModel()
    } catch (error) {
      Toastify({
        text: "Failed user role updation!",
        duration: 3000,
        gravity: "top",
        position: "right",
        style: { background: "#ef4444" },
      }).showToast()
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 animate-fadeIn">

        {/* Header */}
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Edit User Role
        </h2>
        <hr className="mb-4" />

        {/* Form */}
        <div className="space-y-4">

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Username
            </label>
            <input
              type="text"
              value={user?.username}
              readOnly
              className="w-full px-3 py-2 border rounded-lg bg-gray-100 text-gray-700 focus:outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={user?.email}
              readOnly
              className="w-full px-3 py-2 border rounded-lg bg-gray-100 text-gray-700 focus:outline-none"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={closeModel}
              className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100 transition"
            >
              Cancel
            </button>

            <button
              onClick={handleUpdateRole}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Update Role
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpdateModel
