import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import instance from '../../config/axios'
import { useLocalStorage } from '../../hook/useStorage'

const Login = () => {
    const [, setUser] = useLocalStorage('user', {})
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: {
            email: '',
            password: '',
        }
    })
    const navigate = useNavigate()
    const { mutate } = useMutation( { 
        mutationFn: async (formData: { email: string, password: string}) => {
            const { data } = await instance.post('/auth/signin', formData)
            return data
        },
        onSuccess: (data) => {
            setUser(data),
            navigate('/statis')
            Swal.fire({
                title: 'Đăng nhập thành công!',
                icon: 'success',
                confirmButtonText: 'OK'
            });
        },
        onError: (error) => console.log(error)
    })

    const onSubmit = (formData: { email: string; password: string }) => {
        mutate(formData)
    }

  return (
    <div className="relative h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url("https://fnbvietnam.vn/wp-content/uploads/2019/07/giay-phep-kinh-doanh-2.jpg")' }}>
        <div className="flex h-full flex-col justify-center px-6 py-12 lg:px-8 bg-black bg-opacity-50">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-white">Đăng Nhập</h2>
            </div>  

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" method="POST" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label className="block text-sm font-medium text-white">Email</label>
                        <div className="mt-2">
                            <input type="email"
                                {...register('email', {
                                    required: { value: true, message: 'Vui lòng nhập email!' },
                                    minLength: { value: 6, message: 'Email phải có ít nhất 6 ký tự!' }
                                })}
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm" />
                            {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label className="block text-sm font-medium text-white">Mật khẩu</label>
                            <div className="text-sm">
                                <Link to='/auth/forgot-password' className=" text-white hover:text-indigo-500">Quên mật khẩu?</Link>
                            </div>
                        </div>
                        <div className="mt-2">
                            <input type="password"
                                {...register('password', {
                                    required: { value: true, message: 'Vui lòng nhập mật khẩu!' },
                                    minLength: { value: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự!' }
                                })}
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm" />
                            {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Đăng nhập</button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-white">
                    Chưa có tài khoản? 
                    <Link to="/auth/register" className="font-semibold text-blue-400 hover:text-indigo-500">Đăng ký</Link>
                </p>
            </div>
        </div>
    </div>
  )
}

export default Login
