import { useQuery } from "@tanstack/react-query"
import instance from "../../config/axios"

export const useCategories = () => {
    return useQuery({
        queryKey: ['CATEGORIES'],
        queryFn: async () => {
          const res = await instance.get('/categories')
          return res.data.data
        }
      })
}