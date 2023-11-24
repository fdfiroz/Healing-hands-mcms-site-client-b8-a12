import {  NavLink, Outlet } from "react-router-dom"
import {
  Card,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  
  PowerIcon,
} from "@heroicons/react/24/solid";
import useRole from "../hooks/useRole";
import useAuth from "../hooks/useAuth";
import OrganizerNav from "../components/DashboardNav/OrganizerNav";
import HealthcareProfessionalNav from "../components/DashboardNav/HealthcareProfessionalNav";
import ParticipantsNav from "../components/DashboardNav/ParticipantsNav";



const DashboardLayout = () => {
  const {user, logOut} = useAuth()
  const [role, isLoading] = useRole()
  const userRole = role?.data
  console.log(userRole, isLoading)
  return (
    <>
    <div className="flex gap-6">
    <div>
    <Card className="h-[calc(100vh-6rem)] w-full max-w-[20rem] border-r-2 p-4 shadow-xl shadow-blue-gray-900/5">
      <List>
      <NavLink to={"/dashboard"}>
      <ListItem>
          <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          Profile
        </ListItem>
      </NavLink>
        {
          user && !isLoading && (
            <>
            {
              userRole === "Organizers" && <OrganizerNav/>
            }
            {
              userRole === "Healthcare-Professionals" && <HealthcareProfessionalNav/> 
            }
            {
              userRole === "Participants" && <ParticipantsNav/>
            }
            </>
          )
          
        }
        <ListItem onClick={logOut}>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </Card>
    </div>
    <div className="py-2">
        <Outlet></Outlet>
    </div>
    </div>
    </>
  )
}

export default DashboardLayout