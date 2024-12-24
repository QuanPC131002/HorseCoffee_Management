import { useQuery } from "@tanstack/react-query"
import instance from "../../config/axios"

export const useWareHouse = () => {
    return useQuery({
        queryKey: ['WareHouse'],
        queryFn: async () => {
          const res = await instance.get('/ware')
          return res.data.data
        }
      })
}