import { Carousel, Typography, Button, Card } from "@material-tailwind/react";
import Container from "../Containar/Container";
import { Link } from "react-router-dom";
 
const Slider = () => {
  return (
    <Container>
         <Carousel className="rounded-xl mb-6" autoplay={true} loop={true} autoplayDelay={5000} >
      <Card className="relative h-full w-full overflow-hidden">
        <img
        className="h-[32rem] w-full object-cover object-center"
          src="https://i.ibb.co/30JFpnq/national-cancer-institute-Bx-Xg-TQEw1-M4-unsplash.jpgg"
          alt="image 1"
        />
        <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/75">
          <div className="w-3/4 text-center md:w-2/4">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-3xl md:text-4xl lg:text-5xl"
            >
              Help Each Other.
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className="mb-12 opacity-80"
            >
              Consult  from the best doctor.
            </Typography>
            <div className="flex justify-center gap-2">
              <Link to={"/available-camps"}>
              <Button size="lg" color="white">
                Find suitable camp
              </Button>
              </Link>
            </div>
          </div>
        </div>
      </Card>
      <Card className="relative h-full w-full overflow-hidden">
        <img
        className="h-[32rem] w-full object-cover object-center"
          src="https://i.ibb.co/nbWjh0K/tom-claes-Cfdz-Nyb-ONzc-unsplash.jpg"
          alt="image 2"
        />
        <div className="absolute inset-0 grid h-full w-full items-center bg-black/75">
          <div className="w-3/4 pl-12 md:w-2/4 md:pl-20 lg:pl-32">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-3xl md:text-4xl lg:text-5xl"
            >
              Organize Your Camp
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className="mb-12 opacity-80"
            >
                Organize your camp and help community. Share your knowledge and experience with others.

            </Typography>
            <div className="flex gap-2">
              <Link to={"/register"}>
              <Button size="lg" color="white">
                Register your Organization Now
              </Button>
              </Link>
              
            </div>
          </div>
        </div>
      </Card>
      <Card className="relative h-full w-full overflow-hidden">
        <img
        className="h-[32rem] w-full object-cover object-center"
          src="https://i.ibb.co/MPdPWXn/patty-brito-Y-3-Dt0us7e0-unsplash.jpg"
          alt="image 2"
        />
        <div className="absolute inset-0 grid h-full w-full items-center bg-black/75">
          <div className="w-3/4 pl-12 md:w-2/4 md:pl-20 lg:pl-32">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-3xl md:text-4xl lg:text-5xl"
            >
              As doctor help community
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className="mb-12 opacity-80"
            >
                As a doctor you can help community by organizing camp. Share your knowledge and experience with others.

            </Typography>
            <div className="flex gap-2">
              <Link to={"/register"}>
              <Button size="lg" color="white">
              register Now
              </Button>
              </Link>
              
            </div>
          </div>
        </div>
      </Card>
    </Carousel>
    </Container>
  )
}

export default Slider