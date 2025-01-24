import { faBars, faCartShopping, faFolder, faPenToSquare, faSearch, faWarehouse } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Button } from 'antd'
import { useState } from 'react'
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import instance from '../config/axios'
import { Avatar, Logo } from '../upload'
import { useLocalStorage } from '../hook/useStorage'

const DashBoard = () => {
 const [user] = useLocalStorage('user', {})
  const userId = user?.user?._id
  console.log('User ID:', userId);
  console.log('Route Parameters:', useParams());
  const [confirmLogout, setConfirmLogout] = useState(false);
  const navigate = useNavigate()

  const {data} = useQuery({
    queryKey: ['USER_DETAIL', userId],
    queryFn: async () => {
      const res = await instance.get(`/auth/${userId}`)
      console.log(res.data);
      return res.data
    }
  })

  const role = data?.data?.role
  const name = data?.data?.name
  const { mutate } = useMutation({
    mutationFn: async () => {
      await instance.post(`/auth/logout`);
    },
    onSuccess: () => {
       Swal.fire({
          title: 'Đăng xuất thành công!',
          icon: 'success',
          confirmButtonText: 'OK'
      });
      navigate("/auth");
    },
    onError: (error) => {
      console.error('Logout failed:', error);
    }
  });

  const handleLogout = () => {
    if (confirmLogout) {
      mutate();
    } else {
      setConfirmLogout(true);
      setTimeout(() => {
        setConfirmLogout(false); 
      }, 5000);
    }
  };
 
  return (
    <div className="w-full h-screen grid grid-cols-[10%,1fr]">
      <div className="bg-gray-300">
        <div className="p-4 ">
          <img src={Logo} alt="" className='w-[90px] m-auto rounded-full'/>
        </div>
        <div className="mt-10 mb-10">
        <div className="p-4 text-center my-4">
            <button
              className="w-full flex justify-center items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-200"
              onClick={() => navigate('/menu')}
            >
              <FontAwesomeIcon icon={faPenToSquare} className="h-[20px] mx-2" />
              Đặt Hàng
            </button>
          </div>

          <div className="p-4 text-center my-4">
            <button
              className="w-full flex justify-center items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-200"
              onClick={() => navigate('/order')}
            >
              <FontAwesomeIcon icon={faCartShopping} className="h-[20px] mx-2" />
              Quản Lí Đơn Hàng
            </button>
          </div>
          {role === 'admin' && (
            <>
              <div className="p-4 text-center my-4">
                <button
                  className="w-full flex justify-center items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-200"
                  onClick={() => navigate('/products')}
                >
                  <FontAwesomeIcon icon={faBars} className="h-[20px] mx-2" />
                  Quản Lí Sản Phẩm
                </button>
              </div>

              <div className="p-4 text-center my-4">
                <button
                  className="w-full flex justify-center items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-200"
                  onClick={() => navigate('/categories')}
                >
                  <FontAwesomeIcon icon={faFolder} className="h-[20px] mx-2" />
                  Quản Lí Danh Mục
                </button>
              </div>

              <div className="p-4 text-center my-4">
                <button
                  className="w-full flex justify-center items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-200"
                  onClick={() => navigate('/ware')}
                >
                  <FontAwesomeIcon icon={faWarehouse} className="h-[20px] mx-2" />
                  Kho Nguyên Liệu
                </button>
              </div>
            </>
          )}
        <div className="p-4 text-center my-8">
          <div
            className="w-full flex justify-center items-center p-4 border border-red-300 rounded-lg cursor-pointer hover:bg-red-500 text-black"
            onClick={handleLogout}
          >
            {confirmLogout ? "Xác nhận" : "Đăng xuất"}
          </div>
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
                <Link to='/profile'><img src={Avatar} alt="" className='w-[50px] rounded-full'/></Link>
              </div>
                <div className="ml-2">
                  <h3 className='text-white font-bold'>{name}</h3>
                  <p className='text-white font-light'>{role}</p>
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
