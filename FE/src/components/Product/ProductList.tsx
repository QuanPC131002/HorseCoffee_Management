import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import instance from '../../config/axios'
import { useProduct } from '../../hook/product/useProduct'
import { useState } from 'react'
import { Pagination } from 'antd'

const ProductList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(9);
  const [searchQuery, setSearchQuery] = useState('');
  const query = useQueryClient()
  const { data, isLoading, isError } = useProduct(currentPage, pageSize) 
  const productList = data?.data || [];

  const {mutate} = useMutation({
    mutationFn: async (id: number) => {
      if(confirm('Bạn có muốn xóa ?')) {
        await instance.delete(`/product/${id}`)
      }
    },
    onSuccess: () => {
      query.invalidateQueries({
        queryKey: ['PRODUCT']
      })
    }
  })
  const totalProducts = data?.pagination?.total || 0;

  const handlePaginationChange = (page: number, size: number) => {
        setCurrentPage(page);
        setPageSize(size);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredProducts = productList.filter((item: any) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.price.toString().includes(searchQuery)
  );
  
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
                  <h3 className="font-semibold text-base text-blueGray-700">Danh Sách Sản Phẩm</h3>
                </div>
                <div className="">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Tìm kiếm sản phẩm..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-2xl outline-none"
                  />
                </div>
                <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                  <button className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                    <Link to='/products/add'>Thêm</Link>
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
                      Ảnh
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Giá
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Hành động
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredProducts.map((item: any, index: number) => (
                    <tr key={index}>
                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
                        {item._id}
                      </th>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {item.name}
                      </td>

                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          <img src={item.image} alt="" className='w-[100px]'/>
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {item.price} vnd
                      </td>
                      <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <button className="text-indigo-500 hover:text-indigo-700 px-3 py-1" onClick={() => mutate(item._id)}>Xóa</button>
                        <button className="text-indigo-500 hover:text-indigo-700 px-3 py-1">
                          <Link to={`/products/edit/${item._id}`}>Sửa</Link>
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
                    total={totalProducts}
                    onChange={handlePaginationChange}
                />
            </div>
        </div>
      </section>

    </div>
  )
}

export default ProductList
