/* eslint-disable react/prop-types */
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { useEffect, useState } from 'react'
import './CheckoutForm.css'
import { ImSpinner9 } from 'react-icons/im'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import useAxios from '../../hooks/useAxios'
import { Button } from '@material-tailwind/react'

const CheckoutForm = ({ bookingInfo, closeModal }) => {
  const stripe = useStripe()
  const elements = useElements()
  const { user } = useAuth()
  const [cardError, setCardError] = useState('')
  const [clientSecret, setClientSecret] = useState('')
  const [processing, setProcessing] = useState(false)
  const navigate = useNavigate()
  const axios = useAxios()
  console.log(bookingInfo)
  useEffect(() => {
    // create payment intent
    if (bookingInfo?.campFees > 0) {
        axios.post("/create-payment-intent",{ fees: parseFloat(bookingInfo?.campFees) })
        .then(data => {
        console.log(data?.data.clientSecret)
        setClientSecret(data?.data?.clientSecret)
      })
    }
  }, [bookingInfo?.campFees])

  const handleSubmit = async event => {
    event.preventDefault()

    if (!stripe || !elements) {
      return
    }

    const card = elements.getElement(CardElement)
    if (card === null) {
      return
    }

    // Card data lookup (Asynchronous Network Call )
    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    })

    if (error) {
      console.log('error', error)
      setCardError(error.message)
    } else {
      setCardError('')
      console.log('payment method', paymentMethod)
    }

    setProcessing(true)
    const toastId = toast.loading('Processing Payment...')
    // Ekhane taka katbe
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email,
            name: user?.displayName,
          },
        },
      })

    if (confirmError) {
      console.log(confirmError)
      setCardError(confirmError.message)
    }

    console.log('payment intent', paymentIntent)

    if (paymentIntent.status === "succeeded") {
      const paymentInfo = {
        payerEmail: user?.email,
        payerName:user?.displayName,
        campFees: bookingInfo?.campFees,
        campName: bookingInfo?.campName,
        location: bookingInfo?.location,
        date: bookingInfo?.date,
        description: bookingInfo?.description,
        healthcarePros: bookingInfo?.healthcarePros,
        image: bookingInfo?.image,
        orgId : bookingInfo?.orgId,
        orgImage: bookingInfo?.orgImage,
        orgName : bookingInfo?.orgName,
        specialServices : bookingInfo?.specialServices,
        targetAudience : bookingInfo?.targetAudience,
        time : bookingInfo?.time,
        campId : bookingInfo?._id,
        transactionId: paymentIntent.id,
        paymentDate: new Date(),
      }
      try {
        // save payment information to the server
        await axios.post("/save-payment", paymentInfo)
        .then(data => {
          console.log(data)
        })

        // Update room status in db
        await axios.patch(`/popular-count/${bookingInfo?._id}`, {popularCount: 1})
        const text = `Booking Successful! Pay Id ${paymentIntent.id}`
        toast.success(text, { id: toastId })
        navigate('/dashboard/payment-history')
      } catch (err) {
        console.log(err)
        toast.error(err.message, { id: toastId })
      } finally {
        setProcessing(false)
      }

      setProcessing(false)
    }
  }

  return (
    <>
      <form className='my-2' onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
        <div className='flex mt-2 justify-around'>
          <Button
            type='button'
            className='inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2'
            onClick={closeModal}
          >
            Cancel
          </Button>
          <Button
            type='submit'
            disabled={!stripe || !clientSecret || processing}
            className='inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2'
          >
            {processing ? (
              <ImSpinner9 className='m-auto animate-spin' size={24} />
            ) : (
              `Pay ${bookingInfo?.campFees}$`
            )}
          </Button>
        </div>
      </form>
      {cardError && <p className='text-red-600 ml-8'>{cardError}</p>}
    </>
  )
}

export default CheckoutForm
