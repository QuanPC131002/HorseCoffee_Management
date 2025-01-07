import { useMutation } from '@tanstack/react-query';
import { Radio } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import instance from '../../config/axios';
import { useLocalStorage } from '../../hook/useStorage';

const Register = () => {
    const [, setUser] = useLocalStorage('user', {});
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        control
    } = useForm({
        defaultValues: {
            name: '',
            email: '',
            password: '',
            phone: 0,
            role: 'member', 
        }
    });
    const navigate = useNavigate();
    const { mutate } = useMutation({
        mutationFn: async (formData) => {
            const { data } = await instance.post('/auth/signup', formData);
            return data;
        },
        onSuccess: (data) => {
            setUser(data);
            navigate('/auth/');
            Swal.fire({
                title: 'Đăng ký thành công!',
                icon: 'success',
                confirmButtonText: 'OK'
            });
        },
        onError: (error) => console.log(error)
    });

    const onSubmit = (formData: any) => {
        mutate(formData); 
    };

    return (
        <div>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Register to your account</h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" method="POST" onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label className="block text-sm/6 font-medium text-gray-900">Name</label>
                            <div className="mt-2">
                                <input type="text" {...register('name', { required: true, minLength: 3 })} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                                {errors.name && <p className="text-[red]">{errors.name.message}</p>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm/6 font-medium text-gray-900">Email address</label>
                            <div className="mt-2">
                                <input type="email" {...register('email', { required: true, minLength: 3 })} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                                {errors.email && <p className="text-[red]">{errors.email.message}</p>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm/6 font-medium text-gray-900">Password</label>
                            <div className="mt-2">
                                <input type="password" {...register('password', { required: true, minLength: 6 })} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                                {errors.password && <p className="text-[red]">{errors.password.message}</p>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm/6 font-medium text-gray-900">Phone</label>
                            <div className="mt-2">
                                <input type="number" {...register('phone', { required: true, minLength: 9 })} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                                {errors.phone && <p className="text-[red]">{errors.phone.message}</p>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-900">Role</label>
                            <div className="mt-2">
                            <Controller
                                name="role"
                                control={control} 
                                render={({ field }) => (
                                    <Radio.Group {...field} defaultValue="member">
                                        <Radio value="member">Nhân viên</Radio>
                                        <Radio value="cash">Thu ngân</Radio>
                                        <Radio value="admin">Quản lý</Radio>
                                    </Radio.Group>
                                )}
                            />
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign up</button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm/6 text-gray-500">
                        Already a member? <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Login</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
