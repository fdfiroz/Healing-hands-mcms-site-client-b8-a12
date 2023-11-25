import { Spinner } from '@material-tailwind/react'

const Loading = () => {
  return (
    <div className=' h-[70vh] flex items-center justify-center'>
      <Spinner className="h-16 w-16 text-gray-900/50 text-center" />
      </div>
  )
}

export default Loading