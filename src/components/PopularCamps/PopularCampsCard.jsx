import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Avatar,
    Tooltip,
  } from "@material-tailwind/react";
import { Link } from "react-router-dom";

const PopularCampsCard = ({popularCamp}) => {
    console.log(popularCamp)
    const {_id, campName, image, orgName, orgImage } = popularCamp;
  return (
    <Link to={`/camp-details/${_id}`}> 
    <Card
      shadow={false}
      className="relative grid h-[15rem] w-full max-w-[28rem] items-end justify-center overflow-hidden text-center"
    >
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        style={{backgroundImage: `url(${image})`}} 
        className="absolute inset-0 m-0 h-full w-full rounded-none bg-cover bg-center"
      >
        <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
      </CardHeader>
      <CardBody className="relative py-6 px-6 md:px-12">
        <Tooltip content="Organizer Name" placement="top">
        <Typography
          variant="h5"
          color="white"
          className="mb-6 font-medium leading-[1.5]"
        >
          {campName}
        </Typography>
        </Tooltip>
        <Typography variant="h6" className="mb-4 text-gray-400">
          {orgName}
        </Typography>
        <Avatar
          size="lg"
          variant="circular"
          alt="tania andrew"
          className="border-2 border-white"
          src={orgImage}
        />
      </CardBody>
    </Card>
    </Link>
  )
}

export default PopularCampsCard