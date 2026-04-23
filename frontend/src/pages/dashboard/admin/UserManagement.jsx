import React from 'react'
import { useDeleteUserMutation, useGetUserQuery } from '../../../redux/features/auth/authApi'
import { Edit2, Trash2 } from 'lucide-react'
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"

const UserManagement = () => {
  const { data, isError, isLoading } = useGetUserQuery()
  const users = data?.data || []

  const [deleteUser] = useDeleteUserMutation()

  const handleDeleteUser = async (id) => {
    try {
      const response = await deleteUser(id).unwrap()
      if (response) {
        Toastify({
          text: "Successfully deleted user!",
          duration: 3000,
          gravity: "top",
          position: "right",
          style: { background: "#22c55e" },
        }).showToast()
      }
    } catch (error) {
      Toastify({
        text: "Failed user deletion",
        duration: 3000,
        gravity: "top",
        position: "right",
        style: { background: "#ef4444" },
      }).showToast()
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-gray-500 text-lg animate-pulse">Loading users...</p>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-red-500 text-lg">Failed to load users</p>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl p-6">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            User Management
          </h1>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            
            <thead>
              <tr className="bg-gray-100 text-left text-gray-600 text-sm uppercase tracking-wider">
                <th className="p-3">#</th>
                <th className="p-3">Email</th>
                <th className="p-3">Role</th>
                <th className="p-3 text-center">Edit</th>
                <th className="p-3 text-center">Delete</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-3 text-gray-700">{index + 1}</td>

                  <td className="p-3 text-gray-700">
                    {user?.email}
                  </td>

                  <td className="p-3">
                    <span className={`px-3 py-1 text-xs rounded-full font-medium
                      ${user?.role === "admin"
                        ? "bg-purple-100 text-purple-600"
                        : "bg-blue-100 text-blue-600"}`}>
                      {user?.role}
                    </span>
                  </td>

                  {/* Edit */}
                  <td className="p-3 text-center">
                    <button className="flex items-center gap-1 px-3 py-1 text-sm bg-yellow-100 text-yellow-600 rounded-lg hover:bg-yellow-200 transition">
                      <Edit2 size={16} />
                      Edit
                    </button>
                  </td>

                  {/* Delete */}
                  <td className="p-3 text-center">
                    <button
                      onClick={() => handleDeleteUser(user?._id)}
                      className="flex items-center gap-1 px-3 py-1 text-sm bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

        {/* Empty State */}
        {users.length === 0 && (
          <div className="text-center text-gray-500 py-10">
            No users found
          </div>
        )}

      </div>
    </div>
  )
}

export default UserManagement
