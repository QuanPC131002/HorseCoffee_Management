import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import instance from "../../config/axios";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

const ForgotPassword = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    const { mutate } = useMutation({
        mutationFn: async (formData) => {
            const { data } = await instance.post(`/auth/forgot-password/`, formData);
            return data;
        },
        onSuccess: () => {
            Swal.fire({
                title: 'Gửi OTP thành công!',
                icon: 'success',
                confirmButtonText: 'OK'
            });
            navigate('/auth/reset-password');
        }
    });

    const onSubmit = (formData: any) => {
        localStorage.setItem("email", formData.email);
        mutate(formData);
    };

    return (
        <div>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-10 w-auto"
                        src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                    />
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                        Forgot Password
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" method="POST" onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label className="block text-sm/6 font-medium text-gray-900">Email</label>
                            <div className="mt-2">
                                <input
                                    type="email"
                                    {...register('email', { required: true })}
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm mt-2">Email là bắt buộc.</p>
                                )}
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                SEND OTP
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
