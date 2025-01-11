import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Pagination } from 'antd';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCategories } from '../../hook/category/useCategories';
import { useProduct } from '../../hook/product/useProduct';
import useCart from '../../hook/useCart';
import useOrder from '../../hook/useOrder';
import { useQuery } from '@tanstack/react-query';
import instance from '../../config/axios';

const MenuAll = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(9);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { data: categories = [] } = useCategories(currentPage, pageSize);
  const { data: products = [] } = useProduct(currentPage, pageSize, selectedCategory);
  const { createNewOrder } = useOrder(currentPage, pageSize);
  const { data, mutate, calculateTotal } = useCart();
  const [showTextarea, setShowTextarea] = useState(false);
  const [notes, setNotes] = useState('');

  const categoriesList = categories.data || [];
  const productList = products?.data || [];

  const filteredProducts = selectedCategory
    ? productList.filter((item: any) => item.categoryId === selectedCategory)
    : productList;

  const totalProducts = products?.pagination?.total || 0;

  const { data: relatedProduct, isLoading: isLoadingRelatedProduct } = useQuery({
    queryKey: ['RELATED_PRODUCT', selectedCategory],
    queryFn: async () => {
      if (selectedCategory) {
        const { data } = await instance.get(`/product/${selectedCategory}/related/`);
        return data;
      }
      return [];
    },
    
  });

  const handleCategoryClick = (categoryId: any) => {
    setSelectedCategory(categoryId);
  };

  const handleAllProductsClick = () => {
    setSelectedCategory(null);
  };

  const handlePaginationChange = (page: number, size: number) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  const handleCreateOrder = () => {
    const orderItem = data?.products || [];
    const totalPrice = calculateTotal();
    const status = 'Processing';
    createNewOrder(orderItem, totalPrice, status, notes);
  };

  return (
    <div>
      <div className="grid grid-cols-[60%,1fr] p-6 gap-10">
        <div className="">
          {/* Nav Categories */}
          <div className="p-4">
          <button
              className="text-white p-4 bg-gray-300 mx-4 rounded-xl text-black font-semibold hover:bg-red-400 hover:text-white"
              onClick={handleAllProductsClick}
            >
              Tất Cả
            </button>
            {Array.isArray(categoriesList) &&
              categoriesList.map((item) => (
                <button
                  key={item._id}
                  className="text-white p-4 bg-gray-300 mx-4 rounded-xl text-black font-semibold hover:bg-red-400 hover:text-white"
                  onClick={() => {
                    handleCategoryClick(item._id);
                  }}
                >
                  {item.name}
                </button>
              ))}
          </div>

          {/* Products */}
          <div className="grid grid-cols-3 gap-4">
            {Array.isArray(filteredProducts) &&
              filteredProducts?.map((item) => (
                <div key={item._id} className="bg-white p-1">
                  <img src={item.image} alt="" className="w-full" />
                  <div className="flex justify-between my-1">
                    <p>{item.name}</p>
                    <span className="text-red-700">{item.price}vnd</span>
                  </div>
                  <button
                    className="bg-red-500 w-full rounded-lg p-1 text-white hover:bg-gray-400"
                    onClick={() => {
                      mutate({
                        action: 'add-to-cart',
                        productId: item._id,
                        quantity: 1,
                        notes: notes || '',
                      });
                    }}
                  >
                    Thêm
                  </button>
                </div>
              ))}
          </div>

         

          {/* Related Products */}
          {selectedCategory && !isLoadingRelatedProduct && (
            <div className="mt-6">
              {Array.isArray(relatedProduct) && relatedProduct.length > 0 ? (
                <div className="grid grid-cols-3 gap-4">
                  {relatedProduct.map((item) => (
                    <div key={item._id} className="bg-white p-1">
                      <img src={item.image} alt={item.name} className="w-full" />
                      <div className="flex justify-between my-1">
                        <p>{item.name}</p>
                        <span className="text-red-700">{item.price} vnd</span>
                      </div>
                      <button
                        className="bg-red-500 w-full rounded-lg p-1 text-white hover:bg-gray-400"
                        onClick={() => {
                          mutate({
                            action: 'add-to-cart',
                            productId: item._id,
                            quantity: 1,
                            notes: notes || '',
                          });
                        }}
                      >
                        Thêm
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className='text-white font-bold text-center'>Không có sản phẩm</p>
              )}
            </div>
          )}

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

        

        {/* Order */}
        <div className="bg-gray-300 rounded-xl">
          <h1 className="text-center font-semibold text-3xl">Đơn Hàng</h1>
          <table className="w-full">
            <thead>
              <tr>
                <td className="bg-gray-400 text-center p-2 font-semibold">Tên món</td>
                <td className="bg-gray-400 text-center p-2 font-semibold">Số lượng</td>
                <td className="bg-gray-400 text-center p-2 font-semibold">Giá</td>
                <td className="bg-gray-400 text-center p-2 font-semibold">Thành tiền</td>
                <td className="bg-gray-400 text-center p-2 font-semibold">Action</td>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(data?.products) &&
                data.products.map((item: any, index: number) => (
                  <tr key={index}>
                    <td className="text-center p-2">{item.name}</td>
                    <td className="text-center p-2">
                      <div className="flex items-center justify-center">
                        <button
                          onClick={() =>
                            mutate({
                              action: 'decrease',
                              productId: item.productId,
                              quantity: item.quantity - 1,
                            })
                          }
                          className="bg-gray-200 px-2 py-1 rounded-l hover:bg-gray-300"
                        >
                          -
                        </button>
                        <span className="px-4">{item.quantity}</span>
                        <button
                          onClick={() =>
                            mutate({
                              action: 'increase',
                              productId: item.productId,
                              quantity: item.quantity + 1,
                            })
                          }
                          className="bg-gray-200 px-2 py-1 rounded-r hover:bg-gray-300"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="text-center p-2">{item.price} vnd</td>
                    <td className="text-center p-2">{item.price * item.quantity} vnd</td>
                    <td className="text-center p-2">
                      <button
                        onClick={() =>
                          mutate({
                            action: 'remove',
                            productId: item.productId,
                            quantity: 0,
                            notes: notes || '',
                          })
                        }
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div className="flex flex-col p-4">
            <p className="font-semibold text-lg">
              Tổng giá: <span className="text-red-600">{calculateTotal()} vnd</span>
            </p>
            <div className="flex justify-end">
              <button className="bg-green-700 text-white p-2 rounded-lg" onClick={handleCreateOrder}>
                <Link to="/order">Thanh toán</Link>
              </button>
              <button
                className="bg-blue-700 text-white p-2 rounded-lg mx-2"
                onClick={() => setShowTextarea(!showTextarea)}
              >
                Ghi Chú
              </button>
            </div>
            {showTextarea && (
              <textarea
                className="w-full mt-4 p-2 border border-gray-300 rounded-lg"
                rows={3}
                placeholder="Nhập ghi chú..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuAll;
