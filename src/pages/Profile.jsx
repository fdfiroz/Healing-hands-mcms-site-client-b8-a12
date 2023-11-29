import { Button, Chip } from "@material-tailwind/react"
import Container from "../components/Containar/Container"
import useAuth from "../hooks/useAuth"
import useRole from "../hooks/useRole"
import ProfileUpdate from "../components/Modals/ProfileUpdate"
import { useState } from "react"
import Loading from "../components/Loading/Loading"
import Swal from "sweetalert2"
import toast from "react-hot-toast"
import { Helmet } from "react-helmet-async";


const Profile = () => {
  const { user, loading, handleUpdatePassword } = useAuth()
  const [role, isLoading] = useRole()
  const [open, setOpen] = useState(false)
  console.log(user)

  const handelUpdate = () => {
    setOpen(!open)
  }
const handelChangePass = () => {
  Swal.fire({
    title: "Do you want Change Password?",
    showDenyButton: true,
    confirmButtonText: "Yes",
    denyButtonText: `No`
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      handleUpdatePassword()
      toast.success("Email Sent Check Your Mail")
    } else if (result.isDenied) {
      toast.error("Password Not Changed")
    }
  });
}
  
console.log(role)
if (loading) return <Loading/>
  if (isLoading) return <Loading/>
  return (
   <>
   <Helmet>
      <title>Dashboard || Profile</title>
   </Helmet>
   <Container>
     <div className='flex justify-center items-center h-full'>
  
  <div className='bg-white shadow-lg rounded-2xl '>
    <img
      alt='profile'
      src='https://wallpapercave.com/wp/wp10784415.jpg'
      className='w-full mb-4 rounded-t-lg h-36'
    />
    <div className='flex flex-col items-center justify-center p-4 -mt-16'>
      <a href='#' className='relative block'>
        <img
          alt='profile'
          src={user?.photoURL}
          className='mx-auto object-cover rounded-full h-24 w-24  border-2 border-white '
        />
      </a>

      <Chip value={role && role?.data?.role?.toUpperCase()} className='p-2 px-4 text-xs text-white  rounded-full'/>
      <p className='mt-2 text-xl font-medium text-gray-800 '>
        {role && role?.data.role} Id: {user?.uid}
      </p>
      <div className='w-full p-2 mt-4 rounded-lg '>
        <div className='flex flex-col items-start justify-start text-sm text-gray-600 mb-4  '>
          <p className='flex gap-4'>
            Name:<span className='font-bold text-black '>
              {user?.displayName}
            </span>
          </p>
          <p className='flex gap-4'>
            Email:<span className='font-bold text-black '>{user?.email}</span>
          </p>
          <p className='flex gap-4'>
            Phone:  <span className='font-bold text-black '>{role?.data?.phone||"No Phone Number"}</span>
          </p>

          
        </div>
        <div className="flex flex-col justify-center items-center gap-3"> 
            <Button onClick={handelUpdate} variant="gradient" size="sm" className="rounded-full">
              Update Profile
            </Button>
            <Button onClick={handelChangePass} variant="gradient" size="sm" className="rounded-full">
              Change Password
            </Button>
          </div>
      </div>
    </div>
  </div>
</div>
<ProfileUpdate open={open} setOpen={setOpen} user={user} role={role?.data}></ProfileUpdate>
   </Container>
   </>
  )
}

export default Profile
