import { useQuery } from "@tanstack/react-query"
import instance from "../../config/axios"

export const useCategories = (page: number, limit: number) => {
    return useQuery({
        queryKey: ['CATEGORIES', page, limit],
        queryFn: async () => {
          const res = await instance.get('/categories', { params: { page, limit }})
          return res.data
        }
      })
}