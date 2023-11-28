import { Button } from "@material-tailwind/react"
import { useState } from "react";
import toast from "react-hot-toast";
import Container from "../Containar/Container";

const Newsletter = () => {
    const [email, setEmail] = useState("")
    const handelSubmit = (e) => {
        e.preventDefault();
        if (!email) {
            return toast.error("Please enter your email");
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            return toast.error("Please enter a valid email");
        }
        toast.success(`${email} subscribed successfully`);
        setEmail("");
        
    };
  return (
    <Container>
        <section className="py-14 my-4">
    <div className="max-w-screen-xl mx-auto">
        <div className="max-w-xl">
            <h3 className="text-3xl font-bold">
                Sign up for our newsletter for the new camp.
            </h3>
            <p className="text-gray-600 mt-3">
            We will update you with the new camp and other important information.
            </p>
        </div>
        <div className="mt-6">
            <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-x-3">
                <div className="relative">
                    <svg className="w-6 h-6 text-gray-400 absolute left-3 inset-y-0 my-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        required
                        placeholder="Enter your email"
                        className="w-full pl-12 pr-3 py-2 text-gray-500 bg-white outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                    />
                </div>
                <Button onClick={handelSubmit} className="block w-auto py-3 px-4 font-medium text-sm text-center">
                    Subscribe
                </Button>
            </form>
        </div>
    </div>
</section>
    </Container>
  )
}

export default Newsletter