import { faBars, faCartShopping, faFolder, faHouse, faRightFromBracket, faSearch, faTrash, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Avatar, Coffee, Logo } from '../upload'
import { Link, Outlet } from 'react-router-dom'

const DashBoard = () => {
  return (
    <div className="w-full h-screen grid grid-cols-[10%,1fr]">
      <div className="bg-gray-300">
        <div className="p-4 ">
          <img src={Logo} alt="" className='w-[90px] m-auto rounded-full'/>
        </div>
      <div className="mt-10 mb-10">
        <div className="p-4 text-center my-10">
            <Link to='/menu'><FontAwesomeIcon icon={faHouse} className='h-[30px]'/>Đặt Hàng</Link>
          </div>
          <div className="p-4 text-center my-10">
            <Link to='/products'><FontAwesomeIcon icon={faBars} className='h-[30px]'/>Quản Lí Sản Phẩm</Link>
          </div>
          <div className="p-4 text-center my-10">
            <Link to='/categories'><FontAwesomeIcon icon={faFolder} className='h-[30px]'/>Quản Lí Danh Mục</Link>
          </div>
          <div className="p-4 text-center my-10">
            <Link to='/ware'><FontAwesomeIcon icon={faUser} className='h-[30px]'/>Kho Nguyên Liệu</Link>
          </div>
          <div className="p-4 text-center my-10">
            <Link to='/order'><FontAwesomeIcon icon={faCartShopping} className='h-[30px]'/>Quản Lí Đơn Hàng</Link>
          </div>
          <div className="p-4 text-center my-20">
          <Link to='/auth'><FontAwesomeIcon icon={faRightFromBracket} className='h-[30px]'/></Link>
          </div>
        </div>
      </div>
      <div className="bg-gray-600">
        {/* Sidebar */}
        <div className="grid grid-cols-3 p-6 border-b-[1px] border-solid border-gray-300">
            <div className="">
              <h1 className='text-white text-center text-xl'>Tận hưởng hương vị cà phê tuyệt vời,<br /> khởi đầu cho một ngày làm việc đầy sáng tạo</h1>
            </div>
            <div className="">
              <form className="max-w-md mx-auto">   
                  <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                  <div className="relative">
                      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                          {/* <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                          </svg> */}
                      </div>
                      <input type="search" className="block w-full p-[10px] ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Tìm kiếm......" required />
                      <button type="submit" className="text-white absolute end-2.5 bottom-1 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"><FontAwesomeIcon icon={faSearch} /></button>
                  </div>
              </form>
            </div>
            <div className="flex m-auto">
              <div className="">
                <img src={Avatar} alt="" className='w-[50px] rounded-full'/>
              </div>
              <div className="ml-2">
                <h3 className='text-white font-bold'>Minh Quân</h3>
                <p className='text-white font-light'>Admin</p>
              </div>
            </div>
        </div>
        {/* End Sidebar */}

        {/* Content */}
        {/* End Content */}
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default DashBoard
