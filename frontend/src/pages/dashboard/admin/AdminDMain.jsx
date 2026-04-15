import React from 'react'
import { useSelector } from 'react-redux'
import { useGetAdminStatsQuery } from '../../../redux/features/stats/statsApi'
import AdminStats from './AdminStats'

const AdminDMain = () => {
    const { user } = useSelector((state) => state.auth)
    const { data: stats, isLoading , isError } = useGetAdminStatsQuery()
    // console.log(user)
    if(isLoading){
        return <h1>Loading...</h1>
    }
    if(isError){
        return <h1>Error</h1>
    }
  return (
    <div>
      <div>
        <div>
            <h1>Admin Dashboard</h1>
            <p>Hi,{user?.username}! Welcome to the admin dashboard</p>
        </div>
        <div>
            {/* admin stats */}
            <div>
                <AdminStats stats={stats}/>
            </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDMain
