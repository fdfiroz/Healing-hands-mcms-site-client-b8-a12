import { Button, Chip } from "@material-tailwind/react"
import Container from "../components/Containar/Container"
import useAuth from "../hooks/useAuth"
import useRole from "../hooks/useRole"
//TODO: Profile Update and Password Change Functionality

const Profile = () => {
  const { user } = useAuth()
  const [role] = useRole()
  console.log(user)
  return (
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

      <Chip value={role && role?.data?.role.toUpperCase()} className='p-2 px-4 text-xs text-white  rounded-full'/>
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
            Phone:  <span className='font-bold text-black '>{user?.phone||"No Phone Number"}</span>
          </p>

          
        </div>
        <div className="flex flex-col justify-center items-center gap-3"> 
            <Button variant="gradient" size="sm" className="rounded-full">
              Update Profile
            </Button>
            <Button variant="gradient" size="sm" className="rounded-full">
              Change Password
            </Button>
          </div>
      </div>
    </div>
  </div>
</div>
   </Container>
  )
}

export default Profile
