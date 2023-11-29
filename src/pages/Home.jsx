import Slider from "../components/Home/Slider"
import Newsletter from "../components/Newsletter/Newsletter"
import PopularCamps from "../components/PopularCamps/PopularCamps"
import Testimonials from "../components/Testimonials/Testimonials"
import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <>
    <Helmet>
      <title>Healing Hands || Home</title>
    </Helmet>
    <Slider></Slider>
    <PopularCamps></PopularCamps>
    <Testimonials/>
    <Newsletter/>
    </>
  )
}

export default Home