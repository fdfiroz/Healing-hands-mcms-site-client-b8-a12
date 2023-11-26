import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Avatar,
  Tooltip,
  Button,
  Chip,
} from "@material-tailwind/react";
import {
  BanknotesIcon,
  GlobeEuropeAfricaIcon
} from "@heroicons/react/24/solid";
import { FaUserDoctor } from "react-icons/fa6";

import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import useAxios from "../hooks/useAxios"
import useAuth from "../hooks/useAuth";
import Loading from "../components/Loading/Loading";
import CampJoinModal from "../components/Modals/CampJoinModal";
import { useState } from "react";
import useRole from "../hooks/useRole";

const CampDetailsPage = () => {
  const { loading } = useAuth()
  const params = useParams()
  const axios = useAxios()
  const [role] = useRole()
  const [open, setOpen] = useState(false);
  console.log(params.id)
  const { data, isPending } = useQuery({
    queryKey: ["camp", params.id],
    queryFn: async () => {
      const data = await axios.get(`/camps/${params.id}`)
      return data?.data
    }
  })
console.log(role)

const handleJoin = () => {
  console.log(open)
  setOpen(!open)
}

  if (loading) return <Loading />
  if (isPending) return <Loading />
  return (
    <>
      <Card className="max-w-full p-6 overflow-hidden">
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="m-0 rounded-none"
        >
          <img
            src={data?.image}
            className="w-full object-cover overflow-hidden aspect-video"
            alt="ui/ux review check"
          />
          <div className="flex mt-4 ml-6">
            <Chip value={data?.targetAudience} variant="gradient" />
          </div>
        </CardHeader>
        <CardBody className=" object-cover overflow-hidden">
          <Typography variant="h6" color="blue-gray">
            {data?.campName}
          </Typography>
          <Typography variant="h6" color="gray" className="mt-3 font-normal">
            {data?.description}
          </Typography>
          <div className="flex justify-between items-center">
            <div className="">
              <div className="flex items-center gap-2 mt-2">
                <GlobeEuropeAfricaIcon className="h-5 w-5" />
                <Typography variant="small">
                  Location : {data?.location}
                </Typography>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <BanknotesIcon className="h-5 w-5" />
                <Typography>
                  Service Fee : {data?.campFees}$
                </Typography>
              </div>
              <div className="flex items-center justify-items-center gap-2 mt-2">
                <FaUserDoctor className="h-4 w-4" />
                <Typography >
                  Doctor Name : {data?.healthcarePros}
                </Typography>
              </div>
            </div>
            <div>
              {
                role?.data?.role === "Participants" &&
                <Button onClick={handleJoin} variant="gradient" size="md">Pay and Join</Button> 
              }
            </div>
          </div>
        </CardBody>
        <CardFooter className="flex items-center justify-between">

          <div className="flex items-center">
            <Tooltip content={data?.orgName}>
              <Avatar
                size="lg"
                variant="circular"
                alt={data?.orgName}
                src={data?.orgImage}
                className="border-2 border-white hover:z-10"
              />
            </Tooltip>
            <Typography>Organization : {data?.orgName}</Typography>
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
          <Typography className="font-normal">Date and time : {data?.date} {data?.time}</Typography>
        </CardFooter>
      </Card>
      <CampJoinModal open={open} setOpen={setOpen} bookingInfo={data} />
    </>
  )
}

export default CampDetailsPage