import { useQuery } from "@tanstack/react-query";
import Container from "../components/Containar/Container";
import CampJoinModal from "../components/Modals/CampJoinModal"
import { Button, Card, Typography } from "@material-tailwind/react";
import useAuth from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
import { useState } from "react";
import toast from "react-hot-toast";
import Loading from "../components/Loading/Loading";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
 
const TABLE_HEAD = ["Camp Name", "Date and Time", "Venue", "Camp Fees", "Payment Status", "Confirmation Status", "Actions"];
 

const RegisteredCamps = () => {
  const axios = useAxios();
  const {user, loading} = useAuth();
  const [regId, setRegId ] = useState('')
  const [campId, setCampId ] = useState('')
  const [joinOpen, setJoinOpen ] = useState(false)
const {data:camps, refetch, isLoading, isPending} = useQuery({
  queryKey: ["registered-camps"],
  queryFn: async () => {
    const data = await axios.get(`/register-camps/${user?.email}`)
    return data.data
  }

});
  console.log(camps)
//To do pament and join
  // //Modal Handelar
const handleJoin = (id, regId) => {
  console.log(joinOpen)
  setCampId(id)
  setRegId(regId)
  setJoinOpen(!joinOpen)
}
const handelCancel = async(id)=>{
  Swal.fire({
    title: "Do you want to Cancel Registaion?",
    showDenyButton: true,
    confirmButtonText: "Cancel Now",
    denyButtonText: `Don't Cancel`
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      try{
        axios.patch(`/cancel-register/${id}`, {registerStatus: "Canceled"})
        .then(res => {
          console.log(res)
          toast.success("Camp Canceled")
          refetch()
        })
      }
      catch(err){
        console.log(err)
      }
    } else if (result.isDenied) {
      toast.success("Changes are not saved")
    }
  });
  console.log(id)
  
}
// console.log(isPending)
if (loading) return <Loading/>
if (isLoading) return <Loading/>

  return (
    <>
    <Helmet>
      <title>Registered Camps</title>
    </Helmet>
   <Container>
  <div className="grid min-h-[140px] w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible">
  <Card className="h-full w-full overflow-scroll">
    <table className="w-full min-w-max table-auto text-left ">
      <thead>
        <tr>
          {TABLE_HEAD.map((head) => (
            <th
              key={head}
              className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
            >
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal leading-none opacity-70"
              >
                {head}
              </Typography>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {camps?.map((camp, index) => {
          const isLast = index === camps.length - 1;
          const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
          return (
            <tr key={camp._id}>
              <td className={classes}>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {camp?.campName}
                </Typography>
              </td>
              <td className={classes}>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  Date:{camp?.date} Time:{camp?.time}
                </Typography>
              </td>
              <td className={classes}>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {camp?.location}
                </Typography>
              </td>
              <td className={classes}>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  $ {camp?.campFees} 
                </Typography>
              </td>
              <td className={classes}>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {camp?.paymentStatus !== "Unpaid" || camp?.registerStatus == "Canceled" ? <> <Button variant="outlined" disabled size="sm" className="rounded-full">
                   {camp?.paymentStatus}
                  </Button></> : <> <Button onClick={()=>handleJoin(camp.campId, camp?._id) } variant="gradient" size="sm" className="rounded-full">
                   Pay Now 
                  </Button></>
                  }
                </Typography>
              </td>
              <td className={classes}>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {camp?.registerStatus}
                </Typography>
              </td>
              <td className={classes}>

                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                 {
                          camp?.registerStatus === "Confirmed" ? (
                            <Button variant="outlined" size="sm" className="rounded-full">
                              Confirmed
                            </Button>
                          ) : (
                            camp?.paymentStatus === "Paid" ? (
                              <Button variant="outlined" disabled size="sm" className="rounded-full">
                                Paid
                              </Button>
                            ) : (
                              camp?.registerStatus !== "Pending" || camp?.registerStatus === "Canceled" ? (
                                <Button variant="outlined" disabled size="sm" className="rounded-full">
                                  Canceled
                                </Button>
                              ) : (
                                <Button onClick={() => handleCancel(camp._id)} variant="gradient" size="sm" className="rounded-full">
                                  Cancel
                                </Button>
                              )
                            )
                          )
                        }
                </Typography>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </Card>
  </div>


    <CampJoinModal joinOpen={joinOpen} setJoinOpen={setJoinOpen} campId={campId} regId={regId}/> 
   </Container>
   
    </>

  )
}

export default RegisteredCamps