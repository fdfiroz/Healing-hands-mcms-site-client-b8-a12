import {  NavLink, Outlet } from "react-router-dom"
import {

  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemPrefix,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  
  PowerIcon,
  Bars3CenterLeftIcon,
} from "@heroicons/react/24/solid";
import useRole from "../hooks/useRole";
import useAuth from "../hooks/useAuth";
import OrganizerNav from "../components/DashboardNav/OrganizerNav";
import HealthcareProfessionalNav from "../components/DashboardNav/HealthcareProfessionalNav";
import ParticipantsNav from "../components/DashboardNav/ParticipantsNav";
import { useState } from "react";
import logo from "../assets/logo.png";



const DashboardLayout = () => {
  const [open, setOpen] = useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);
  const {user, logOut} = useAuth()
  const [role, isLoading] = useRole()
  const userRole = role?.data.role
  return (
    <>
    <div className="flex">
    <div>
      <Tooltip content="Open Menu" interactive={true} placement="right">
    <Bars3CenterLeftIcon className="h-10 w-10 fixed z-50" onClick={openDrawer}></Bars3CenterLeftIcon>
    </Tooltip>
      <Drawer overlay={false} open={open} onClose={closeDrawer}>
        <div className="mb-2 flex items-center justify-between p-4">
          <NavLink to={"/dashboard"}>
          <Typography variant="h5" color="blue-gray">
          <img className="w-13 h-5 lg:w-25 lg:h-10" src={logo} alt="" />
          </Typography>
          </NavLink>
          <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </div>
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
      </Drawer>
    
    </div>
    <div className="py-2 mx-auto">
        <Outlet></Outlet>
    </div>
    </div>
    </>
  )
}

export default DashboardLayout