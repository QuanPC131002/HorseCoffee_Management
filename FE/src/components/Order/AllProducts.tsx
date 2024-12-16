import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Coffee } from '../../upload'

const AllProducts = () => {
  return (
    <div>
       <div className="grid grid-cols-[60%,1fr] p-6 gap-10">
          <div className="">
            {/* Nav Categories */}
            <div className="p-4">
              <button className='text-white p-4 bg-gray-300 mx-4 rounded-xl text-black font-semibold hover:bg-red-400 hover:text-white'>Tất Cả</button>
              <button className='text-white p-4 bg-gray-300 mx-4 rounded-xl text-black font-semibold hover:bg-red-400 hover:text-white'>Trà</button>
              <button className='text-white p-4 bg-gray-300 mx-4 rounded-xl text-black font-semibold hover:bg-red-400 hover:text-white'>Cà Phê</button>
              <button className='text-white p-4 bg-gray-300 mx-4 rounded-xl text-black font-semibold hover:bg-red-400 hover:text-white'>Nước Ép</button>
              <button className='text-white p-4 bg-gray-300 mx-4 rounded-xl text-black font-semibold hover:bg-red-400 hover:text-white'>Bánh</button>
            </div>
            
            {/* Products */}
            <div className="grid grid-cols-3 gap-4">
            <div className="bg-white p-1">
              <img src={Coffee} alt="" className='w-full'/>
             <div className="flex justify-between my-1">
              <p>Capuchino</p>
              <span className='text-red-700'>50.000đ</span>
             </div>
            <button className='bg-red-500 w-full rounded-lg p-1 text-white hover:bg-gray-400'>Thêm</button>
            </div>
            <div className="bg-white p-1">
              <img src={Coffee} alt="" className='w-full'/>
             <div className="flex justify-between my-1">
              <p>Capuchino</p>
              <span className='text-red-700'>50.000đ</span>
             </div>
            <button className='bg-red-500 w-full rounded-lg p-1 text-white hover:bg-gray-400'>Thêm</button>
            </div>
            <div className="bg-white p-1">
              <img src={Coffee} alt="" className='w-full'/>
             <div className="flex justify-between my-1">
              <p>Capuchino</p>
              <span className='text-red-700'>50.000đ</span>
             </div>
            <button className='bg-red-500 w-full rounded-lg p-1 text-white hover:bg-gray-400'>Thêm</button>
            </div>
            <div className="bg-white p-1">
              <img src={Coffee} alt="" className='w-full'/>
             <div className="flex justify-between my-1">
              <p>Capuchino</p>
              <span className='text-red-700'>50.000đ</span>
             </div>
            <button className='bg-red-500 w-full rounded-lg p-1 text-white hover:bg-gray-400'>Thêm</button>
            </div>
            <div className="bg-white p-1">
              <img src={Coffee} alt="" className='w-full'/>
             <div className="flex justify-between my-1">
              <p>Capuchino</p>
              <span className='text-red-700'>50.000đ</span>
             </div>
            <button className='bg-red-500 w-full rounded-lg p-1 text-white hover:bg-gray-400'>Thêm</button>
            </div>
            <div className="bg-white p-1">
              <img src={Coffee} alt="" className='w-full'/>
             <div className="flex justify-between my-1">
              <p>Capuchino</p>
              <span className='text-red-700'>50.000đ</span>
             </div>
            <button className='bg-red-500 w-full rounded-lg p-1 text-white hover:bg-gray-400'>Thêm</button>
            </div>
          </div>
          </div>
          
          {/* Order */}
          <div className="bg-gray-300 rounded-xl">
              <h1 className='text-center font-semibold text-3xl'>Đơn Hàng</h1>
              <table className='w-full'>
                <thead>
                  <tr>
                    <td className='bg-gray-400 text-center p-2 font-semibold'>Tên món</td>
                    <td className='bg-gray-400 text-center p-2 font-semibold'>Số lượng</td>
                    <td className='bg-gray-400 text-center p-2 font-semibold'>Giá</td>
                    <td className='bg-gray-400 text-center p-2 font-semibold'>Thành tiền</td>
                    <td className='bg-gray-400 text-center p-2 font-semibold'>Action</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className='text-center p-2'>Capuchino</td>
                    <td className='text-center p-2'>2</td>
                    <td className='text-center p-2'>50.000đ</td>
                    <td className='text-center p-2'>100.000đ</td>
                    <td className='text-center p-2'><FontAwesomeIcon icon={faTrash} /></td>
                  </tr>

                  <tr>
                    <td className='text-center p-2'>Capuchino</td>
                    <td className='text-center p-2'>2</td>
                    <td className='text-center p-2'>50.000đ</td>
                    <td className='text-center p-2'>100.000đ</td>
                    <td className='text-center p-2'><FontAwesomeIcon icon={faTrash} /></td>
                  </tr>

                  <tr>
                    <td className='text-center p-2'>Capuchino</td>
                    <td className='text-center p-2'>2</td>
                    <td className='text-center p-2'>50.000đ</td>
                    <td className='text-center p-2'>100.000đ</td>
                    <td className='text-center p-2'><FontAwesomeIcon icon={faTrash} /></td>
                  </tr>

                  {/* <tr className=''>
                    <td className='text-left'>Tổng: 400.000đ</td>
                    <td className='text-right'>
                      <button className='bg-blue-700 text-white p-2 rounded-lg'>Ghi Chú</button>
                      <button className='bg-red-700 text-white p-2 rounded-lg'>Hủy</button>
                    </td>
                  </tr> */}
                </tbody>
              </table>
          </div>
          </div>
    </div>
  )
}

export default AllProducts
