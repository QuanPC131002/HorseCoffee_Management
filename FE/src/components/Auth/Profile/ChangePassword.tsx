import { Button, Form, Input } from 'antd';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import instance from '../../../config/axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, control } = useForm();

  const { mutate } = useMutation({
    mutationFn: async (formData) => {
      const { data } = await instance.put(`/auth/change-password`, formData);
      return data;
    },
    onSuccess: () => {
      navigate('/profile');
      Swal.fire({
        title: 'Đổi mật khẩu thành công!',
        icon: 'success',
        confirmButtonText: 'OK',
      });
    },
  });

  const onSubmit = (formData: any) => {
    mutate(formData);
  };

  return (
    <div>
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={handleSubmit(onSubmit)} 
      >
        <Form.Item
          label="Email"
          validateStatus={errors.email ? 'error' : ''}
          help={errors.email?.message}
        >
          <Controller
            name="email"
            control={control}
            rules={{ required: 'Vui lòng nhập email!' }}
            render={({ field }) => <Input {...field} />}
          />
        </Form.Item>

        <Form.Item
          label="Mật khẩu cũ"
          validateStatus={errors.oldPassword ? 'error' : ''}
          help={errors.oldPassword?.message}
        >
         <Controller
            name="oldPassword"
            control={control}
            rules={{ required: 'Vui lòng nhập mật khẩu cũ!' }}
            render={({ field }) => <Input.Password {...field} />}
          />
        </Form.Item>

        <Form.Item
          label="Mật khẩu mới"
          validateStatus={errors.newPassword ? 'error' : ''}
          help={errors.newPassword?.message}
        >
          <Controller
            name="newPassword"
            control={control}
            rules={{ required: 'Vui lòng nhập mật khẩu mới!' }}
            render={({ field }) => <Input.Password {...field} />}
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Đổi mật khẩu
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ChangePassword;
