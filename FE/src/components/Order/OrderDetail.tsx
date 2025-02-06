import { useState } from 'react'
import { Link } from 'react-router-dom'
import useOrder from '../../hook/useOrder'

const OrderDetail = () => {
  const { orderDetail, updateOrderStatus } = useOrder(1, 9)
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
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
  };

  if (!orderDetail || !orderDetail.orderItem) {
    return <div>Không có thông tin đơn hàng</div>
  }

  

  return (
    <div className="p-6 min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-4 max-w-3xl mx-auto">
        <div className="overflow-x-auto">
          <h1 className='text-center font-bold text-2xl mb-4'>Chi tiết đơn hàng</h1>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-blue-200 text-center">
                <th className="py-2 px-4 text-sm font-medium">Tên</th>
                <th className="py-2 px-4 text-sm font-medium">Số lượng</th>
                <th className="py-2 px-4 text-sm font-medium">Giá</th>
                <th className="py-2 px-4 text-sm font-medium">Thành tiền</th>
              </tr>
            </thead>
            <tbody>
              {orderDetail.orderItem.map((item: any, index: number) => (
                <tr key={index} className='hover:bg-gray-200'>
                  <td className="py-2 px-4 text-sm text-center">{item.productId.name}</td>
                  <td className="py-2 px-4 text-sm text-center">{item.quantity}</td>
                  <td className="py-2 px-4 text-sm text-center">{formatPrice(item.price)}</td>
                  <td className="py-2 px-4 text-sm text-center">{formatPrice(item.price * item.quantity)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          
        </div>
        <div className="mt-6">
          <p id="notes" className="mt-2 p-2 w-full font-semibold">Ghi chú: <span className=''>{orderDetail.notes || "Không có ghi chú"}</span></p>
        </div>
        <div className="flex justify-end mt-6">
          {status === '1' || orderDetail.status === 'Completed' ? (
            <>
              <p className="text-green-600 text-sm font-medium">
                Đồ đã được trả hết
              </p>
              <Link
                to="/order"
                className="ml-4 bg-blue-500 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-600 transition-all"
              >
                Trở về
              </Link>
            </>
          ) : orderDetail.status === 'Completed' ? (
            <p className="text-yellow-500 text-sm font-medium text-center">
              Đơn hàng đã hoàn thành
            </p>
          ) : (
            <button
              className="bg-green-500 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-green-600 transition-all"
              onClick={() => handleStatusChange('1')}
            >
              Trả đồ
            </button>
          )}
        </div>


      </div>
    </div>
  )
}

export default OrderDetail
