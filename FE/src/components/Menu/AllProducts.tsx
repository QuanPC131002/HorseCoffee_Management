import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useQuery } from '@tanstack/react-query';
import { Button, Card, Col, Modal, Pagination, Row } from 'antd';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import instance from '../../config/axios';
import { useCategories } from '../../hook/category/useCategories';
import { useProduct } from '../../hook/product/useProduct';
import useCart from '../../hook/useCart';
import useOrder from '../../hook/useOrder';

const MenuAll = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(9);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { data: categories = [] } = useCategories(currentPage, pageSize);
  const { data: products = [] } = useProduct(currentPage, pageSize, selectedCategory);
  const { createNewOrder, orderModal, setIsOrderModal} = useOrder(currentPage, pageSize);
  const { data, mutate, calculateTotal } = useCart();
  const [showTextarea, setShowTextarea] = useState(false);
  const [notes, setNotes] = useState('');

  const navigate = useNavigate()

  const categoriesList = categories || [];
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
    // const orderItem = data?.products || [];
    // const totalPrice = calculateTotal();
    // const status = 'Processing';
    // createNewOrder(orderItem, totalPrice, status, notes);
    setIsOrderModal(true)
  };

  //Modal Checkout
  const handleOk = () => {

    const orderItem = data?.products || [];
    const totalPrice = calculateTotal();
    const status = 'Processing';
    setIsOrderModal(false);

    createNewOrder(orderItem, totalPrice, status, notes);
    Swal.fire({
      title: 'Tạo đơn thành công!',
      text: 'Đơn hàng của bạn đã được tạo thành công.',
      icon: 'success',
      confirmButtonText: 'OK'
    }).then((result) => {
      if(result.isConfirmed){
        navigate('/order')
      }
    })
  };

  const handleCancel = () => {
    setIsOrderModal(false);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
  };

  const isCartEmpty = !data?.products || data.products.length === 0;
  return (
    <div>
      <div className="grid grid-cols-[60%,1fr] p-6 gap-10">
        <div className="">
          {/* Nav Categories */}
          <div className="p-4">
          <Button
              className="text-white p-4 bg-gray-300 mx-4 rounded-xl text-black font-semibold hover:bg-red-400 hover:text-white"
              onClick={handleAllProductsClick}
            >
              Tất Cả
            </Button>
            {Array.isArray(categoriesList) &&
              categoriesList.map((item) => (
                <Button
                  key={item._id}
                  className="text-white p-4 bg-gray-300 mx-4 rounded-xl text-black font-semibold hover:bg-red-400 hover:text-white"
                  onClick={() => {
                    handleCategoryClick(item._id);
                  }}
                >
                  {item.name}
                </Button>
              ))}
          </div>

          {/* Products */}
          <div className="p-4">
            <Row gutter={[12, 12]}>
              {Array.isArray(filteredProducts) &&
                filteredProducts.map((item) => (
                  <Col key={item._id} span={6}>
                    {/* Chiều rộng cột cho mỗi sản phẩm */}
                    <Card
                      hoverable
                      cover={
                        <img
                          alt={item.name}
                          src={item.image}
                          style={{ objectFit: "cover", height: "200px", width: "100%" }}
                        />
                      }
                      className="bg-white"
                    >
                      <div className="flex justify-between mb-2 items-center">
                        <p className="truncate">{item.name}</p>
                        <span className="text-red-700 whitespace-nowrap">
                          {formatPrice(item.price)}
                        </span>
                      </div>

                      {item.countInStock === 0 && (
                        <p className="text-red-600 font-semibold text-sm">Hết hàng</p>
                      )}

                      <Button
                        className="w-full mt-auto"
                        onClick={() => {
                          mutate({
                            action: "add-to-cart",
                            productId: item._id,
                            quantity: 1,
                            notes: notes || "",
                          });
                        }}
                        disabled={item.countInStock === 0} 
                      >
                        Thêm
                      </Button>
                    </Card>
                  </Col>
                ))}
            </Row>
          </div>


         

          {/* Related Products */}
          {selectedCategory && !isLoadingRelatedProduct && (
            <Row gutter={[12, 12]}>
              {Array.isArray(relatedProduct) && relatedProduct.length > 0 ? (
                relatedProduct.map((item) => (
                  <Col key={item._id} span={6}>
                    <Card
                      hoverable
                      cover={
                        <img
                          alt={item.name}
                          src={item.image}
                          style={{ objectFit: 'cover', height: '200px', width: '100%' }}
                        />
                      }
                      className="bg-white"
                    >
                      <div className="flex justify-between mb-2 items-center">
                        <p className="truncate">{item.name}</p>
                        <span className="text-red-700 whitespace-nowrap">{formatPrice(item.price)}</span>
                      </div>
                      <Button
                        className="w-full mt-auto"
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
                      </Button>
                    </Card>
                  </Col>
                ))
              ) : (
                <p className="text-white font-bold text-center">Không có sản phẩm</p>
              )}
            </Row>
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
                    <td className="text-center p-2">{formatPrice(item.price)}</td>
                    <td className="text-center p-2">{formatPrice(item.price * item.quantity)}</td>
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
              Tổng giá: <span className="text-red-600">{formatPrice(calculateTotal())}</span>
            </p>
            <div className="flex justify-end">
            <Button className={`p-2 rounded-lg ${isCartEmpty ? 'bg-gray-400 text-gray-600 cursor-not-allowed' : 'bg-green-700 text-white'}`} onClick={handleCreateOrder} disabled={isCartEmpty}>
              {!isCartEmpty ? (
                <Link to="/menu">Thanh toán</Link>
              ) : (
                'Thanh toán'
              )}
            </Button>
            <Modal title="Chi tiết đơn hàng" open={orderModal} onOk={handleOk} onCancel={handleCancel}>
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
              {Array.isArray(data?.products) &&
                data.products.map((item: any, index: number) => (
                  <tr key={index}>
                    <td className="text-center p-2">{item.name}</td>
                    <td className="text-center p-2">
                      <div className="flex items-center justify-center">
                        <span className="px-4">{item.quantity}</span>
                      </div>
                    </td>
                    <td className="text-center p-2">{item.price} vnd</td>
                    <td className="text-center p-2">{item.price * item.quantity} vnd</td>
                  </tr>
                ))}
              </tbody>
            </table>
            </Modal>
              <Button
                type='primary'
                className={`p-2 rounded-lg ${isCartEmpty ? 'bg-gray-400 text-gray-600 cursor-not-allowed' : 'bg-blue-700 text-white'}`}
                onClick={() => setShowTextarea(!showTextarea)}
              >
                Ghi Chú
              </Button>
            </div>
            {showTextarea && !isCartEmpty && (
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
