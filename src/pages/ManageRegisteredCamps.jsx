import { Button, Card, Typography } from "@material-tailwind/react";
import useAxios from "../hooks/useAxios";
import useRole from "../hooks/useRole";
import { useQuery } from "@tanstack/react-query";
import Container from "../components/Containar/Container";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const TABLE_HEAD = ["Register Name", "Register Email", "Camp Name", "Date and Time", "Venue", "Fees", "Payment Status", "Confirmation Status", "Actions"];

const TABLE_ROWS = [
  {
    name: "John Michael",
    job: "Manager",
    date: "23/04/18",
  },
  {
    name: "Alexa Liras",
    job: "Developer",
    date: "23/04/18",
  },
  {
    name: "Laurent Perrier",
    job: "Executive",
    date: "19/09/17",
  },
  {
    name: "Michael Levi",
    job: "Developer",
    date: "24/12/08",
  },
  {
    name: "Richard Gran",
    job: "Manager",
    date: "04/10/21",
  },
];
const ManageRegisteredregisters = () => {
  const axios = useAxios();
  const [role] = useRole()
  console.log(role.data._id)
  const { data: registers, refetch, isLoading } = useQuery({
    queryKey: ["manage-registered-registers", role.data._id],
    enabled: !!role.data._id,
    queryFn: async () => {
      const data = await axios.get(`register-camps/org/${role?.data._id}`)
      return data.data
    }

  });

  const handelConfirm = (id) => {
    Swal.fire({
      title: "Do you want to Confirm Registaion?",
      showDenyButton: true,
      confirmButtonText: "Confirm Now",
      denyButtonText: `Don't Confirm`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        axios.patch(`/status-change/${id}`, { registerStatus: "Confirmed" })
        refetch(_)
        toast.success("Camp Confirmed")
      } else if (result.isDenied) {
        toast.success("Changes are not saved")
      }
    });
  }
  const handelCancel = async (id) => {
    Swal.fire({
      title: "Do you want to Cancel Registaion?",
      showDenyButton: true,
      confirmButtonText: "Cancel Now",
      denyButtonText: `Don't Cancel`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        try {
          axios.patch(`/cancel-register/${id}`, { registerStatus: "Canceled" })
            .then(res => {
              console.log(res)
              toast.success("Camp Canceled")
              refetch()
            })
        }
        catch (err) {
          console.log(err)
        }
      } else if (result.isDenied) {
        toast.success("Changes are not saved")
      }
    });
    console.log(id)
  }
  return (
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
              {registers?.map((register, index) => {
                const isLast = index === registers.length - 1;
                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
                return (
                  <tr key={register._id}>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {register?.registerName}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {register?.registerEmail}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {register?.campName}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        Date:{register?.date} Time:{register?.time}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {register?.location}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        $ {register?.campFees}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {register?.paymentStatus}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {register.paymentStatus == "Paid" && register.registerStatus != "Confirmed" ?
                          <Button onClick={() => handelConfirm(register._id)} variant="gradient" size="sm" className="rounded-full">Confirm</Button> :
                          <Button variant="outlined" disabled size="sm" className="rounded-full">{register.registerStatus}</Button>}


                        {/* {register?.registerStatus} */}
                      </Typography>
                    </td>
                    <td className={classes}>

                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {
                          register?.registerStatus === "Confirmed" ? (
                            <Button variant="outlined" size="sm" className="rounded-full">
                              Confirmed
                            </Button>
                          ) : (
                            register?.paymentStatus === "Paid" ? (
                              <Button variant="outlined" disabled size="sm" className="rounded-full">
                                Paid
                              </Button>
                            ) : (
                              register?.registerStatus !== "Pending" || register?.registerStatus === "Canceled" ? (
                                <Button variant="outlined" disabled size="sm" className="rounded-full">
                                  Canceled
                                </Button>
                              ) : (
                                <Button onClick={() => handleCancel(register._id)} variant="gradient" size="sm" className="rounded-full">
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

    </Container>
  )
}

export default ManageRegisteredregisters