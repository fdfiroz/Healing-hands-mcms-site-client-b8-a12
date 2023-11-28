import Slider from "../components/Home/Slider"
import Newsletter from "../components/Newsletter/Newsletter"
import PopularCamps from "../components/PopularCamps/PopularCamps"
import Testimonials from "../components/Testimonials/Testimonials"

const Home = () => {
  return (
    <>
    <Slider></Slider>
    <PopularCamps></PopularCamps>
    <Testimonials/>
    <Newsletter/>
    </>
  )
}

export default Home