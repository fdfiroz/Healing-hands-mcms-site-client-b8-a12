import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";

const Login = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  
  const navigate = useNavigate()
  const { signIn } = useAuth()

  const onSubmit = async (data) => {
    console.log({ ...data })
    if (data.password.length < 8) {
      toast.error("The password must be at least 6 characters long.");
      return;
    }
    if (!/[A-Z]/.test(data.password)) {
      toast.error("The password must contain at least one capital letter.");
      return;
    }
    if (!/[!@#$%^&*()]/.test(data.password)) {
      toast.error("The password must contain at least one special character.");
      return;
    }
    const toastId = toast.loading('LogIn user ...');
    try {
      await signIn(data.email, data.password)
        .then(() => {
          toast.success('LogIn successfuly', { id: toastId });

          navigate(location.state ? location.state : '/');
        })
    } catch (error) {
      console.log(error);
      toast.error(error.message, { id: toastId });
    }


  };
  return (
    <>
    <Helmet>
      <title>Healing Hands || Login</title>
    </Helmet>
    <div className="mx-auto max-w-screen-xxl flex justify-center py-12 ">

<Card color="transparent" shadow={false}>
  <Typography variant="h4" color="blue-gray">
    Login
  </Typography>
  <Typography color="gray" className="mt-1 font-normal">
    Nice to meet you! Enter your details to register.
  </Typography>
  <form onSubmit={handleSubmit(onSubmit)} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
    <div className="mb-1 flex flex-col gap-6">
      <Typography variant="h6" color="blue-gray" className="-mb-3">
        Your Email
      </Typography>
      <Input
        {...register("email", { required: true })}
        size="lg"
        placeholder="name@mail.com"
        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
        labelProps={{
          className: "before:content-none after:content-none",
        }}
      />
      <Typography variant="h6" color="blue-gray" className="-mb-3">
        Password
      </Typography>
      <Input
        {...register("password", { required: true })}
        type="password"
        size="lg"
        placeholder="********"
        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
        labelProps={{
          className: "before:content-none after:content-none",
        }}
      />

    </div>
    <Button type="submit" className="mt-6" fullWidth>
      Login
    </Button>
    <Typography color="gray" className="mt-4 text-center font-normal">
      Do not have an account?{" "}
      <NavLink to="/register" className="font-medium text-gray-900">
        Register Now
      </NavLink>
    </Typography>
  </form>
</Card>
</div>
    </>
  )
}

export default Login