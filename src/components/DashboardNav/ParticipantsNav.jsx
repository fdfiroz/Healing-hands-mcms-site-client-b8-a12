import { BanknotesIcon, StarIcon, UserCircleIcon } from "@heroicons/react/24/solid"
import { ListItem, ListItemPrefix } from "@material-tailwind/react"
import { NavLink } from "react-router-dom"

// Desc: Navigation for Participants
const ParticipantsNav = () => {
  return (
    <>
    <NavLink to={"registered-camps"}>
    <ListItem >
          <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          Registered Camps
        </ListItem>
    </NavLink>
    <NavLink to={"payment-history"}>
    <ListItem >
          <ListItemPrefix>
            <BanknotesIcon className="h-5 w-5" />
          </ListItemPrefix>
          Payment History
        </ListItem>
    </NavLink>
    <NavLink to={"feedback-and-ratings"}>
    <ListItem >
          <ListItemPrefix>
            <StarIcon className="h-5 w-5" />
          </ListItemPrefix>
          Feedback and Ratings
        </ListItem>
    </NavLink>
    </>
  )
}

export default ParticipantsNav