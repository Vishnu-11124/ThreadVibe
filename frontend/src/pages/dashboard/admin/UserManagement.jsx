import React, { useState } from 'react'
import { useDeleteUserMutation, useGetUserQuery } from '../../../redux/features/auth/authApi'
import { Edit2, Trash2, Users, ShieldCheck, User } from 'lucide-react'
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"
import UpdateModel from './UpdateModel'

const UserManagement = () => {
  const { data, isError, isLoading } = useGetUserQuery()
  const users = data?.data || []

  const [isModelOpen, setIsModelOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)

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

  const handleEditUser = (user) => {
    setSelectedUser(user)
    setIsModelOpen(true)
  }

  const closeModel = () => {
    setIsModelOpen(false)
    setSelectedUser(null)
  }

  const adminCount = users.filter(u => u?.role === 'admin').length
  const userCount = users.filter(u => u?.role !== 'admin').length

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-slate-400 text-sm animate-pulse">Loading users...</p>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-red-500 text-sm">Failed to load users</p>
      </div>
    )
  }

  return (
    <div className="p-8 bg-slate-50 min-h-screen">

      {/* Page Header */}
      <div className="mb-7">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
          User Management
        </h1>
        <p className="text-slate-400 text-sm mt-0.5">
          Manage roles and access for all users
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white border border-slate-100 rounded-2xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
            <Users size={18} className="text-blue-600" />
          </div>
          <div>
            <p className="text-xs text-slate-400">Total Users</p>
            <p className="text-xl font-semibold text-slate-900">{users.length}</p>
          </div>
        </div>
        <div className="bg-white border border-slate-100 rounded-2xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center">
            <ShieldCheck size={18} className="text-violet-600" />
          </div>
          <div>
            <p className="text-xs text-slate-400">Admins</p>
            <p className="text-xl font-semibold text-slate-900">{adminCount}</p>
          </div>
        </div>
        <div className="bg-white border border-slate-100 rounded-2xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
            <User size={18} className="text-green-600" />
          </div>
          <div>
            <p className="text-xs text-slate-400">Regular Users</p>
            <p className="text-xl font-semibold text-slate-900">{userCount}</p>
          </div>
        </div>
      </div>

      {/* Table Panel */}
      <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden">

        {/* Panel Header */}
        <div className="px-6 py-4 border-b border-slate-50">
          <p className="text-sm font-semibold text-slate-800">All Users</p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-50 text-left">
                <th className="px-6 py-3 text-[11px] font-semibold text-slate-400 uppercase tracking-widest">#</th>
                <th className="px-6 py-3 text-[11px] font-semibold text-slate-400 uppercase tracking-widest">Email</th>
                <th className="px-6 py-3 text-[11px] font-semibold text-slate-400 uppercase tracking-widest">Role</th>
                <th className="px-6 py-3 text-[11px] font-semibold text-slate-400 uppercase tracking-widest text-center">Edit</th>
                <th className="px-6 py-3 text-[11px] font-semibold text-slate-400 uppercase tracking-widest text-center">Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user._id}
                  className="border-b border-slate-50 hover:bg-slate-50/60 transition-colors"
                >
                  <td className="px-6 py-4 text-xs font-semibold text-slate-300">
                    {String(index + 1).padStart(2, '0')}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0
                        ${user?.role === 'admin'
                          ? 'bg-violet-100 text-violet-600'
                          : 'bg-blue-100 text-blue-600'}`}>
                        {user?.email?.[0]?.toUpperCase()}
                      </div>
                      <span className="text-sm text-slate-700">{user?.email}</span>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 text-[11px] rounded-full font-medium
                      ${user?.role === 'admin'
                        ? 'bg-violet-50 text-violet-600'
                        : 'bg-blue-50 text-blue-600'}`}>
                      {user?.role === 'admin'
                        ? <ShieldCheck size={10} />
                        : <User size={10} />}
                      {user?.role}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleEditUser(user)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-amber-50 text-amber-700 rounded-lg hover:bg-amber-100 transition-colors"
                    >
                      <Edit2 size={12} />
                      Edit
                    </button>
                  </td>

                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleDeleteUser(user?._id)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                    >
                      <Trash2 size={12} />
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
          <div className="text-center text-slate-400 text-sm py-16">
            <Users size={32} className="mx-auto mb-3 text-slate-200" />
            No users found
          </div>
        )}

      </div>

      {isModelOpen && <UpdateModel user={selectedUser} closeModel={closeModel} />}
    </div>
  )
}

export default UserManagement