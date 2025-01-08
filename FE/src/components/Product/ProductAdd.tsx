import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import instance from '../../config/axios'
import { useCategories } from '../../hook/category/useCategories'
import { useWareHouse } from '../../hook/warehouse/useWareHouse'

const ProductAdd = () => {
    const { data: categories = [] } = useCategories() 
    const { data: ware = [] } = useWareHouse() 
    const [imageUrl, setImageUrl] = useState('');

    const navigate = useNavigate()
    const { 
        register,
        handleSubmit,
        formState: { errors }
    } = useForm()

    const mutation = useMutation({
        mutationFn: async (product: any) => {
            const res = await instance.post('/product', product)
            return res.data
        },
        onSuccess: () => {
            alert("Thêm thành công!")
            navigate('/products')
        },
    })
    const handleUpload = () => {
        window.cloudinary.createUploadWidget(
        {
            cloudName: 'doikbjukg',
            uploadPreset: 'Image1', // Tạo upload preset trong dashboard của Cloudinary
        },
        (error: any, result: any) => {
            if (result && result.event === 'success') {
            setImageUrl(result.info.secure_url); // Lấy URL ảnh đã upload
            }
        }
        ).open();
    };
    const onSubmit = (product: any) => {
        const productData = { ...product, image: imageUrl };
        mutation.mutate(productData)
    }


   
    return (
        <div>
            <section className="max-w-4xl p-6 mx-auto rounded-md shadow-md dark:bg-gray-800 mt-20">
                <h1 className="text-xl font-bold text-white capitalize dark:text-white">Thêm Mới Sản Phẩm</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                        <div>
                            <label className="text-white dark:text-gray-200">Danh mục</label>
                            <select {...register('category', { required: true })}>
                                {categories?.map((item: any) => (
                                    <option key={item._id} value={item._id}>{item.name}</option>
                                ))}
                            </select>
                        </div>

                        

                        <div>
                            <label className="text-white dark:text-gray-200">Tên</label>
                            <input
                                type="text"
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                {...register('name', { required: true })}
                            />
                        </div>
                        
                        <div className="">
                        <div>
                            <label className="text-white dark:text-gray-200">Tên Nguyên liệu</label>
                            <select {...register('wareHouse', { required: true })}>
                                {ware?.map((item: any) => (
                                    <option key={item._id} value={item._id}>{item.name}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="text-white dark:text-gray-200">Số lượng</label>
                            <input
                                type="number"
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                {...register('countInStock', { required: true })}
                            />
                        </div>

                        <div>
                            <label className="text-white dark:text-gray-200">Đơn vị</label>
                            <select {...register('unit', { required: true })}>
                                {ware.map((item: any) => (
                                    <option key={item._id} value={item.unit}>{item.unit}</option>
                                ))}
                            </select>
                        </div>
                        
                        </div>

                        <div>
                            <label className="text-white dark:text-gray-200">Ảnh</label>
                            <button type="button" onClick={handleUpload} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
                                Upload Image
                            </button>
                            {imageUrl && <img src={imageUrl} alt="Uploaded" style={{ width: '100px', marginTop: '10px' }} />}
                        </div>

                        <div>
                            <label className="text-white dark:text-gray-200">Giá</label>
                            <input
                                type="number"
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                {...register('price', { required: true })}
                            />
                        </div>

                        <div>
                            <label className="text-white dark:text-gray-200">Discount</label>
                            <input
                                type="text"
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                {...register('discount')}
                            />
                        </div>
                    </div>

                    <div className="flex justify-end mt-6">
                        <button
                            type="submit"
                            className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600"
                        >
                            Lưu
                        </button>
                    </div>
                </form>
            </section>
        </div>
    )
}

export default ProductAdd
