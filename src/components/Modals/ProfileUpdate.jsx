import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Typography,
} from "@material-tailwind/react";
import Container from "../Containar/Container";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import toast from "react-hot-toast";
import useAxios from "../../hooks/useAxios";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const ProfileUpdate = ({open, setOpen, user, role}) => {
  const {handleUpdateProfile} = useAuth()
  const axiosSecure = useAxios()
  const [updateProfile, setUpdateProfile] = useState({
    displayName: "",
    image: "",
    phone: "",
  
  })
  const [file, setFile] = useState();

  useEffect(()=>{
    if(user){
      setUpdateProfile({
        displayName: user?.displayName,
        image: user?.photoURL,
        phone: role?.phone,
      })
    }
  }, [user, role?.phone])
   
  const onChange = (e) =>{
    setUpdateProfile({
      ...updateProfile,
      [e.target.name]: e.target.value
    })
  }
  const handelSubmit = async(id)=>{
    if (typeof file == "object") {
      const imageFile = { image: file };

      const res = await axios.post(image_hosting_api, imageFile, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      if (res.data.success) {
        const user = {
          ...updateProfile,
          image: res.data.data.display_url,
        };
        const toastId = toast.loading("Updating Camp...");

        try {
          await handleUpdateProfile(user.displayName, user.image);
          await axiosSecure.patch(`/users/${role._id}`, user);
          toast.success("Updated Added", { id: toastId });
        } catch (error) {
          console.log(error);
          toast.error(error.message, { id: toastId });
        }
      }
    } else {
      const toastId = toast.loading("Updating Camp...");

      try {
        await handleUpdateProfile(updateProfile.displayName, updateProfile.image);
        await axiosSecure.patch(`/users/${id}`, updateProfile);
        toast.success("Updated Added", { id: toastId });
      } catch (error) {
        console.log(error);
        toast.error(error.message, { id: toastId });
      }

    }
    handleUpdateProfile(updateProfile.displayName, )
    .then((res)=>{
      console.log(res)

    })
    setOpen(!open)
  }

  return (
    <>
        <Dialog open={open} handler={()=>setOpen(!open)}>
        <DialogHeader>Update Profile</DialogHeader>
        <Container>
        <form >
        <div className="grid grid-cols-1 gap-2 py-4 ">
       
          <div>
          <Typography variant="paragraph" color="blue-gray" >
            Profile Name
          </Typography>
          <Input
            onChange={onChange}
            value={updateProfile?.displayName}
            name="displayName"
            type="text"
            size="md"
            placeholder="Profile Name"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          </div>
          <div>
          <Typography variant="paragraph" color="blue-gray" >
            Profile Image
          </Typography>
          <input
          onChange={(event) => {
            setFile(event.target.files[0]);
          }}
            name="image"
            placeholder="Profile Image"
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
            Phone Number
          </Typography>
          <Input
            name="phone"
            onChange={onChange}
            value={updateProfile?.phone}
            type="tel"
            size="md"
            placeholder="Phone Number"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
            </div>
            <Button             
            onClick={()=>handelSubmit(role._id)}
            variant="gradient" color="green">
            <span>Confirm</span>
          </Button>
          <Button
            onClick={()=>setOpen(!open)}
            variant="text"
            color="red"
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          
        </div>
        </form>
        </Container>
      </Dialog> 
    </>
  )
}

export default ProfileUpdate