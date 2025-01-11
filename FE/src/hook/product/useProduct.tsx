import { useQuery } from "@tanstack/react-query"
import instance from "../../config/axios"

export const useProduct = ( page: number, limit: number, categoryId: any) => {
    return useQuery({
        queryKey: ['PRODUCT', page, limit, categoryId],
        queryFn: async () => {
          const res = await instance.get('/product', { params: { page, limit, categoryId}})
          return res.data
        }
      })
}