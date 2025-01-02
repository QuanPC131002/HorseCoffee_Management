import { Link } from 'react-router-dom'
import useOrder from '../../hook/useOrder'

const Checkout = () => {
  // const { orders } = useOrder()
  // // Lấy đơn hàng cuối cùng (hoặc bạn có thể sử dụng điều kiện khác)
  // const order = orders && orders.length > 0 ? orders[orders.length - 1] : {}

  // return (
  //   <div className="p-6 max-w-4xl mx-auto">
  //     <h1 className="text-3xl font-semibold text-center mb-6">Hóa Đơn</h1>
  //     <div className="bg-white p-6 rounded-lg shadow-lg">
  //       <div className="order-info mb-4">
  //         <p className="text-lg">Ngày đặt: <span className="font-semibold">{order.orderDate}</span></p>
  //       </div>
  //       <table className="min-w-full border-collapse border border-gray-300">
  //         <thead>
  //           <tr>
  //             <th className="border border-gray-300 p-2 text-left">Tên món</th>
  //             <th className="border border-gray-300 p-2 text-center">Đơn giá</th>
  //             <th className="border border-gray-300 p-2 text-center">Số lượng</th>
  //             <th className="border border-gray-300 p-2 text-center">Thành tiền</th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           {Array.isArray(order.orderItem) && order.orderItem.map((item, index) => (
  //             <tr key={index}>
  //               <td className="border border-gray-300 p-2 text-left">{item.name}</td>
  //               <td className="border border-gray-300 p-2 text-center">{item.price} vnd</td>
  //               <td className="border border-gray-300 p-2 text-center">{item.quantity}</td>
  //               <td className="border border-gray-300 p-2 text-center">{item.price * item.quantity} vnd</td>
  //             </tr>
  //           ))}
  //         </tbody>
  //       </table>

  //       <div className="mt-4 text-left">
  //         <p className="text-xl font-semibold">
  //           Tổng tiền: <span className="text-red-600">{order.totalPrice} vnd</span>
  //         </p>
  //       </div>
  //       <div className="mt-4 text-left">
  //         <p className=" font-semibold">
  //           Ghi chú: <span>{order.notes || 'Không có ghi chú'}</span>
  //         </p>
  //       </div>
  //       <div className="flex justify-end mt-4">
  //         <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
  //           <Link to='/order'>Trang chủ</Link>
  //         </button>
  //       </div>

  //       <h1 className='text-center font-bold'>Xin cảm ơn, hẹn gặp lại quý khách</h1>
  //     </div>
  //   </div>
  // )
}

export default Checkout
