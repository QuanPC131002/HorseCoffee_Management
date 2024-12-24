import { useQuery } from "@tanstack/react-query"
import instance from "../../config/axios"

export const useProduct = () => {
    return useQuery({
        queryKey: ['PRODUCT'],
        queryFn: async () => {
          const res = await instance.get('/product')
          return res.data.data
        }
      })
}