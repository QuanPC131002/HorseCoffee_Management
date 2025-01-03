import React, { useState } from 'react'
import useOrder from '../hook/useOrder'
import { Link } from 'react-router-dom'

const OrderDetail = () => {
  const { orderDetail, updateOrderStatus } = useOrder()
  const [status, setStatus] = useState('')

  const handleStatusChange = (newStatus: string) => {
    let statusText = '';
    switch (newStatus) {
      case '0':
        statusText = 'Processing';
        break;
      case '1':
        statusText = 'Completed';
        break;
      case '2':
        statusText = 'Canceled';
        break;
      default:
        statusText = 'Processing'; 
    }
  
    setStatus(newStatus)
    updateOrderStatus(statusText) 
  }
  

  if (!orderDetail || !orderDetail.orderItem) {
    return <div>Không có thông tin đơn hàng</div>
  }

  

  return (
    <div className="p-6 min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-4 max-w-3xl mx-auto">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 text-sm font-medium">Tên</th>
                <th className="py-2 px-4 text-sm font-medium">Số lượng</th>
                <th className="py-2 px-4 text-sm font-medium">Giá</th>
                <th className="py-2 px-4 text-sm font-medium">Thành tiền</th>
              </tr>
            </thead>
            <tbody>
              {orderDetail.orderItem.map((item: any, index: number) => (
                <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : ''}`}>
                  <td className="py-2 px-4 text-sm">{item.productId.name}</td>
                  <td className="py-2 px-4 text-sm">{item.quantity}</td>
                  <td className="py-2 px-4 text-sm">{item.price} VND</td>
                  <td className="py-2 px-4 text-sm">{item.price * item.quantity} VND</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6">
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
            Ghi chú
          </label>
          <p id="notes" className="mt-2 p-2 w-full  font-bold">{orderDetail.notes || "Không có ghi chú"}</p>
        </div>
        <div className="flex justify-end mt-6">
          <button
            className="bg-green-500 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-green-600 transition-all"
            onClick={() => handleStatusChange('1')} // Gọi hàm khi nhấn "Trả đồ"
          >
            <Link to='/order'>Trả đồ</Link>
          </button>
        </div>
      </div>
    </div>
  )
}

export default OrderDetail
