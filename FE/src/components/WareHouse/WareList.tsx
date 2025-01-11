import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import { useWareHouse } from '../../hook/warehouse/useWareHouse'
import instance from '../../config/axios'
import { Link } from 'react-router-dom'
import { Pagination } from 'antd'

const WareList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(9);
  const query = useQueryClient()
  const { data, isLoading, isError } = useWareHouse(currentPage, pageSize) 
  const wareHouseList = data?.data || [];

  const {mutate} = useMutation({
    mutationFn: async (id: number) => {
      if(confirm('Bạn có muốn xóa ?')) {
        await instance.delete(`/ware/${id}`)
      }
    },
    onSuccess: () => {
      query.invalidateQueries({
        queryKey: ['WareHouse']
      })
    }
  })

  
  const total = data?.pagination?.total || 0;

  const handlePaginationChange = (page: number, size: number) => {
        setCurrentPage(page);
        setPageSize(size);
  };
  
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;
  return (
    <div>
      <section className="py-1 bg-blueGray-50">
      <div className="w-full xl:w-full mb-12 xl:mb-0 px-4 mx-auto mt-24">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                <h3 className="font-semibold text-base text-blueGray-700">Danh Sách Kho</h3>
              </div>
              <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                <button className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                  <Link to='/ware/add'>Thêm</Link>
                </button>
              </div>
            </div>
          </div>

          <div className="block w-full overflow-x-auto">
            <table className="items-center bg-transparent w-full border-collapse">
              <thead>
                <tr>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    ID
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Tên
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Số lượng
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Đơn vị
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Hành động
                  </th>
                </tr>
              </thead>

              <tbody>
                {wareHouseList?.map((item: any, index: number) => (
                  <tr key={index}>
                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
                      {item._id}
                    </th>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {item.name}
                    </td>

                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {item.countInStock}
                    </td>

                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {item.unit}
                    </td>
                    <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      <button className="text-indigo-500 hover:text-indigo-700 px-3 py-1" onClick={() => mutate(item._id)}>Xóa</button>
                      <button className="text-indigo-500 hover:text-indigo-700 px-3 py-1">
                        <Link to={`/ware/edit/${item._id}`}>Sửa</Link>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-4">
                <Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={total}
                    onChange={handlePaginationChange}
                />
          </div>
      </div>
</section>

    </div>
  )
}

export default WareList
