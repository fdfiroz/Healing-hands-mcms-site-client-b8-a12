import { Navigate } from 'react-router-dom'
import Loader from '../components/Shared/Loader'
import useRole from '../hooks/useRole'

const HealthcareProfessionalsRoute = () => {
  const [role, isLoading] = useRole()

  if (isLoading) return <Loader />
  if (role.data.role === 'Healthcare-Professionals') return children
  return <Navigate to='/dashboard' />
}

export default Healthcare-ProfessionalsRoute