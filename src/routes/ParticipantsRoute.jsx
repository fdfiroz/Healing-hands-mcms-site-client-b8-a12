import { Navigate } from 'react-router-dom'
import Loader from '../components/Shared/Loader'
import useRole from '../hooks/useRole'

const ParticipantsRoute = () => {
    const [role, isLoading] = useRole()

    if (isLoading) return <Loader />
    if (role.data.role === 'Participants') return children
    return <Navigate to='/dashboard' />
}

export default ParticipantsRoute