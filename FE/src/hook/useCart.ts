import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import instance from '../config/axios'
import { useLocalStorage } from './useStorage'
import { toast } from 'react-toastify';
import { message } from 'antd';
const useCart = () => {
    const queryClient = useQueryClient()
    const [user] = useLocalStorage('user', {})

    const userId = user?.user?._id

    const { data, isLoading } = useQuery({
        queryKey: ['cart', userId],
        queryFn: async () => {
            const response = await instance.get(`cart/${userId}`)
            return response.data
        },
        enabled: !!userId
    })

    const { mutate } = useMutation({
        mutationFn: async ({ action,  productId, quantity, notes}: { action: string, productId: string, quantity: number,  notes?: string  } ) => {
            switch (action) {
                case 'add-to-cart': {   
                    await instance.post(`/cart/add-to-cart`, {
                        userId,
                        products: [ { productId, quantity}],
                        notes: notes || ''
                    })
                    break
                }
                case 'remove': {
                    await instance.post(`/cart/remove`, {
                        userId,
                        productId
                    })
                    break
                }

                case 'clear': {
                    await instance.post(`/cart/clear`, {
                        userId,
                    })
                    break
                }
                case 'increase': {
                    await instance.post(`/cart/increase`, {
                        userId,
                        productId
                    })
                    break
                }
                case 'decrease': {
                    await instance.post(`/cart/decrease`, {
                        userId,
                        productId
                    })
                    break
                }
            }
        },
        onSuccess: (_, variables) => {
            const { action } = variables
            queryClient.invalidateQueries({
                queryKey: ['cart', userId]
            });
            if (action === 'add-to-cart') {
                message.success('Thêm thành công')
            } 
        }
    })

    const calculateTotal = () => {
        if (!data || !data.products) return 0
        return data.products.reduce((total: any, product: any) => total + product.price * product.quantity, 0)
    }
  return {
    data,
    mutate,
    calculateTotal,
    isLoading
  }
}

export default useCart
