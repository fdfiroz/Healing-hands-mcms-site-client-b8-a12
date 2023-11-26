import { Card, Typography } from "@material-tailwind/react";
import useAuth from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../components/Loading/Loading";
 
const TABLE_HEAD = ["Camp Name", "Date and Time", "Venue", "Camp Fees", "Payment Status", "Confirmation Status"];
 
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
const PaymentHistory = () => {
  const {user, loading} = useAuth()
  const axios = useAxios()
const {data:payments , isLoading} = useQuery({
  queryKey : ["payment-history"],
  enabled: !!user?.email,
  queryFn: async() => {
    const data = await axios.get(`/payments/${user.email}`)
    return data.data
  }
})
console.log(payments)

if (loading) return <Loading/>
if (isLoading) return <Loading/>
  return (
    <div className="grid min-h-[140px] w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible">
      <Card className="h-full w-full overflow-scroll">
    <table className="w-full min-w-max table-auto text-left">
      <thead>
        <tr>
          {TABLE_HEAD.map((head) => (
            <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
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
        {payments.map((payment, index) => (
          <tr key={payment._id} className="even:bg-blue-gray-50/50">
            <td className="p-4">
              <Typography variant="small" color="blue-gray" className="font-normal">
                {payment?.campName}
              </Typography>
            </td>
            <td className="p-4">
              <Typography variant="small" color="blue-gray" className="font-normal">
              {payment?.date} {payment?.time}
              </Typography>
            </td>
            <td className="p-4">
              <Typography variant="small" color="blue-gray" className="font-normal">
                {payment?.location}
              </Typography>
            </td>
            <td className="p-4">
              <Typography variant="small" color="blue-gray" className="font-normal">
                {payment?.campFees}
              </Typography>
            </td>
            <td className="p-4">
              <Typography variant="small" color="blue-gray" className="font-normal">
                {payment?.paymentStatus}
              </Typography>
            </td>
            <td className="p-4">
              <Typography variant="small" color="blue-gray" className="font-normal">
                {payment?.registerStatus}
              </Typography>
            </td>
            
          </tr>
        ))}
      </tbody>
    </table>
  </Card>
  </div>
  )
}

export default PaymentHistory