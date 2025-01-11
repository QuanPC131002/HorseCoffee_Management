import { useQuery } from "@tanstack/react-query"
import instance from "../../config/axios"

export const useProduct = ( page: any, limit: any) => {
    return useQuery({
        queryKey: ['PRODUCT', page, limit],
        queryFn: async () => {
          const res = await instance.get('/product', { params: { page, limit}})
          return res.data
        }
      })
}