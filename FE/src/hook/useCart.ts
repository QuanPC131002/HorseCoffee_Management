import { useMutation, useQueryClient } from '@tanstack/react-query'
import instance from '../config/axios'
import { useLocalStorage } from './useStorage'

const useCart = () => {
    const queryClient = useQueryClient()
    const [user] = useLocalStorage('user', {})

    const userId = user?.user?._id

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
            }
        },
        onSuccess: (_, variables) => {
            const { action } = variables
            queryClient.invalidateQueries({
                queryKey: ['cart', userId]
            });
            if (action === 'add-to-cart') {
                alert('Thêm sản phẩm vào giỏ hàng thành công');
            }
        }
    })
  return {
    mutate
  }
}

export default useCart
