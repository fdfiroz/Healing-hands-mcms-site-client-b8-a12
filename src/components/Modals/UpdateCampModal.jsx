import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Select,
  Option,
  Card,
  Textarea,
  Input,
} from "@material-tailwind/react";
import useAxios from "../../hooks/useAxios";
import Container from "../Containar/Container";



const UpdateCampModal = ({ open, setOpen, camp, refetch }) => {
  const axios = useAxios()
  const [campUpdate, setCampUpdate] = useState({
    campName: "",
    specialServices: "",
    healthcarePros: "",
    location: "",
    image: "",
    campFees: "",
    date: "",
    time: "",
    description: "",
  })
  useEffect(() => {
    if (camp) {
      const { orgName, orgId, _id, orgImage, ...oldCamp} = camp
      setCampUpdate(oldCamp)
    }
  }, [camp])
  const onChange = (e) => {
    setCampUpdate({
      ...campUpdate,
      [e.target.name]: e.target.value
    })
  }

  console.log(campUpdate)

  // const handelUpdate = async (id) => {
  //   console.log(id)
  //   axios.patch(`/update-camp/${id}`)
  //     .then(res => console.log(res))
  //   refetch()
  // }
  console.log(camp)

  return (
    <>
      <Dialog size={"xl"} className=" mx-auto" open={open} handler={() => setOpen(!open)}>
        <DialogHeader className="mx-auto">
          Update Camp
        </DialogHeader>
        <Container>
        <form >
        <div className="grid grid-cols-2 gap-2 py-4">
        <div>
        <Typography variant="paragraph" color="blue-gray" className="">
            Specialized Services Provider
          </Typography>
          <div className="w-full">
            <Select name="healthcarePros" size="md" required defaultValue="default" label="Specialized Services Provider">
              <Option value="General Health Checkups">General Health Checkups</Option>
              <Option value="Dental Checkups">Dental Checkups</Option>
              <Option value="Vision Testing">Vision Testing</Option>
              <Option value="Cancer Screenings">Cancer Screenings</Option>
              <Option value="Diabetes Consultations">Diabetes Consultations</Option>
            </Select>
          </div>
        </div>
          <div>
          <Typography variant="paragraph" color="blue-gray" >
          Target Audience
          </Typography>
          <div className="w-full">
            <Select name="targetAudience" required defaultValue="default" label="Specialized Services Provider">
              <Option value="Adult">Adult</Option>
              <Option value="General Public">General Public</Option>
              <Option value="Children">Children</Option>
              
            </Select>
          </div>
          </div>
          <div>
          <Typography variant="paragraph" color="blue-gray" >
            Healthcare Professionals Name
          </Typography>
          <Input
          onChange={onChange}
            value={camp.healthcarePros}
            name="healthcarePros"
            type="text"
            size="md"
            placeholder="Healthcare Professionals Name"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          </div>
          <div>
          <Typography variant="paragraph" color="blue-gray" >
            Camp Name
          </Typography>
          <Input
          onChange={onChange}
          value={camp.campName}
            name="campName"
            type="text"
            size="md"
            placeholder="Camp Name"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          </div>
          <div>
          <Typography variant="paragraph" color="blue-gray" >
            Camp Image
          </Typography>
          <input
          onChange={onChange}
            name="image"
            type="file"
            className="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-gray-900 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600
            file:bg-gray-50 file:border-0
            file:bg-gray-100 file:me-4
              file:py-3 file:px-4
            dark:file:bg-gray-700 dark:file:text-gray-400">
            </input>
          </div>
            <div>
            <Typography variant="paragraph" color="blue-gray" >
            Camp Fees
          </Typography>
          <Input
          onChange={onChange}
          value={camp.campFees}
            name="campFees"
            type="number"
            size="md"
            placeholder="Camp Fees"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
            </div>
          <div>
          <Typography variant="paragraph" color="blue-gray" >
            Scheduled Date
          </Typography>
          <Input
          onChange={onChange}
          value={camp.date}
            name="date"
            type="date"
            size="md"
            placeholder="Camp Fees"

            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          </div>
          <div>
          <Typography variant="paragraph" color="blue-gray" >
            Scheduled Time
          </Typography>
          <Input
          onChange={onChange}
          value={camp.time}
            name="time"
            type="time"
            size="md"
            placeholder="Camp Fees"

            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          </div>
          <div>
          <Typography variant="paragraph" color="blue-gray" >
            Venue Location
          </Typography>
          <Input
          onChange={onChange}
          value={camp.location}
          name="location"
            type="text"
            size="md"
            placeholder="Venue Location"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          </div>
          <div>
          <Typography variant="paragraph" color="blue-gray" >
            Camp Description
          </Typography>
          <div className="w-96">
            <Textarea
            onChange={onChange}
            value={camp.description}
            name="description"
              size="md"
              type="text"
              placeholder="Camp Description"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            </div>
          </div>
          <Button
            variant="text"
            color="red"
            onClick={() => setOpen(!open)}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green">
            <span>Confirm</span>
          </Button>
        </div>
        </form>
        </Container>
      </Dialog>
    </>
  )
}

export default UpdateCampModal