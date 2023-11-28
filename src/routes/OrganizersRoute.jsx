import { Navigate } from "react-router-dom"
import Loading from "../components/Loading/Loading"
import useRole from "../hooks/useRole"


const OrganizersRoute = ({children}) => {
    const [role, isLoading] = useRole()

    if (isLoading) return <Loading />
    if (role.data.role === 'Organizers') return children
    return <Navigate to='/dashboard' />
}

export default OrganizersRoute