import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Rating,
    Typography,
    Textarea,
  } from "@material-tailwind/react";
import { useState } from "react";
import toast from "react-hot-toast";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
  
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;


const FeedBackModal = ({open, setOpen, feedback }) => {
    const [rating, setRating] = useState(0)
    const [image, setImage] = useState(null)
    const [description, setDescription] = useState("")
    const axiosSecure = useAxios()
    const {user} = useAuth()
    console.log(feedback)

 const handelRating = async() => {
    if(rating === 0){
        toast.error("Please give a rating")
    }
    if(image === null){
        toast.error("Please give a image")
    }
    if(description === ""){
        toast.error("Please give a description")
    }
    else{
        const toastId = toast.loading('Adding Feedback...');
        const imageFile = { image: image }
        console.log(imageFile)
        const res = await axios.post(image_hosting_api, imageFile, {
          headers: {
            'content-type': 'multipart/form-data'
          }
        });
        console.log(res.data.data.display_url)
        if (res.data.data.display_url) {
          const data = {
            reviewerEmail: user.email,
            reviewerName: user.displayName,
            reviewerImage: user.photoURL,
            campId: feedback.campId,
            campName: feedback.campName,
            image: res.data.data.display_url,
            rating: rating,
            feedback: description,
            createdAt: new Date().toLocaleString()
          }
          try {
            await axiosSecure.post("/add-feedback", data)
            toast.success("Feedback Added", { id: toastId });
          } catch (error) {
            console.log(error);
            toast.error(error.message, { id: toastId });
          }
        }
    }
    setOpen(!open)
 }

  return (
    <>
    <Dialog
      open={open}
      handler={()=>setOpen(!open)}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
    >
      <DialogHeader>How was your Experience? Give a Rating!!</DialogHeader>
      <DialogBody>
      <Typography variant="h6" color="blue-gray" className="mb-3">
              Please Rate your Experience
        </Typography>
      <Rating onChange={(e)=>setRating(e)} unratedColor="amber" ratedColor="amber" />
      <Typography variant="h6" color="blue-gray" className="mb-3">
              Please share your Camp Photo
            </Typography>
            <input
               type="file"
               onChange={(e)=>setImage(e.target.files[0])}
              className="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-gray-900 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600
            file:bg-gray-50 file:border-0
            file:bg-gray-100 file:me-4
              file:py-3 file:px-4
            dark:file:bg-gray-700 dark:file:text-gray-400">
            </input>
            <Typography variant="h6" color="blue-gray" className="my-3">
            Write you Feedback
          </Typography>
          <div className="">
            <Textarea
                onChange={(e)=>setDescription(e.target.value)}
              size="lg"
              type="text"
              placeholder="Camp Description"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            </div>
      </DialogBody>
      <DialogFooter>
        <Button
          variant="text"
          color="red"
          onClick={()=>setOpen(!open)}
          className="mr-1"
        >
          <span>Cancel</span>
        </Button>
        <Button type="submit" variant="gradient" color="green" onClick={handelRating}>
          <span>Confirm</span>
        </Button>
      </DialogFooter>
    </Dialog>
  </>
  )
}

export default FeedBackModal