import { useMutation } from '@tanstack/react-query'
import { Button, Form, Input, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import instance from '../../config/axios'
import Swal from 'sweetalert2'
const CategoryAdd = () => {
    const navigate = useNavigate()
    const mutation = useMutation({
        mutationFn: async (cate) => {
            const res = await instance.post('/categories', cate)
            return res.data
        },
        onSuccess: () => {
          Swal.fire({
            title: 'Thêm danh mục thành công!',
            icon: 'success',
            confirmButtonText: 'OK'
          });
            navigate('/categories')
        },
        onError: () => {
          Swal.fire({
            title: 'Có lỗi xảy ra, vui lòng thử lại!',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        },        
    })

    const onSubmit = (cate: any) => {
        mutation.mutate(cate)
    }
  return (
    <div>
      <section className="max-w-4xl p-6 mx-auto  rounded-md shadow-md bg-white mt-20">
        <h1 className="text-xl font-bold text-black capitalize text-center mb-4">Thêm Mới Danh Mục</h1>
        <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
        onFinish={onSubmit}
        autoComplete="off"
      >
        <Form.Item
          label="Tên danh mục"
          name="name"
          rules={[
            { required: true, message: 'Vui lòng nhập tên danh mục!' },
            { min: 3, message: 'Tên danh mục phải có ít nhất 3 ký tự!' },
            { max: 255, message: 'Tên danh mục không được quá 255 ký tự!' },
          ]}
        >
          <Input placeholder="Nhập tên danh mục" />
        </Form.Item>

        <Form.Item
          label="Slug"
          name="slug"
          rules={[
            { required: true, message: 'Vui lòng nhập slug!' },
            { pattern: /^[a-z0-9-]+$/, message: 'Slug phải là chuỗi chữ cái hoặc số, có thể có dấu gạch ngang!' },
          ]}
        >
          <Input placeholder="Nhập slug" />
        </Form.Item>
        
       
        <Form.Item wrapperCol={{ offset: 6, span: 14 }}>
          <Button type="primary" htmlType="submit">
            Lưu
          </Button>
        </Form.Item>
    </Form>
    </section>
 
    </div>
  )
}

export default CategoryAdd
