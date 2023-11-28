import React from "react";
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
const ProfileUpdate = ({open, setOpen}) => {

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
            name="name"
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
            name="phoneNumber"

            type="tel"
            size="md"
            placeholder="Phone Number"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
            </div>
            <Button variant="gradient" color="green">
            <span>Confirm</span>
          </Button>
          <Button
            variant="text"
            color="red"
            onClick={() => setOpen(!open)}
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