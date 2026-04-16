import React from 'react'
import { useSelector } from 'react-redux'
import { useGetAdminStatsQuery } from '../../../redux/features/stats/statsApi'
import AdminStats from './AdminStats'
import AdminStatsChart from './AdminStatsChart'

const AdminDMain = () => {
    const { user } = useSelector((state) => state.auth)
    const { data: stats, isLoading , isError } = useGetAdminStatsQuery()
    if(isLoading){
        return <h1 className="text-center text-gray-400 text-lg mt-20">Loading...</h1>
    }
    if(isError){
        return <h1 className="text-center text-red-400 text-lg mt-20">Error</h1>
    }
  return (
    <div className="p-4 sm:p-8 min-h-screen bg-gray-50">
      <div>
        {/* Header */}
        <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Admin Dashboard</h1>
            <p className="text-base text-gray-400 mt-1">Hi, <span className="text-gray-700 font-semibold">{user?.username}</span>! Welcome to the admin dashboard</p>
        </div>

        <div className="flex flex-col gap-6">
            {/* Admin Stats */}
            <div>
                <AdminStats stats={stats}/>
            </div>

            {/* Admin Chart */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 max-w-2xl">
              <AdminStatsChart stats={stats} />
            </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDMain