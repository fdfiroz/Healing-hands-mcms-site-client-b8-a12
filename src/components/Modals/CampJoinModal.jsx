/* eslint-disable react/prop-types */
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Card,
  Typography,
} from "@material-tailwind/react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../Checkout/CheckoutForm";
import { useState } from "react";
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENTS_KEY);

// const [stripePromise, setStripePromise] = useState(() => loadStripe(import.meta.env.VITE_PAYMENTS_KEY))
const CampJoinModal = ({setOpen, open, bookingInfo}) => {
console.log(bookingInfo)
    
    return (
    <>
      <Dialog
        size={"md"}
        open={open}
        handler={()=>setOpen(!open)}
        animate={{
            mount: { scale: 1, y: 0 },
            unmount: { scale: 0.9, y: -100 },
          }}
      >
        <DialogHeader className=" flex flex-col item-center">
        <Typography variant="h6" color="blue-gray">
            {bookingInfo?.campName}
          </Typography>
          <Typography variant="small">
                  Location : {bookingInfo?.location}
            </Typography>
            <Typography>
                  Service Fee : {bookingInfo?.campFees}$
            </Typography>
            <Typography>Organization : {bookingInfo?.orgName}</Typography>
            <Typography className="font-normal">Date and time : {bookingInfo?.date} {bookingInfo?.time}</Typography>
        </DialogHeader>
        <DialogBody>
        <Card color="transparent" shadow={false}>
      <Elements stripe={stripePromise}>
          <CheckoutForm
          bookingInfo={bookingInfo}
          closeModal={()=>setOpen(!open)}
          />
      </Elements>
      
    </Card>
        </DialogBody>
        {/* <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={()=>setOpen(!open)}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={()=>setOpen(!open)}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter> */}
      </Dialog>
    </>
  )
}

export default CampJoinModal