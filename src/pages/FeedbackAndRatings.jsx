import { useQuery } from "@tanstack/react-query"
import useAuth from "../hooks/useAuth"
import useAxios from "../hooks/useAxios"
import { Button, Card, Typography } from "@material-tailwind/react";
import { useState } from "react";
import FeedBackModal from "../components/Modals/FeedBackModal";
import Loading from "../components/Loading/Loading";
import { Helmet } from "react-helmet-async";

const TABLE_HEAD = ["Camp Name", "Date and Time", "Venue", "Camp Fees", "Payment Status", "Confirmation Status", "Actions"];

const FeedbackAndRatings = () => {
  const axios = useAxios()
  const {user, loading} = useAuth()
  const [open, setOpen] = useState(false)
  const [feedback, setFeedBack] = useState({})
  const {data:feedbacks , isLoading} = useQuery({
    queryKey : ["confirm-payment", user?.email],
    enabled: !!user?.email,
    queryFn: async() => {
      const data = await axios.get(`/confirmed-register-camps/${user?.email}`)
      return data.data
    }
  })

const handelFeedback = (data) => {
  setOpen(!open)
  setFeedBack(data)
}
  console.log(feedbacks)
  if (loading) return <Loading/>
if (isLoading) return <Loading/>
  return (
    <>
    <Helmet>
      <title>Feedback and Ratings</title>
    </Helmet>
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
          {feedbacks.map((feedback, index) => (
            <tr key={feedback._id} className="even:bg-blue-gray-50/50">
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {feedback.campName}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {feedback.date} {feedback.time}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {feedback.location}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  $ {feedback.campFees}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {feedback.paymentStatus}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {feedback.registerStatus}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  <Button onClick={()=>handelFeedback(feedback)} variant="gradient" size="sm" className="rounded-full">
                    Give Feedback
                  </Button>
                </Typography>
              </td>
              
            </tr>
          ))}
        </tbody>
      </table>
      <FeedBackModal open={open} setOpen={setOpen} feedback={feedback} />
    </Card>
    </>
  )
}

export default FeedbackAndRatings