import { useMutation } from '@tanstack/react-query'
import { Button, Form, Input, InputNumber, message } from 'antd'
import {  useNavigate } from 'react-router-dom'
import instance from '../../config/axios'


const WareAdd = () => {
    const navigate = useNavigate()
    const mutation = useMutation({
        mutationFn: async (ware) => {
            const res = await instance.post('/ware', ware)
            return res.data
        },
        onSuccess: () => {
            message.success("Thêm thành công!"),
            navigate('/ware')
        },
    })

    const onSubmit = (ware: any) => {
        mutation.mutate(ware)
    }
  return (
    <div>
      <section className="max-w-4xl p-6 mx-auto  rounded-md shadow-md bg-white mt-20">
    <h1 className="text-xl font-bold text-black capitalize text-center mb-4 ">Thêm Mới Kho</h1>
    <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
        onFinish={onSubmit}
        autoComplete="off"
      >
        <Form.Item
          label="Tên nguyên liệu"
          name="name"
          rules={[
            { required: true, message: 'Vui lòng nhập tên nguyên liệu!' },
            { min: 6, message: 'Tên nguyên liệu phải có ít nhất 3 ký tự!' },
            { max: 255, message: 'Tên nguyên liệu không được quá 255 ký tự!' },
          ]}
        >
          <Input placeholder="Nhập tên nguyên liệu" />
        </Form.Item>

        <Form.Item
          label="Số lượng"
          name="countInStock"
          rules={[
            { required: true, message: 'Vui lòng nhập số lượng!' },
            { min: 1, message: 'Số lượng phải có ít nhất 1!' },
          ]}
        >
          <InputNumber min={1} style={{ width: '100%' }} placeholder="Nhập số lượng" />
        </Form.Item>

        <Form.Item
          label="Đơn vị"
          name="unit"
          rules={[
            { required: true, message: 'Vui lòng nhập đơn vị!' },
            { min: 3, message: 'Đơn vị phải có ít nhất 3 ký tự!' },
            { max: 255, message: 'Đơn vị không được quá 255 ký tự!' },
          ]}
        >
            <Input placeholder="Nhập đơn vị" />

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

export default WareAdd
