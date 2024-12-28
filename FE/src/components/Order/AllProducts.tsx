import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useCategories } from '../../hook/category/useCategories'
import { useProduct } from '../../hook/product/useProduct'
import { useState } from 'react'
import useCart from '../../hook/useCart'

const MenuAll = () => {
  const { data:categries = [] } = useCategories()
  const { data:products  = [] } = useProduct()

  const { mutate } = useCart()
  const [showTextarea, setShowTextarea] = useState(false)
  return (
    <div>
       <div className="grid grid-cols-[60%,1fr] p-6 gap-10">
          <div className="">
            {/* Nav Categories */}
              <div className="p-4">
                {categries.map((item: any,index: number) => (
                <button className='text-white p-4 bg-gray-300 mx-4 rounded-xl text-black font-semibold hover:bg-red-400 hover:text-white'>{item.name}</button>
                
              ))}
              </div>
            
            {/* Products */}
            <div className="grid grid-cols-3 gap-4">
            {products.map((item: any) => (

            <div className="bg-white p-1">
              <img src={item.image} alt="" className='w-full'/>
             <div className="flex justify-between my-1">
              <p>{item.name}</p>
              <span className='text-red-700'>{item.price}vnd</span>
             </div>
             <button
              className="bg-red-500 w-full rounded-lg p-1 text-white hover:bg-gray-400"
              onClick={() => {
                mutate({
                  action: 'add-to-cart',
                  productId: item._id,
                  quantity: 1,
                  notes: '' 
                });
              }}
            >
              Thêm
            </button>


            </div>
            ))}
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
            </tbody>
          </table>
          <div className="flex flex-col p-4">
            <p className="font-semibold text-lg">Tổng giá: <span className='text-red-600'>100.000đ</span></p>
            <div className="flex justify-end">
              <button
                className='bg-blue-700 text-white p-2 rounded-lg mx-2'
                onClick={() => setShowTextarea(!showTextarea)}>
                Ghi Chú
              </button>
              <button className='bg-red-700 text-white p-2 rounded-lg'>Hủy</button>
            </div>
            {showTextarea && (
              <textarea
                className='w-full mt-4 p-2 border border-gray-300 rounded-lg'
                rows={3}
                placeholder='Nhập ghi chú...'></textarea>
            )}
          </div>
        </div>

          </div>
    </div>
  )
}

export default MenuAll
