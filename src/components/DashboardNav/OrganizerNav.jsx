import { CalendarDaysIcon, ClockIcon, DocumentMagnifyingGlassIcon, RectangleGroupIcon } from "@heroicons/react/24/solid"
import { ListItem, ListItemPrefix } from "@material-tailwind/react"
import { NavLink } from "react-router-dom"

const OrganizerNav = () => {
  return (
    <>
    <NavLink to={"add-a-camp"}>
    <ListItem >
          <ListItemPrefix>
            <CalendarDaysIcon className="h-5 w-5" />
          </ListItemPrefix>
          Add A Camp
        </ListItem>
    </NavLink>
    <NavLink to={"manage-camps"}>
    <ListItem >
          <ListItemPrefix>
            <DocumentMagnifyingGlassIcon className="h-5 w-5" />
          </ListItemPrefix>
          Manage Camps
        </ListItem>
    </NavLink>
    <NavLink to={"manage-registered-camps"}>
    <ListItem >
          <ListItemPrefix>
            <RectangleGroupIcon className="h-5 w-5" />
          </ListItemPrefix>
          Manage Registered Camps
        </ListItem>
    </NavLink>
    <NavLink to={"add-upcoming-camp"}>
    <ListItem >
          <ListItemPrefix>
            <ClockIcon className="h-5 w-5" />
          </ListItemPrefix>
          Add Upcoming Camp
        </ListItem>
    </NavLink>
    </>
  )
}

export default OrganizerNav