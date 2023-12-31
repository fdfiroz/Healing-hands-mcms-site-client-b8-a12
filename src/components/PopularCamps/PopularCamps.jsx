import React from 'react'
import useAxios from '../../hooks/useAxios'
import { useQuery } from '@tanstack/react-query'
import PopularCampsCard from './PopularCampsCard'
import { Button, Typography } from '@material-tailwind/react'
import Container from '../Containar/Container'
import { Link } from 'react-router-dom'

const PopularCamps = () => {
    const axios = useAxios()
    const {data:popularCamps, isSuccess} = useQuery({
        queryKey: ['popularCamps'],
        queryFn: async () => {
            const res = await axios.get(`/camps?sortField=popularCount&sortOrder=desc`)
            return res.data?.splice(0,6)
        }
    
    })
    console.log(popularCamps)
  return (
    <Container>
        <div>
        <Typography variant="h3" className="my-6 px-10 text-center">
            Popular Camps
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
        {
           isSuccess && popularCamps?.map((popularCamp) => (
                <PopularCampsCard key={popularCamp._id} popularCamp={popularCamp} />
            ))
        }
    </div>
    <div className='flex items-center my-5 justify-center'>
        <Link to={"/available-camps"}><Button>See All</Button></Link>
    </div>
    </div>
    </Container>
  )
}

export default PopularCamps