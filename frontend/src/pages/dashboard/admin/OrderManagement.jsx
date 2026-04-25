import React from 'react'
import { useGetAllOrdersQuery } from '../../../redux/features/orders/orderApi'

const OrderManagement = () => {
    const {data, isLoading, isError} = useGetAllOrdersQuery()
    console.log(data?.data)
    const orders = data?.data?.orders || []
    const totalOrders = data?.data?.totalOrders || 0
  return (
    <div>
      <div>
        <h2>Order Management</h2>
        <hr />
      </div>
      {/* Order summary cards */}
      <div className='flex justify-evenly'>
        <div>
            <h3>Total Orders</h3>
            <p>{totalOrders}</p>
        </div>
        <div>
            <h3>Pending Orders</h3>
            <p>{orders.filter(order => order.orderStatus
 === 'pending').length}</p>
        </div>
        <div>
            <h3>Processing Orders</h3>
            <p>{orders.filter(order => order.orderStatus
 === 'processing').length}</p>
        </div>
        <div>
            <h3>Shipped Orders</h3>
            <p>{orders.filter(order => order.orderStatus
 === 'shipped').length}</p>
        </div>
        <div>
            <h3>Delivered Orders</h3>
            <p>{orders.filter(order => order.orderStatus
 === 'delivered').length}</p>
        
        </div>
      </div>
      {/* order list */}
      <div>

      </div>
    </div>
  )
}

export default OrderManagement
