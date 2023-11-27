import {
  Card,
  Input,
  Button,
  Typography,
  Textarea,
  Select,
  Option,
} from "@material-tailwind/react";
import axios from "axios";
import { useForm } from "react-hook-form";
import useAxios from "../hooks/useAxios";
import toast from "react-hot-toast";
import { useState } from "react";
import useRole from "../hooks/useRole";
import Container from "../components/Containar/Container";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddUpcomingCamp = () => {
  const [specialServices, setSpecialServices] = useState("")
  const [targetAudience , setTargetAudience ] = useState("")
  const { register, handleSubmit, formState: { errors } } = useForm();
  const axiosSecure = useAxios()
  const [role] = useRole()
  //TO-DO: Add a form error handler


  const onSubmit = async (data) => {
    //if any of the fields are empty, return
    if (specialServices || targetAudience|| !data.campName || !data.healthcarePros || !data.location || !data.fees || !data.date || !data.time || !data.description || !data.image) {
      toast.error("Please fill all the fields")
      return
    }
    const toastId = toast.loading('Adding Camp...');
    const imageFile = { image: data.image[0] }

    const res = await axios.post(image_hosting_api, imageFile, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    });
    if (res.data.success) {
      const camp = {
        orgId: role?.data?._id,
        orgName: role?.data?.name,
        orgImage: role?.data?.image,
        campName: data.campName,
        specialServices: specialServices,
        healthcarePros: data.healthcarePros,
        targetAudience: targetAudience,
        location: data.location,
        image: res.data.data.display_url,
        campFees: data.fees,
        date: data.date,
        time: data.time,
        description: data.description
      }
      try {
        await axiosSecure.post("/add-camps", camp)
        toast.success("Camp Added", { id: toastId });
      } catch (error) {
        console.log(error);
        toast.error(error.message, { id: toastId });
      }
    }
  }
  console.log(specialServices)

  return (
      <Container>
        <Card className="py-6" color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        Add A Upcoming Camp
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Nice to meet you! Enter your details to Camp.
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
        <div className="mb-1 flex flex-col gap-6">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Specialized Services Provider
          </Typography>
          <div className="w-full">
            <Select required defaultValue="default" label="Specialized Services Provider" onChange={(e) => setSpecialServices(e)}>
              <Option value="General Health Checkups">General Health Checkups</Option>
              <Option value="Dental Checkups">Dental Checkups</Option>
              <Option value="Vision Testing">Vision Testing</Option>
              <Option value="Cancer Screenings">Cancer Screenings</Option>
              <Option value="Diabetes Consultations">Diabetes Consultations</Option>
            </Select>
          </div>
          <Typography variant="h6" color="blue-gray" className="-mb-3">
          Target Audience
          </Typography>
          <div className="w-full">
            <Select required defaultValue="default" label="Specialized Services Provider" onChange={(e) => setTargetAudience(e)}>
              <Option value="Adult">Adult</Option>
              <Option value="General Public">General Public</Option>
              <Option value="Children">Children</Option>
              
            </Select>
          </div>
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Healthcare Professionals Name
          </Typography>
          <Input
            {...register('healthcarePros', { required: true })}
            type="text"
            size="lg"
            placeholder="Healthcare Professionals Name"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Camp Name
          </Typography>
          <Input
            {...register('campName', { required: true })}
            type="text"
            size="lg"
            placeholder="Camp Name"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Camp Image
          </Typography>
          <input
            {...register('image', { required: true })}
            type="file"
            className="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-gray-900 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600
            file:bg-gray-50 file:border-0
            file:bg-gray-100 file:me-4
              file:py-3 file:px-4
            dark:file:bg-gray-700 dark:file:text-gray-400"></input>
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Camp Fees
          </Typography>
          <Input
            {...register('fees', { required: true })}
            type="number"
            size="lg"
            placeholder="Camp Fees"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Scheduled Date
          </Typography>
          <Input
            type="date"
            {...register('date', { required: true })}
            size="lg"
            placeholder="Camp Fees"

            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Scheduled Time
          </Typography>
          <Input
            type="time"
            {...register('time', { required: true })}
            size="lg"
            placeholder="Camp Fees"

            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Venue Location
          </Typography>
          <Input
            {...register('location', { required: true })}
            type="text"
            size="lg"
            placeholder="Venue Location"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Camp Description
          </Typography>
          <div className="w-96">
            <Textarea
              {...register('description', { required: true })}
              size="lg"
              type="text"
              placeholder="Camp Description"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
        </div>
        <Button type="submit" className="mt-6" fullWidth>
          Add Camp
        </Button>
      </form>
    </Card>
      </Container>
  )
}

export default AddUpcomingCamp