import { useMutation, useQuery } from '@tanstack/react-query';
import { Button, Form, Input, InputNumber, Select, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import instance from '../../config/axios';
import { useCategories } from '../../hook/category/useCategories';
import { useWareHouse } from '../../hook/warehouse/useWareHouse';
import { Product } from '../../interfaces/Product';

const { Option } = Select;

const ProductEdit = () => {
  const { id } = useParams();
  const { data: categories = [] } = useCategories();
  const { data: ware = [] } = useWareHouse();
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState('');
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ['PRODUCT_EDIT', id],
    queryFn: async () => {
      const {data} = await instance.get(`/product/${id}`);
      form.setFieldsValue(data);
      setImageUrl(data.image); 
      return data;
    },
  });

  const mutation = useMutation({
    mutationFn: async (product: Product) => {
      const {data} = await instance.put(`/product/${product._id}`, product);
      return data;
    },
    onSuccess: () => {
      message.success('Cập nhật thành công!');
      navigate('/products');
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
          form.setFieldValue('image', result.info.secure_url);
        }
      }
    ).open();
  };

  const onSubmit = (product: Product) => {
    console.log(product);
    
    const productData = { ...product, image: imageUrl };
    mutation.mutate(productData);
  };
  
  return (
    <div>
      <section className="max-w-4xl p-6 mx-auto rounded-md shadow-md bg-white mt-20">
        <h1 className="text-xl font-bold  capitalize text-black text-center mb-4">Cập Nhật Sản Phẩm</h1>
        <Form
          form={form}
          layout="vertical"
          onFinish={onSubmit}
          initialValues={{ image: '' }}
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
            label="Tên"
            name="name"
            rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}
          >
            <Input placeholder="Tên sản phẩm" />
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
            <Input placeholder='Số lượng' />
          </Form.Item>

          <Form.Item
            label="Đơn vị"
            name="unit"
            rules={[{ required: true, message: 'Vui lòng chọn đơn vị!' }]}
          >
            <Select placeholder="Chọn đơn vị">
              {ware?.map((item: any) => (
                <Option key={item._id} value={item.unit}>
                  {item.unit}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Ảnh" name="image">
            <Button icon={<UploadOutlined />} onClick={handleUpload}>
              Upload Image
            </Button>
            {imageUrl && (
              <img
                src={imageUrl}
                alt="Uploaded"
                style={{ width: '100px', marginTop: '10px' }}
              />
            )}
          </Form.Item>

          <Form.Item
            label="Giá"
            name="price"
            rules={[{ required: true, message: 'Vui lòng nhập giá!' }]}
          >
            <InputNumber min={0} placeholder="Giá" style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item label="Discount" name="discount">
            <Input placeholder="Giảm giá" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Lưu
            </Button>
          </Form.Item>
        </Form>
      </section>
    </div>
  );
};

export default ProductEdit;
