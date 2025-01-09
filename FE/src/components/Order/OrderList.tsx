import React from 'react'
import { Link } from 'react-router-dom'
import useOrder from '../../hook/useOrder'

const Order = () => {
  const { orders } = useOrder()
  return (
    <div>
    <div className="p-4 min-h-screen">
      <div className="grid grid-cols-3 gap-6" >
      {Array.isArray(orders) &&  orders.map((item: any, index: number) => (
        <div key={index} className="bg-white shadow-md rounded-lg p-4 shadow-2xl shadow-gray-400">
        <h2 className="text-lg font-semibold mb-2">Mã: {item._id}</h2>
        <p className="text-gray-600 mb-1">Ngày đặt hàng: {item.orderDate}</p>
        <p className="text-gray-600 mb-1">Tổng tiền: <span className="font-semibold text-green-500">{item.totalPrice} VND</span></p>
        <p className="text-gray-600">Trạng thái: <span className="font-semibold text-yellow-500">{item.status}</span></p>
        <button className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          <Link to={`/order/detail/${item.userId}/${item._id}`}>Xem chi tiết</Link>
        </button>
      </div>
      ))}
      
    
  </div>
</div>
 

  </div>
  )
}

export default Order
