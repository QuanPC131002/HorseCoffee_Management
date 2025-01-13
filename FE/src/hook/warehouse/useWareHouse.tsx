import { useQuery } from "@tanstack/react-query"
import instance from "../../config/axios"

export const useWareHouse = (page: number, limit: number) => {
    return useQuery({
        queryKey: ['WareHouse', page, limit],
        queryFn: async () => {
          const res = await instance.get('/ware', { params: { page, limit}})
          return res.data.data
        }
      })
}