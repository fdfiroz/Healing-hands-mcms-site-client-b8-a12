import React from 'react'
import TestimonialCard from './TestimonialCard'
import Container from '../Containar/Container'
import { Typography } from '@material-tailwind/react'
import useAxios from '../../hooks/useAxios'
import { useQuery } from '@tanstack/react-query'

const Testimonials = () => {
    const axios = useAxios()
    const {data:testimonials} = useQuery({
        queryKey: ['testimonials'],
        queryFn: async () => {
            const res = await axios.get('/feedbacks')
            return res.data?.splice(0,3)
        }
    
    })
    console.log(testimonials)
  return (
    <Container >
        <div className="my-4">

    <Typography variant='h2' className='text-center my-10'>Testimonials</Typography>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4'>
            
            {
                testimonials?.map((testimonial) => (
                    <TestimonialCard key={testimonial._id} testimonial={testimonial}/>
                ))
            }
       
    </div>
        </div>
    </Container>
  )
}

export default Testimonials