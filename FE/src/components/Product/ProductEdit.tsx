import { useMutation, useQuery } from '@tanstack/react-query';
import { Button, Form, Input, InputNumber, Select, Table, message } from 'antd';
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import instance from '../../config/axios';
import { useCategories } from '../../hook/category/useCategories';
import { useWareHouse } from '../../hook/warehouse/useWareHouse';
import ImageUpload from '../../utils/Upload';

const { Option } = Select;

const ProductEdit = () => {
  const { id } = useParams();
  const { data: categories = [] } = useCategories(1,9);
  const { data: ware = [] } = useWareHouse(1,9);
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState('');
  const [ingredients, setIngredients] = useState<any[]>([]);
  const [selectedWare, setSelectedWare] = useState<any>(null);
  const [selectedUnit, setSelectedUnit] = useState<string>('');
  const [count, setCount] = useState<number | null>(1);
  const navigate = useNavigate();

  useQuery({
    queryKey: ['PRODUCT_EDIT', id],
    queryFn: async () => {
      const res = await instance.get(`/product/${id}`);

      form.setFieldsValue(res.data.data);
      setImageUrl(res.data.data.image);
      setIngredients(res.data.data.ingredients || []);
      return res.data.data;
    },
  });

  const { mutate } = useMutation({
    mutationFn: async (product: any) => {
      const { data } = await instance.put(`/product/${id}`, product);
      return data;
    },
    onSuccess: () => {
      message.success('Cập nhật sản phẩm thành công!');
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
      id: selectedWare._id,
      wareHouse: selectedWare._id,
      name: selectedWare.name,
      count: count,
      unit: selectedUnit,
    };

    setIngredients((prev) => [...prev, ingredient]);
    setSelectedWare(null);
    setCount(1);
  };

  const onSubmit = (product: any) => {
    const productData = { 
      ...product, 
      image: imageUrl, 
      ingredients: ingredients,
    };

    mutate(productData);
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
            const index = ingredients.findIndex(item => item.id === record.id); 
            if (index !== -1) {
              const updatedIngredients = [...ingredients]; 
              updatedIngredients.splice(index, 1); 
              setIngredients(updatedIngredients); 
            }
          }}
        >
          Xóa
        </Button>
      ),
    },
  ];

  return (
    <section className="max-w-4xl p-6 mx-auto rounded-md shadow-md bg-white mt-20">
      <h1 className="text-xl font-bold capitalize text-black text-center mb-4">Cập Nhật Sản Phẩm</h1>
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
        form={form}
        onFinish={onSubmit}
        autoComplete="off"
      >
        <Form.Item
          label="Danh mục"
          name="category"
          rules={[{ required: true, message: 'Vui lòng chọn danh mục!' }]}>
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

          {/* <Form.Item
            label="Đơn vị"
            name="unit"
            style={{ flex: 1 }}
            >
            <Input
              value={selectedUnit}
              style={{ width: '100%' }}
              placeholder="Nhập đơn vị"
            />
          </Form.Item> */}
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
          rules={[{ required: true, message: 'Vui lòng nhập giá!' }]}>
          <InputNumber min={0} style={{ width: '100%' }} placeholder="Nhập giá" />
        </Form.Item>

        <Form.Item label="Discount" name="discount">
          <Input placeholder="Nhập giảm giá (nếu có)" />
        </Form.Item>

        <div className="flex">
          <Form.Item wrapperCol={{ offset: 6, span: 14 }}>
            <Button type="primary" htmlType="submit">
              Lưu
            </Button>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 6, span: 14 }}>
            <Link to='/products'>
            <Button type="primary" htmlType="submit">
              Quay Lại
            </Button>
            </Link>
          </Form.Item>
        </div>
      </Form>
    </section>
  );
};

export default ProductEdit;
