import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEditProfileMutation } from '../../../redux/features/auth/authApi'
import userImage from "../../../assets/userdemo.jpg"
import { setUser } from '../../../redux/features/auth/authSlice'
import { Navigate, useLocation } from 'react-router-dom'

const UserProfile = () => {
    const dispatch = useDispatch()
    const location = useLocation()

    const { user, token } = useSelector((state) => state.auth)

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    const [editProfile, { isLoading }] = useEditProfileMutation()

    const formData = {
        username: user.username || '',
        email: user.email || '',
        bio: user.bio || '',
        profileImage: user.profileImage || '',
        profession: user.profession || ''
    }

    const [updatedData, setUpdatedData] = useState({})
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleProfile = () => {
        setIsModalOpen(!isModalOpen)
    }

    const handleChange = (e) => {
        const { name, value } = e.target

        setUpdatedData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (Object.keys(updatedData).length === 0) {
            alert("No changes made")
            return
        }

        try {
            const response = await editProfile(updatedData).unwrap()

            dispatch(setUser({
                user: response.user,
                token: token
            }))

            setIsModalOpen(false)
            setUpdatedData({})
        } catch (error) {
            console.error("Failed to update profile", error)
            alert("Failed to update profile")
        }
    }

    return (
        <div className="p-4 sm:p-8 min-h-screen bg-gray-50">

            {/* Profile Card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 max-w-xl">

                <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                    <img
                        src={user.profileImage || userImage}
                        className="w-24 h-24 rounded-full object-cover ring-2 ring-gray-100"
                        alt="User profile"
                    />

                    <div className="flex flex-col gap-2 text-center sm:text-left">
                        <h2 className="text-xl font-extrabold text-gray-900">{user.username}</h2>
                        <p className="text-sm text-gray-400">{user.email}</p>
                        <p className="text-sm text-gray-500 font-medium">
                            {user.profession || <span className="text-gray-300">No profession</span>}
                        </p>
                        <p className="text-sm text-gray-500">
                            {user.bio || <span className="text-gray-300">No bio</span>}
                        </p>
                    </div>
                </div>

                <button
                    onClick={handleProfile}
                    className="mt-6 px-5 py-2 text-sm font-semibold bg-gray-900 text-white rounded-xl hover:bg-gray-700 transition-all duration-200"
                >
                    Edit Profile
                </button>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 px-4">
                    <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-lg">

                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-extrabold text-gray-900">Edit Profile</h2>
                            <span onClick={handleProfile} className="text-gray-400 hover:text-gray-900 cursor-pointer text-xl font-bold transition-colors">✕</span>
                        </div>

                        <hr className="border-gray-100 mb-4" />

                        <form onSubmit={handleSubmit} className="flex flex-col gap-3">

                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={updatedData.username ?? formData.username}
                                onChange={handleChange}
                                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200"
                            />

                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={updatedData.email ?? formData.email}
                                onChange={handleChange}
                                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200"
                            />

                            <input
                                type="text"
                                name="profession"
                                placeholder="Profession"
                                value={updatedData.profession ?? formData.profession}
                                onChange={handleChange}
                                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200"
                            />

                            <textarea
                                name="bio"
                                placeholder="Bio"
                                value={updatedData.bio ?? formData.bio}
                                onChange={handleChange}
                                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 resize-none h-24"
                            />

                            <input
                                type="password"
                                name="password"
                                placeholder="New password"
                                onChange={handleChange}
                                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200"
                            />

                            <div className="flex justify-end gap-2 mt-2">
                                <button
                                    type="button"
                                    onClick={handleProfile}
                                    className="px-4 py-2 text-sm font-semibold text-gray-500 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-200"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="px-4 py-2 text-sm font-semibold bg-gray-900 text-white rounded-xl hover:bg-gray-700 transition-all duration-200 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? "Updating..." : "Update"}
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default UserProfile