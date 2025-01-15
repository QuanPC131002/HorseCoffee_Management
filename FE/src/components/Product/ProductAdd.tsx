import { useMutation } from '@tanstack/react-query';
import { Button, Form, Input, InputNumber, Select, Table, message } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import instance from '../../config/axios';
import { useCategories } from '../../hook/category/useCategories';
import { useWareHouse } from '../../hook/warehouse/useWareHouse';
import { Product } from '../../interfaces/Product';
import ImageUpload from '../../utils/Upload';

const { Option } = Select;

const ProductAdd = () => {
  const { data: categories = [] } = useCategories(1, 9);
  const { data: ware = [] } = useWareHouse(1, 9);
  const [imageUrl, setImageUrl] = useState('');
  const [ingredients, setIngredients] = useState<any[]>([]);
  const [selectedWare, setSelectedWare] = useState<any>(null);
  const [selectedUnit, setSelectedUnit] = useState<string>('');
  const [count, setCount] = useState<number | null>(1);
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

  const handleImageUploadSuccess = (url: any) => {
    setImageUrl(url);
  };
  const handleSelectWare = (value: any) => {
    const selected = ware.find((item: any) => item._id === value);
    setSelectedWare(selected);
    setSelectedUnit(selected?.unit || '');
  };

  const handleAddIngredient = () => {
    if (!selectedWare || !selectedUnit) {
      message.error('Vui lòng chọn nguyên liệu và đơn vị!');
      return;
    }

    const ingredient = {
      id:selectedWare._id,
      wareHouse: selectedWare._id,
      name: selectedWare.name,
      count: count,
      unit: selectedUnit,
    };

    setIngredients((prev) => [...prev, ingredient]);
    setSelectedUnit(selectedWare.unit);
    setSelectedWare(null);
    setCount(1);
  };

  const onSubmit = (product: any) => {
    const productData = { 
      ...product, 
      image: imageUrl, 
      ingredients: ingredients,
    };
    
    mutation.mutate(productData);
  };

  const columns = [
    {
      title: 'Tên nguyên liệu',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Số lượng',
      dataIndex: 'count',
      key: 'count',
    },
    {
      title: 'Đơn vị',
      dataIndex: 'unit',
      key: 'unit',
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_: any, record: any) => (
        <Button
          danger
          onClick={() => {
            setIngredients(ingredients.filter(item => item.id !== record.id));
          }}
        >
          Xóa
        </Button>
      ),
    },
  ];

  return (
    <section className="max-w-4xl p-6 mx-auto rounded-md shadow-md bg-white mt-20">
      <h1 className="text-xl font-bold capitalize text-black text-center mb-4">Thêm Mới Sản Phẩm</h1>
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
        onFinish={onSubmit}
        autoComplete="off"
      >
        <Form.Item
          label="Danh mục"
          name="category"
          rules={[{ required: true, message: 'Vui lòng chọn danh mục!' }]}>
          <Select placeholder="Chọn danh mục">
            {Array.isArray(categories) && categories.map((item: any) => (
              <Option key={item._id} value={item._id}>
                {item.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Tên sản phẩm"
          name="name"
          rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}>
          <Input placeholder="Nhập tên sản phẩm" />
        </Form.Item>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Form.Item
            label="Danh Sách Nguyên Liệu"
            name="wareHouse"
            style={{ flex: 1 }}
            >
            <Select
              placeholder="Chọn nguyên liệu"
              value={selectedWare?._id}
              onSelect={handleSelectWare}>
              {Array.isArray(ware) && ware.map((item: any) => (
                <Option key={item._id} value={item._id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Số lượng"
            name="count"
            style={{ flex: 1 }}
            >
            <InputNumber
              min={1}
              value={count}
              onChange={setCount}
              style={{ width: '100%' }}
              placeholder="Nhập số lượng"
            />
          </Form.Item>

          <Form.Item
            label="Đơn vị"
            name="unit"
            style={{ flex: 1 }}
            >
            <Input
              min={1}
              value={selectedUnit}
              style={{ width: '100%' }}
              placeholder="Nhập đơn vị"
            />
          </Form.Item>
          <Button
            type="primary"
            style={{ alignSelf: 'flex-end' }}
            onClick={handleAddIngredient}>
            Thêm nguyên liệu
          </Button>
        </div>

        <Table
          dataSource={ingredients}
          columns={columns}
          rowKey="id"
          pagination={false}
          style={{ marginBottom: '20px' }}
        />

        <Form.Item label="Ảnh">
          <ImageUpload onUploadSuccess={handleImageUploadSuccess} />
        </Form.Item>

        <Form.Item
          label="Giá"
          name="price"
          rules={[{ required: true, message: 'Vui lòng nhập giá!' }]}>
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
