
import {
    Button,
    Dialog,
    Card,
    CardBody,
    Typography,
    Input,
    Select,
    Option,
    Textarea,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import useAxios from "../../hooks/useAxios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const RegisterModal = ({ registerOpen, setRegisterOpen, user, campData }) => {
    const [gender, setGender] = useState("")
    const { register, handleSubmit } = useForm();
    const axios = useAxios()
    const navigate = useNavigate()
    console.log(campData)

    const onSubmit = async (data) => {
        console.log(data)
        const regData = {
            registerName: user?.displayName,
            registerEmail: user?.email,
            registerGender: gender,
            ...data,
            campName: campData.campName,
            campId: campData._id,
            orgName: campData.orgName,
            orgId: campData.orgId,
            campFees: campData.campFees,
            date: campData.date,
            time: campData.time,
            location: campData.location,
            paymentStatus: "Unpaid",
            registerStatus: "Pending", 
        } 
        const toastId = toast.loading("Registering for camp...")
        try{
            await axios.post("/register-camp", regData)
            await axios.patch(`/popular-count/${campData?._id}`, {popularCount: 1})
        .then((res) => {
            console.log(res)
            toast.success("Registered for camp successfully", {id: toastId})
        })
        }
        catch(err){
            console.log(err)
            toast.error("Error registering for camp", {id: toastId})
        }
        setRegisterOpen(!registerOpen)
        navigate("/dashboard/registered-camps")
    }
    return (
        <>
            <Dialog
                size="xs"
                open={registerOpen}
                handler={() => setRegisterOpen(!registerOpen)}
                className="bg-transparent shadow-none"
            >
                    <Card className="mx-auto w-full max-w-[24rem]">
                        <CardBody className="flex flex-col gap-2">
                <form onSubmit={handleSubmit(onSubmit)} >
                            <Typography variant="h6" color="blue-gray">
                                Register For Camp
                            </Typography>
                            <Typography
                                className="font-normal"
                                variant="small"
                                color="gray"
                            >
                                Enter your General Info.
                            </Typography>
                            <Typography
                                className="font-normal"
                                variant="h5"
                                color="black"
                            >
                                Fees : {campData?.campFees}$
                            </Typography>
                            <Typography className="-mb3" variant="h6">
                                Your Age
                            </Typography>
                            <Input {...register("age", { required: true }) } 
                            label="Age"  
                            name="age"
                            size="lg" />
                            <Typography className="-mb3" variant="h6">
                                Your Gender
                            </Typography>
                            <Select onChange={(e) => setGender(e)} label="Select Version">
                                <Option value="Male">Male</Option>
                                <Option value="Female">Female</Option>
                            </Select>
                            <Typography className="-mb3" variant="h6">
                                Your Emergency Contact Number
                            </Typography>
                            <Input  {...register("registerEmergencyContact", { required: true })} label="Emergency Contact Number" type="tel" size="lg" />
                            <Typography className="-mb3" variant="h6">
                            Any Health-related Info
                            </Typography>
                            <Textarea
                                    {...register('registerHealthInfo')}
                                    size="lg"
                                    type="text"
                                    placeholder="Camp Description"
                                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                    labelProps={{
                                        className: "before:content-none after:content-none",
                                    }}
                                />
                                  <Button type="submit" variant="gradient" fullWidth>
                                    Register Now
                                </Button>
                            </form>
                        </CardBody>
                    </Card>
            </Dialog>
        </>
    )
}

export default RegisterModal