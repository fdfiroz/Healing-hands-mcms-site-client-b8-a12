import { CalendarDaysIcon } from "@heroicons/react/24/solid"
import { ListItem, ListItemPrefix } from "@material-tailwind/react"
import { NavLink } from "react-router-dom"

const HealthcareProfessionalNav = () => {
  return (
    <>
    <NavLink to={"accepted-camps"}>
    <ListItem >
          <ListItemPrefix>
            <CalendarDaysIcon className="h-5 w-5" />
          </ListItemPrefix>
          Accepted Camps
        </ListItem>
    </NavLink>
    </>
  )
}

export default HealthcareProfessionalNav