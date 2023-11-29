import { useQuery } from "@tanstack/react-query"
import CampCard from "../components/Card/CampCard"
import useAxios from "../hooks/useAxios"
import Loading from "../components/Loading/Loading"
import Container from "../components/Containar/Container"
import { Helmet } from "react-helmet-async";

const AvailableCamps = () => {
  const axios = useAxios()
  const {data:camps, isLoading} = useQuery({
    queryKey: ["availableCamps"],
    queryFn: () => {
      const data = axios.get("/camps")
      return data
    }
  })
console.log(camps, isLoading)
if (isLoading) return <Loading/>
  return (
    <>
    <Helmet>
      <title>Available Camps</title>
      </Helmet>
    <Container >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-col-3 xl:grid-cols-4 gap-6">
    {!isLoading && camps?.data?.map((camp) => <CampCard key={camp._id} camp={camp}/>)}
   
    </div>
    </Container>
    </>
  )
}

export default AvailableCamps