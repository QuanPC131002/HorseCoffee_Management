import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import instance from "../../config/axios";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { Logo } from "../../upload";

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
        <div className="relative min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url("https://fnbvietnam.vn/wp-content/uploads/2019/07/giay-phep-kinh-doanh-2.jpg")' }}>
    <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-black bg-opacity-50">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            {/* <img
                className="mx-auto h-20"
                src={Logo}
                alt="Your Company"
                style={{ backgroundColor: 'transparent' }}
            /> */}
            <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-white">
                Forgot Password
            </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" method="POST" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label className="block text-sm font-medium text-white">Email</label>
                    <div className="mt-2">
                        <input
                            type="email"
                            {...register('email', { required: true })}
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-2">Email là bắt buộc.</p>
                        )}
                    </div>
                </div>
                <div>
                    <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
