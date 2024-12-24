import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import {useForm} from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import instance from '../../config/axios'
const CategoryAdd = () => {
    const navigate = useNavigate()
    const { 
        register,
        handleSubmit,
        formState: {errors}
    } = useForm()

    const mutation = useMutation({
        mutationFn: async (cate) => {
            const res = await instance.post('/categories', cate)
            return res.data
        },
        onSuccess: () => {
            alert("Thêm thành công!"),
            navigate('/categories')
        },
    })

    const onSubmit = (cate: any) => {
        mutation.mutate(cate)
    }
  return (
    <div>
      <section className="max-w-4xl p-6 mx-auto  rounded-md shadow-md dark:bg-gray-800 mt-20">
        <h1 className="text-xl font-bold text-white capitalize dark:text-white">Thêm Mới Danh Mục</h1>
    <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
                <label className="text-white dark:text-gray-200">Tên</label>
                <input type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" {...register('name', {required: true})} />
            </div>

            <div>
                <label className="text-white dark:text-gray-200" >Slug</label>
                <input type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" {...register('slug', {required: true})}/>
            </div>

            
        </div>

        <div className="flex justify-end mt-6">
            <button className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600">Lưu</button>
        </div>
    </form>
</section>
 
    </div>
  )
}

export default CategoryAdd
