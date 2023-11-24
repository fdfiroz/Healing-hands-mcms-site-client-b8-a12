import useAuth from "./useAuth"
import  useAxios from "./useAxios"
import { useQuery } from '@tanstack/react-query'

const useRole = () => {
    const axios = useAxios()
    const { user, loading } = useAuth()    
  const { data: role, isLoading } = useQuery({
    enabled: !loading && !!user?.email,
    queryFn: async () => await axios.get(`/role/${user?.email}`),
    queryKey: ['role'],
  })

  return [role, isLoading]
}

export default useRole

