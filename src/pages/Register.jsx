import {
  Card,
  Input,
  Button,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAxios from "../hooks/useAxios";
import axios from "axios";



const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;


const Register = () => {
  const { register, handleSubmit } = useForm();
  const [role, setRole] = useState()
  const navigate = useNavigate()
  const { createUser, handleUpdateProfile } = useAuth()
  const axiosSecure = useAxios();

  const onSubmit = async (data) => {
    console.log({ ...data, role })
    if (data.password.length < 8) {
      toast.error("The password must be at least 6 characters long.");
      return;
    }
    if (!/[A-Z]/.test(data.password)) {
      toast.error("The password must contain at least one capital letter.");
      return;
    }
    if (!/[!@#$%^&*()]/.test(data.password)) {
      toast.error("The password must contain at least one special character.");
      return;
    }
    console.log(data.image[0])
    
    const toastId = toast.loading('Creating user ...');
    const imageFile = { image: data.image[0] }

    const res = await axios.post(image_hosting_api, imageFile, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    });
    if (res.data.success) {
      const user = {
      name: data.name,
      email: data.email,
      role: role,
      image: res.data.data.display_url

    }
      try {
        await createUser(data.email, data.password);
        await axiosSecure.post("/users", user)
        await handleUpdateProfile(data.name, res.data.data.display_url)
          .then(() => {

            toast.success('User Created', { id: toastId });

            navigate(location.state ? location.state : '/');
          })
      } catch (error) {
        console.log(error);
        toast.error(error.message, { id: toastId });
      }
    }

  };
  return (
    <div className="mx-auto max-w-screen-xxl flex justify-center py-12 ">

      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Sign Up
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Nice to meet you! Enter your details to register.
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Who you are?
            </Typography>
            <div className="w-full">
              <Select defaultValue="default" label="User Type" onChange={(e) => setRole(e)} required>
                <Option value="Participants">Participants</Option>
                <Option value="Organizers">Organizers</Option>
                <Option value="Healthcare-Professionals">Healthcare Professionals</Option>
              </Select>
            </div>

            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Name
            </Typography>
            <Input
              {...register("name", { required: true })}
              size="lg"
              placeholder="Name"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Profile Image
            </Typography>
            <input
              {...register('image', { required: true })} type="file"
              className="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-gray-900 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600
            file:bg-gray-50 file:border-0
            file:bg-gray-100 file:me-4
              file:py-3 file:px-4
            dark:file:bg-gray-700 dark:file:text-gray-400"></input>
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Email
            </Typography>
            <Input
              {...register("email", { required: true })}
              size="lg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Password
            </Typography>
            <Input
              {...register("password", { required: true })}
              type="password"
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />

          </div>
          <Button type="submit" className="mt-6" fullWidth>
            sign up
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?{" "}
            <NavLink to="/login" className="font-medium text-gray-900">
              Login Now
            </NavLink>
          </Typography>
        </form>
      </Card>
    </div>

  )
}

export default Register