import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, InputNumber, Select, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import instance from '../../config/axios';
import { useCategories } from '../../hook/category/useCategories';
import { useWareHouse } from '../../hook/warehouse/useWareHouse';
import { Product } from '../../interfaces/Product';

const { Option } = Select;

const ProductAdd = () => {
  const { data: categories = [] } = useCategories();
  const { data: ware = [] } = useWareHouse();
  const [imageUrl, setImageUrl] = useState('');
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (product: Product) => {
      const res = await instance.post('/product', product);
      return res.data;
    },
    onSuccess: () => {
      message.success('Thêm sản phẩm thành công!');
      navigate('/products');
    },
    onError: () => {
      message.error('Có lỗi xảy ra, vui lòng thử lại!');
    },
  });

  const handleUpload = () => {
    window.cloudinary.createUploadWidget(
      {
        cloudName: 'doikbjukg',
        uploadPreset: 'Image1',
      },
      (error: any, result: any) => {
        if (result && result.event === 'success') {
          setImageUrl(result.info.secure_url);
          message.success('Tải ảnh lên thành công!');
        }
      }
    ).open();
  };

  const onSubmit = (product: any) => {
    const productData = { ...product, image: imageUrl };
    mutation.mutate(productData);
  };

  return (
    <section className="max-w-4xl p-6 mx-auto rounded-md shadow-md bg-white mt-20">
      <h1  className="text-xl font-bold capitalize text-black text-center mb-4">Thêm Mới Sản Phẩm</h1>
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
        onFinish={onSubmit}
        autoComplete="off"
      >
        <Form.Item
          label="Danh mục"
          name="category"
          rules={[{ required: true, message: 'Vui lòng chọn danh mục!' }]}
        >
          <Select placeholder="Chọn danh mục">
            {categories.map((item: any) => (
              <Option key={item._id} value={item._id}>
                {item.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Tên sản phẩm"
          name="name"
          rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}
        >
          <Input placeholder="Nhập tên sản phẩm" />
        </Form.Item>

        <Form.Item
          label="Nguyên liệu"
          name="wareHouse"
          rules={[{ required: true, message: 'Vui lòng chọn nguyên liệu!' }]}
        >
          <Select placeholder="Chọn nguyên liệu">
            {ware.map((item: any) => (
              <Option key={item._id} value={item._id}>
                {item.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Số lượng"
          name="count"
          rules={[{ required: true, message: 'Vui lòng nhập số lượng!' }]}
        >
          <InputNumber min={1} style={{ width: '100%' }} placeholder="Nhập số lượng" />
        </Form.Item>

        <Form.Item
          label="Đơn vị"
          name="unit"
          rules={[{ required: true, message: 'Vui lòng chọn đơn vị!' }]}
        >
          <Select placeholder="Chọn đơn vị">
            {ware.map((item: any) => (
              <Option key={item._id} value={item.unit}>
                {item.unit}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Ảnh">
          <Button icon={<UploadOutlined />} onClick={handleUpload}>
            Tải ảnh lên
          </Button>
          {imageUrl && <img src={imageUrl} alt="Uploaded" style={{ marginTop: '10px', maxWidth: '100px' }} />}
        </Form.Item>

        <Form.Item
          label="Giá"
          name="price"
          rules={[{ required: true, message: 'Vui lòng nhập giá!' }]}
        >
          <InputNumber min={0} style={{ width: '100%' }} placeholder="Nhập giá" />
        </Form.Item>

        <Form.Item label="Discount" name="discount">
          <Input placeholder="Nhập giảm giá (nếu có)" />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 6, span: 14 }}>
          <Button type="primary" htmlType="submit">
            Lưu
          </Button>
        </Form.Item>
      </Form>
    </section>
  );
};

export default ProductAdd;
