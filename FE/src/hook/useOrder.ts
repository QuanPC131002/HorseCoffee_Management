import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Swal from 'sweetalert2'
import instance from '../config/axios'
import { useLocalStorage } from './useStorage'

const useOrder = () => {
  const [user] = useLocalStorage('user', {})
  
  const userId = user?.user?._id

  const [order, setOrder] = useLocalStorage('order', {}); 
  
  const orderId = order?.order?._id;

  
  const { data: orders } = useQuery({
    queryKey: ['order'],
    queryFn: async () => {
      const { data } = await instance.get(`/order/`)
      return data
    },
  })

  const { data: orderDetail } = useQuery({
    queryKey: ['order_detail', userId, orderId],
    queryFn: async () => {
      const { data } = await instance.get(`/order/${userId}/${orderId}`);
      return data;
    },
  });
  
  
  const { mutate: createOrder } = useMutation({
    mutationFn: async ({ orderItem, totalPrice, status, notes, orderDate }: any) => {
      await instance.post('/order', {
        userId,
        orderItem,
        totalPrice,
        status,
        notes,
        orderDate
      })
    },
    onSuccess: (data) => {
      setOrder({ order: data })
      Swal.fire({
        title: 'Tạo đơn thành công!',
        text: 'Đơn hàng của bạn đã được tạo thành công.',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    }
  })

  const createNewOrder = async (orderItem: string, totalPrice: number, status: string, notes: string) => {
    const orderDate = new Date().toISOString()
    createOrder({ orderItem, totalPrice, status, notes, orderDate })
    
  }

  // Lấy đơn hàng mới nhất
  const latestOrder = orders && orders.length > 0 ? orders[orders.length - 1] : null

  return {
    orders,
    orderDetail,
    latestOrder,
    createNewOrder
  }
}

export default useOrder
