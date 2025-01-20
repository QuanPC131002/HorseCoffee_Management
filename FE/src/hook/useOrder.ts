import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Swal from 'sweetalert2'
import instance from '../config/axios'
import { useLocalStorage } from './useStorage'
import { useParams } from 'react-router-dom'
import { useState } from 'react'

const useOrder = (page: number, limit: number) => {
  const [orderModal, setIsOrderModal] = useState(false)
  const [user] = useLocalStorage('user', {})
  
  const userId = user?.user?._id

  const {orderId} = useParams()

  const queryClient = useQueryClient()
  
  
  const { data: orders} = useQuery({
    queryKey: ['order', page, limit],
    queryFn: async () => {
      const { data } = await instance.get(`/order/`, { params: { page, limit } })
      return data 
    },
  })

  const orderList = orders?.order || [];
  const pagination = orders?.pagination

  const { data: orderDetail } = useQuery({
    queryKey: ['order_detail', userId, orderId],
    queryFn: async () => {
      if (!orderId) return null;
      const { data } = await instance.get(`/order/${userId}/${orderId}`);
      return data;
    },
  });
  
 const { mutate: updateOrderStatus } = useMutation({
    mutationFn: async (status: string) => {
      await instance.put(`/order/${orderId}`, { status})
    },
    onSuccess: () => {
      Swal.fire({
        title: 'Trả đồ thành công!',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    },
 })
  
  const { mutate: createOrder } = useMutation({
    mutationFn: async ({ orderItem, totalPrice, status, notes, orderDate }: any) => {
      const {data} = await instance.post('/order', {
        userId,
        orderItem,
        totalPrice,
        status,
        notes,
        orderDate
      })
      return data
    },
    onSuccess: () => {
      setIsOrderModal(true)
      queryClient.invalidateQueries({
        queryKey: ['order']
      });
    },
    
  })

  const createNewOrder = async (orderItem: string, totalPrice: number, status: string, notes: string) => {
    const orderDate = new Date().toISOString()
    createOrder({ orderItem, totalPrice, status, notes, orderDate })
  }


    return {
      orders,
      orderList,
      pagination,
      orderDetail,
      updateOrderStatus,
      createNewOrder,
      orderModal,
      setIsOrderModal
    }
}

export default useOrder
