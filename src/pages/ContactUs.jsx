import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import Container from "../components/Containar/Container"
import 'leaflet/dist/leaflet.css';
import { Input,Button, Textarea, Typography } from '@material-tailwind/react';
import { Helmet } from "react-helmet-async";



const center = [23.778256, 88.634075];
const tileLayer = {
  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
  url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
}
const ContactUs   = () => {
  return (
   <>
   <Helmet>
        <title>Contact Us</title>
      </Helmet>
   <Container>
      <MapContainer style={{ height: "300px", width: "300", zIndex:-1}}  center={center} zoom={15} scrollWheelZoom={false}>
      <TileLayer {...tileLayer} />

      <Marker position={center}>
        <Popup>Helping Hands
        <br />
        00-000 City
        <br />
        Street 00
        <br />
        <a href="mailto:helpinghands@gmail.com">helpinghands@gmail.com</a>
        </Popup>
      </Marker>

    </MapContainer>
    <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
      <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center">Contact Us</h2>
      <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">Got a technical issue? Want to send feedback about a beta feature? Need details about our Business plan? Let us know.</p>
      <form action="#" className="space-y-8">
          <div>
              <Typography htmlFor="email" className="block mb-2 text-sm font-medium ">Your email</Typography>
              <Input type="email" id="email" className="shadow-sm " placeholder="name@example.com" ></Input>
          </div>
          <div>
              <Typography htmlFor="subject" className="block mb-2 text-sm font-medium ">Subject</Typography>
              <Input type="text" id="subject" className="block p-3 w-full text-sm " placeholder="Let us know how we can help you" ></Input>
          </div>
          <div className="sm:col-span-2">
              <Typography htmlFor="message" className="block mb-2 text-sm font-medium ">Your message</Typography>
              <Textarea id="message" rows="6" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Leave a comment..."></Textarea>
          </div>
          <Button type="submit" className="py-3 px-5 text-sm font-medium text-center ">Send message</Button>
      </form>
  </div>
   </Container>
   </>
  )
}

export default ContactUs