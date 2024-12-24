import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import {useForm} from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import instance from '../../config/axios'
const WareEdit = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { 
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm()

    const {data} = useQuery({
        queryKey: ['Ware_EDIT', id],
        queryFn: async () => {
            const res = await instance.get(`/ware/${id}`)
            reset(res.data.data)
            return res.data.data
        }
    })
    const mutation = useMutation({
        mutationFn: async (ware: any) => {
            const res = await instance.put(`/ware/${ware._id}`, ware)
            return res.data
        },
        onSuccess: () => {
            alert("Cập nhật thành công!"),
            navigate('/ware')
        },
    })

    const onSubmit = (ware: any) => {
        mutation.mutate(ware)
    }
  return (
    <div>
      <section className="max-w-4xl p-6 mx-auto  rounded-md shadow-md dark:bg-gray-800 mt-20">
        <h1 className="text-xl font-bold text-white capitalize dark:text-white">Cập Nhật Danh Mục</h1>
    <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
                <label className="text-white dark:text-gray-200">Tên</label>
                <input type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" {...register('name', {required: true})} />
            </div>

            <div>
                <label className="text-white dark:text-gray-200" >Số lượng</label>
                <input type="number" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" {...register('countInStock', {required: true})}/>
            </div>
            
            <div>
                <label className="text-white dark:text-gray-200" >Đơn vị</label>
                <input type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" {...register('unit', {required: true})}/>
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

export default WareEdit
