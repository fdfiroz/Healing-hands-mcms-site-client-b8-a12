/* eslint-disable react/prop-types */
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Avatar,
  Tooltip,
} from "@material-tailwind/react";
import { NavLink } from "react-router-dom";
import {
  BanknotesIcon,
  GlobeEuropeAfricaIcon
} from "@heroicons/react/24/solid";
import { FaUserDoctor } from "react-icons/fa6";


const CampCard = ({camp}) => {
  const {_id, orgId, orgName, orgImage, campName, specialServices, healthcarePros, location, image, campFees, date, time, description} = camp
  return (
 <NavLink to={`/camp-details/${_id}`} >
   <Tooltip content="Click to see Detail" placement="right">
    <Card className="max-w-[24rem] overflow-hidden">
    <CardHeader
      floated={false}
      shadow={false}
      color="transparent"
      className="m-0 rounded-none"
    >
      <img
        src={image}
        className="w-full object-cover overflow-hidden aspect-square"
        alt="ui/ux review check"
      />
    </CardHeader>
    <CardBody className=" object-cover overflow-hidden">
      <Typography variant="h6" color="blue-gray">
        {campName}
      </Typography>
      <Typography variant="h6" color="gray" className="mt-3 font-normal">
        {description?.slice(0,50) }...
      </Typography>
      <div className="flex items-center gap-2 mt-2">
      <GlobeEuropeAfricaIcon className="h-5 w-5"/>
      <Typography variant="small">
        {location}
      </Typography>
        </div>
        <div className="flex items-center gap-2 mt-2">
      <BanknotesIcon className="h-5 w-5"/>
      <Typography>
        {campFees}$
      </Typography>
        </div>
        <div className="flex items-center gap-2 mt-2">
      <FaUserDoctor className="h-4 w-4"/>
      <Typography >
        {healthcarePros}
      </Typography>
        </div>
    </CardBody>
    <CardFooter className="flex items-center justify-between">

      <div className="flex items-center -space-x-3">
        <Tooltip content={orgName}>
          <Avatar
            size="sm"
            variant="circular"
            alt={orgName}
            src={orgImage}
            className="border-2 border-white hover:z-10"
          />
        </Tooltip>
        {/* <Tooltip content="Tania Andrew">
          <Avatar
            size="sm"
            variant="circular"
            alt="tania andrew"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
            className="border-2 border-white hover:z-10"
          />
        </Tooltip> */}
      </div>
      <Typography className="font-normal">{date} {time}</Typography>
    </CardFooter>
  </Card>
  </Tooltip>
 </NavLink>
  )
}

export default CampCard