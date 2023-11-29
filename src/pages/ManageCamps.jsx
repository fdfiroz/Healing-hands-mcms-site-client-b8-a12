import { Button, Card, Typography } from "@material-tailwind/react";
import useAxios from "../hooks/useAxios";
import useRole from "../hooks/useRole";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Container from "../components/Containar/Container";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import UpdateCampModal from "../components/Modals/UpdateCampModal";
import { Helmet } from "react-helmet-async";

const TABLE_HEAD = ["Camp Name", "Scheduled Date and Time", "Venue Location", "Services Provided", "Healthcare Professionals", "Audience", "Camp Fees", "Participant Count", "Action",];
 

const ManageCamps = () => {
  const [open, setOpen] = useState(false);
  const [camp, setCamp] = useState({});
  const axios = useAxios()
  const [role] = useRole()
  const {data:camps, refetch} = useQuery({
    queryKey: ["mange-camp", role?.data?._id],
    enabled: !!role?.data?._id,
    queryFn: async () => {
      const res = await axios.get(`/get-camps/${role?.data?._id}`)
      return res.data
    }
  })
  console.log(camps)
  const handelDelete =  async(id)=>{
    console.log(id)
    Swal.fire({
      title: "Do you want delete this Camp?",
      showDenyButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Don't Delete`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        axios.delete(`/delete-camp/${id}`)
        .then(res => console.log(res))     
        toast.success("Camp Deleted Successfully")
        refetch()
      } else if (result.isDenied) {
        toast.error("Camp Not Deleted")
      }
    });

  } 

  const handelUpdate = (camp) =>{
    setCamp(camp)
    setOpen(!open)

  }
  
  return (
   <>
    <Helmet>
        <title>Manage Camps</title>
    </Helmet>
   <Container>
      <div className="grid min-h-[140px] w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible">
     <Card className="h-full w-full overflow-scroll">
      <table className="w-full min-w-max table-auto text-left">
        <thead className="cursor-grabbing">
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
                    {camp.campName}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {camp.date} {camp.time}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {camp.location}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {camp.specialServices}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {camp.healthcarePros}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {camp.targetAudience}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    ${camp.campFees}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {!camp.popularCount ? 0: camp.popularCount}
                  </Typography>
                </td>
               
                <td className="flex gap-4 p-2 items-center justify-between">
                  <Typography
                  onClick={() => handelUpdate(camp)}
                    as="a"
          
                    variant="small"
                    color="blue-gray"
                    className="font-medium cursor-pointer"
                  >
                    <Button variant="gradient" disabled size="sm" className="rounded-full">
                  Edit
                  </Button>
                  </Typography>
                  <Typography
                    as="a"
                    onClick={() => handelDelete(camp?._id)}
                    variant="small"
                    color="blue-gray"
                    className="font-medium cursor-pointer"
                  >
                    <Button  variant="gradient" disabled size="sm" className="rounded-full">
                  Delete
                  </Button>
                  </Typography>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
    </div>
    <UpdateCampModal open={open} setOpen={setOpen} camp={camp} refetch={refetch}/>
   </Container>
   </>
  )
}

export default ManageCamps