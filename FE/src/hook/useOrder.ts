import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useLocalStorage } from './useStorage'
import instance from '../config/axios'
import Swal from 'sweetalert2'

const useOrder = () => {
  const queryClient = useQueryClient()
  const [user] = useLocalStorage('user', {})
  const [cart, setCart] = useLocalStorage('cart', { products: [] }) 

  const userId = user?.user?._id

  const { data: orders } = useQuery({
    queryKey: ['order', userId],
    queryFn: async () => {
      const { data } = await instance.get(`/order/${userId}`)
      return data
    },
    enabled: !!userId, // Chỉ gọi API khi có userId
  })

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
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['order', userId]
      })
      
      // Clear giỏ hàng trong localStorage
      setCart({ products: [] })

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
    latestOrder,
    createNewOrder
  }
}

export default useOrder
