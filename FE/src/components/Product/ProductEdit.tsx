import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import instance from '../../config/axios'
import { useCategories } from '../../hook/category/useCategories'
import { useWareHouse } from '../../hook/warehouse/useWareHouse'

const ProductEdit = () => {
    const { id } = useParams()
    const { data: categories = [] } = useCategories() 
    const { data: ware = [] } = useWareHouse() 
    const navigate = useNavigate()
    const { 
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm()

    const {data} = useQuery({
        queryKey: ['PRODUCT_EDIT', id],
        queryFn: async () => {
            const res = await instance.get(`/product/${id}`)
            reset(res.data.data)
            return res.data.data
        }
    })
    const mutation = useMutation({
        mutationFn: async (product: any) => {
            const res = await instance.put(`/product/${product._id}`, product)
            return res.data
        },
        onSuccess: () => {
            alert("Cập nhật thành công!")
            navigate('/products')
        },
    })

    const onSubmit = (product: any) => {
        mutation.mutate(product)
    }

    return (
        <div>
            <section className="max-w-4xl p-6 mx-auto rounded-md shadow-md dark:bg-gray-800 mt-20">
                <h1 className="text-xl font-bold text-white capitalize dark:text-white">Cập Nhật Sản Phẩm</h1>
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
                            <input
                                type="text"
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                {...register('image', { required: true })}
                            />
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

export default ProductEdit
